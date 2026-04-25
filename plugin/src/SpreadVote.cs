using CounterStrikeSharp.API;
using CounterStrikeSharp.API.Core;
using CounterStrikeSharp.API.Modules.Utils;

namespace CHEATIT;

public enum SpreadMode { NotVoted, Spread, NoSpread }

public class SpreadVote
{
    private CCSPlayerController? _captainT;
    private CCSPlayerController? _captainCT;
    private SpreadMode _tVote   = SpreadMode.NotVoted;
    private SpreadMode _ctVote  = SpreadMode.NotVoted;
    private bool _applied       = false;

    public SpreadMode Result { get; private set; } = SpreadMode.NotVoted;
    public event Action<SpreadMode>? OnVoteComplete;

    public void SetCaptains(CCSPlayerController t, CCSPlayerController ct)
    {
        _captainT  = t;
        _captainCT = ct;
    }

    public void StartVote()
    {
        Server.PrintToChatAll($" {ChatColors.Orange}━━━━ SPREAD VOTE ━━━━");
        Server.PrintToChatAll($" {ChatColors.White}Captains vote for spread or nospread.");
        Server.PrintToChatAll($" {ChatColors.Yellow}!spread{ChatColors.White} or {ChatColors.Yellow}!nospread");
        Server.PrintToChatAll($" {ChatColors.Grey}If captains disagree, T captain decides.");
    }

    public bool HandleChat(CCSPlayerController player, string message)
    {
        if (_applied) return false;
        if (player != _captainT && player != _captainCT) return false;

        var cmd = message.Trim().ToLower();
        SpreadMode vote = cmd switch
        {
            "!spread"   => SpreadMode.Spread,
            "!nospread" => SpreadMode.NoSpread,
            _           => SpreadMode.NotVoted
        };

        if (vote == SpreadMode.NotVoted) return false;

        if (player == _captainT)  _tVote  = vote;
        if (player == _captainCT) _ctVote = vote;

        Server.PrintToChatAll(
            $" {ChatColors.Orange}[VOTE]{ChatColors.White} {player.PlayerName} voted {ChatColors.Yellow}{vote}");

        if (_tVote != SpreadMode.NotVoted && _ctVote != SpreadMode.NotVoted)
            ApplyResult();
        else if (_tVote != SpreadMode.NotVoted && _ctVote == SpreadMode.NotVoted)
            Server.PrintToChatAll($" {ChatColors.Grey}Waiting for CT captain to vote...");
        else if (_ctVote != SpreadMode.NotVoted && _tVote == SpreadMode.NotVoted)
            Server.PrintToChatAll($" {ChatColors.Grey}Waiting for T captain to vote...");

        return true;
    }

    private void ApplyResult()
    {
        _applied = true;
        // T captain breaks tie
        Result = _tVote;

        ApplyCvars(Result);
        string label = Result == SpreadMode.NoSpread ? "NO SPREAD" : "SPREAD";
        Server.PrintToChatAll($" {ChatColors.Orange}[CHEATIT]{ChatColors.White} Mode set: {ChatColors.Yellow}{label}");
        OnVoteComplete?.Invoke(Result);
    }

    private static void ApplyCvars(SpreadMode mode)
    {
        if (mode == SpreadMode.NoSpread)
        {
            Server.ExecuteCommand("sv_spread_override 0");
            Server.ExecuteCommand("weapon_accuracy_nospread 1");
            Server.ExecuteCommand("sv_cheats 1");
            Server.ExecuteCommand("weapon_recoil_scale 0");
        }
        else
        {
            Server.ExecuteCommand("sv_spread_override -1");
            Server.ExecuteCommand("weapon_accuracy_nospread 0");
            Server.ExecuteCommand("sv_cheats 0");
            Server.ExecuteCommand("weapon_recoil_scale 2");
        }
    }

    public void Reset()
    {
        _tVote  = SpreadMode.NotVoted;
        _ctVote = SpreadMode.NotVoted;
        _applied = false;
        Result   = SpreadMode.NotVoted;
    }
}
