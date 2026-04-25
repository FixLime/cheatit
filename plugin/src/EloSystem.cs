using CounterStrikeSharp.API;
using CounterStrikeSharp.API.Core;
using CounterStrikeSharp.API.Modules.Utils;
using System.Text.Json;
using System.Net.Http.Json;

namespace CHEATIT;

public class PlayerEloData
{
    public ulong  SteamId        { get; set; }
    public string Name           { get; set; } = "";
    public int    Elo            { get; set; } = 0;
    public int    MatchesPlayed  { get; set; } = 0;
    public bool   IsCalibrated   { get; set; } = false;
    public double KdRatio        { get; set; } = 0;
    public double WinRate        { get; set; } = 0;
}

public class MatchResult
{
    public ulong   SteamId    { get; set; }
    public string  Name       { get; set; } = "";
    public bool    Won        { get; set; }
    public int     Kills      { get; set; }
    public int     Deaths     { get; set; }
    public int     Assists    { get; set; }
    public int     Damage     { get; set; }
    public int     HsKills    { get; set; }
    public CsTeam  Team       { get; set; }
}

public class EloSystem
{
    private readonly string _backendUrl;
    private readonly string _apiKey;
    private readonly string _matchId;
    private readonly int    _calibrationMatches;
    private readonly HttpClient _http = new();

    // K-factor: higher during calibration for faster placement
    private const int K_CALIBRATION = 50;
    private const int K_NORMAL      = 25;
    private const int BASE_ELO      = 1000;
    private const int CALIBRATION_ELO_MIN = 800;
    private const int CALIBRATION_ELO_MAX = 3500;

    public EloSystem(string backendUrl, string apiKey, string matchId, int calibrationMatches)
    {
        _backendUrl         = backendUrl;
        _apiKey             = apiKey;
        _matchId            = matchId;
        _calibrationMatches = calibrationMatches;
        _http.DefaultRequestHeaders.Add("X-API-Key", apiKey);
    }

    // Called at match end — submits results to backend and announces ELO changes
    public async Task SubmitMatchResultsAsync(
        List<MatchResult> results,
        CsTeam winnerTeam,
        int tScore, int ctScore)
    {
        var winners = results.Where(r => r.Team == winnerTeam).ToList();
        var losers  = results.Where(r => r.Team != winnerTeam).ToList();

        // Fetch current ELO data from backend
        Dictionary<ulong, PlayerEloData> eloMap;
        try
        {
            var response = await _http.GetAsync($"{_backendUrl}/api/elo/batch?ids={string.Join(",", results.Select(r => r.SteamId))}");
            eloMap = await response.Content.ReadFromJsonAsync<Dictionary<ulong, PlayerEloData>>()
                     ?? new Dictionary<ulong, PlayerEloData>();
        }
        catch
        {
            Server.PrintToChatAll($" {ChatColors.Red}[CHEATIT] Failed to fetch ELO data from backend.");
            return;
        }

        var changes = new List<object>();

        foreach (var result in results)
        {
            var elo = eloMap.TryGetValue(result.SteamId, out var d) ? d : new PlayerEloData
            {
                SteamId = result.SteamId, Name = result.Name,
                Elo = BASE_ELO, MatchesPlayed = 0, IsCalibrated = false
            };

            int k = elo.IsCalibrated ? K_NORMAL : K_CALIBRATION;
            bool won = result.Team == winnerTeam;

            // Performance bonus/penalty based on K/D and damage
            float perfMultiplier = CalcPerfMultiplier(result, results);
            int   rawChange      = CalculateEloChange(elo.Elo, GetAverageOpponentElo(result, results, eloMap), won, k);
            int   finalChange    = (int)(rawChange * perfMultiplier);

            int newElo        = Math.Max(100, elo.Elo + finalChange);
            int newMatches    = elo.MatchesPlayed + 1;
            bool nowCalibrated = newMatches >= _calibrationMatches;

            // During calibration: use stats-weighted initial placement
            if (!elo.IsCalibrated && nowCalibrated)
                newElo = CalibrationFinalElo(result, results);

            changes.Add(new
            {
                steamId       = result.SteamId,
                name          = result.Name,
                oldElo        = elo.Elo,
                newElo,
                delta         = finalChange,
                matchesPlayed = newMatches,
                isCalibrated  = nowCalibrated,
                won,
                kills         = result.Kills,
                deaths        = result.Deaths,
                assists       = result.Assists,
                damage        = result.Damage,
            });
        }

        // Push to backend
        try
        {
            await _http.PostAsJsonAsync($"{_backendUrl}/api/elo/update", new
            {
                matchId   = _matchId,
                tScore,
                ctScore,
                winnerTeam = winnerTeam.ToString(),
                changes,
            });
        }
        catch
        {
            Server.PrintToChatAll($" {ChatColors.Red}[CHEATIT] Failed to save ELO to backend.");
        }

        // Announce ELO changes in chat
        AnnounceEloChanges(changes, winnerTeam, tScore, ctScore);
    }

