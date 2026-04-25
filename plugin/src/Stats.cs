using CounterStrikeSharp.API;
using CounterStrikeSharp.API.Core;
using CounterStrikeSharp.API.Modules.Utils;

namespace CHEATIT;

public class PlayerRoundStats
{
    public int Damage  { get; set; }
    public int Kills   { get; set; }
    public int Assists { get; set; }
    public int Deaths  { get; set; }
    public int HsKills { get; set; }
    public string Name { get; set; } = "";
    public CsTeam Team { get; set; }
}

public class MatchStats
{
    public Dictionary<ulong, PlayerRoundStats> Round  { get; } = new();
    public Dictionary<ulong, PlayerRoundStats> Total  { get; } = new();
    public int RoundNumber { get; set; } = 0;

    public void ResetRound()
    {
        Round.Clear();
    }

    public PlayerRoundStats GetRound(CCSPlayerController p)
    {
        if (!Round.TryGetValue(p.SteamID, out var s))
        {
            s = new PlayerRoundStats { Name = p.PlayerName, Team = p.Team };
            Round[p.SteamID] = s;
        }
        return s;
    }

    public PlayerRoundStats GetTotal(CCSPlayerController p)
    {
        if (!Total.TryGetValue(p.SteamID, out var s))
        {
            s = new PlayerRoundStats { Name = p.PlayerName, Team = p.Team };
            Total[p.SteamID] = s;
        }
        return s;
    }

    public void AddDamage(CCSPlayerController attacker, CCSPlayerController victim, int dmg, bool headshot)
    {
        if (attacker.Team == victim.Team) return;
        GetRound(attacker).Damage += dmg;
        GetTotal(attacker).Damage += dmg;
    }

    public void AddKill(CCSPlayerController killer, bool headshot)
    {
        GetRound(killer).Kills++;
        GetTotal(killer).Kills++;
        if (headshot)
        {
            GetRound(killer).HsKills++;
            GetTotal(killer).HsKills++;
        }
    }

    public void AddDeath(CCSPlayerController player)
    {
        GetRound(player).Deaths++;
        GetTotal(player).Deaths++;
    }

    public void AddAssist(CCSPlayerController player)
    {
        GetRound(player).Assists++;
        GetTotal(player).Assists++;
    }

    // Print FACEIT-style round summary to all players
    public void PrintRoundSummary(int roundNum)
    {
        var tPlayers  = Round.Values.Where(s => s.Team == CsTeam.Terrorist).OrderByDescending(s => s.Damage).ToList();
        var ctPlayers = Round.Values.Where(s => s.Team == CsTeam.CounterTerrorist).OrderByDescending(s => s.Damage).ToList();

        Server.PrintToChatAll($" {ChatColors.Orange}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        Server.PrintToChatAll($" {ChatColors.Orange}[CHEATIT]{ChatColors.White} Round {ChatColors.Yellow}{roundNum}{ChatColors.White} — Damage Report");
        Server.PrintToChatAll($" {ChatColors.Orange}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        Server.PrintToChatAll($" {ChatColors.Red}◈ T  {ChatColors.Grey}{"PLAYER",-20} {"DMG",5} {"K",3} {"A",3} {"D",3}");
        foreach (var s in tPlayers)
            PrintRow(s);

        Server.PrintToChatAll($" {ChatColors.Blue}◈ CT {ChatColors.Grey}{"PLAYER",-20} {"DMG",5} {"K",3} {"A",3} {"D",3}");
        foreach (var s in ctPlayers)
            PrintRow(s);

        Server.PrintToChatAll($" {ChatColors.Orange}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    }

    private static void PrintRow(PlayerRoundStats s)
    {
        var hs = s.Kills > 0 ? $"({(int)(100f * s.HsKills / s.Kills)}%hs)" : "";
        Server.PrintToChatAll(
            $"   {ChatColors.White}{s.Name,-20}{ChatColors.Yellow}{s.Damage,5}{ChatColors.White}{s.Kills,3}{ChatColors.Grey}{s.Assists,3}{ChatColors.Red}{s.Deaths,3}  {ChatColors.Grey}{hs}");
    }
}