    private void AnnounceEloChanges(List<object> changes, CsTeam winner, int tScore, int ctScore)
    {
        Server.PrintToChatAll($" {ChatColors.Orange}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        Server.PrintToChatAll($" {ChatColors.Orange}[CHEATIT]{ChatColors.White} Match over: {ChatColors.Yellow}{tScore}:{ctScore}  Winner: {(winner == CsTeam.Terrorist ? $"{ChatColors.Red}T" : $"{ChatColors.Blue}CT")}");
        Server.PrintToChatAll($" {ChatColors.Orange}━━━ ELO Changes ━━━━━━━━━━━━━━━━━━━━━━");

        foreach (dynamic c in changes)
        {
            string calibTag = c.matchesPlayed < 10 ? $"{ChatColors.Grey}[{c.matchesPlayed}/10 cal]" : "";
            string sign     = c.delta >= 0 ? $"{ChatColors.Green}+{c.delta}" : $"{ChatColors.Red}{c.delta}";
            Server.PrintToChatAll(
                $"   {ChatColors.White}{c.name,-20} {ChatColors.Yellow}{c.newElo,5} ELO  {sign}  {calibTag}");
        }
        Server.PrintToChatAll($" {ChatColors.Orange}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    }

    private static int CalculateEloChange(int playerElo, int avgOpponentElo, bool won, int k)
    {
        double expected = 1.0 / (1.0 + Math.Pow(10, (avgOpponentElo - playerElo) / 400.0));
        double actual   = won ? 1.0 : 0.0;
        return (int)Math.Round(k * (actual - expected));
    }

    private static int GetAverageOpponentElo(MatchResult player, List<MatchResult> all, Dictionary<ulong, PlayerEloData> eloMap)
    {
        var opponents = all.Where(r => r.Team != player.Team);
        var elos = opponents.Select(r => eloMap.TryGetValue(r.SteamId, out var d) ? d.Elo : BASE_ELO);
        return (int)(elos.Any() ? elos.Average() : BASE_ELO);
    }

    private static float CalcPerfMultiplier(MatchResult player, List<MatchResult> all)
    {
        // Bonus/penalty ±30% based on K/D relative to match average
        var matchKds = all.Where(r => r.Deaths > 0).Select(r => (float)r.Kills / r.Deaths).ToList();
        if (!matchKds.Any()) return 1f;
        float avgKd   = matchKds.Average();
        float playerKd = player.Deaths > 0 ? (float)player.Kills / player.Deaths : player.Kills;
        float ratio    = avgKd > 0 ? playerKd / avgKd : 1f;
        return Math.Clamp(ratio, 0.7f, 1.3f);
    }

    // After calibration: place based on K/D and win stats vs calibration threshold
    private static int CalibrationFinalElo(MatchResult player, List<MatchResult> all)
    {
        float avgDmg = all.Count > 0 ? (float)all.Average(r => r.Damage) : 1;
        float relDmg = avgDmg > 0 ? player.Damage / avgDmg : 1f;
        float kd     = player.Deaths > 0 ? (float)player.Kills / player.Deaths : player.Kills;

        // Score 0-1: weight K/D 60%, damage 40%
        float score = (kd / 2.5f) * 0.6f + (relDmg / 1.5f) * 0.4f;
        score = Math.Clamp(score, 0f, 1f);

        return CALIBRATION_ELO_MIN + (int)(score * (CALIBRATION_ELO_MAX - CALIBRATION_ELO_MIN));
    }
}
