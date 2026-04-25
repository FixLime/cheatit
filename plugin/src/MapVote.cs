using CounterStrikeSharp.API;
using CounterStrikeSharp.API.Core;
using CounterStrikeSharp.API.Modules.Utils;
using CounterStrikeSharp.API.Modules.Timers;

namespace CHEATIT;

public enum VotePhase { Idle, Ban, Pick, Done }

public class MapVote
{
    private readonly List<string> _pool;
    private readonly List<string> _remaining;
    private readonly List<string> _picked = new();

    private VotePhase _phase = VotePhase.Idle;
    private int _banRound = 0;
    private int _pickRound = 0;

    // Captains: one per team
    private CCSPlayerController? _captainT;
    private CCSPlayerController? _captainCT;
    private bool _waitingForVote = false;

    // Ban order: T CT T CT T CT → then T picks, CT picks, T picks (bo3) or just T picks (bo1)
    // For bo1: 3 bans each, 1 map
    private static readonly CsTeam[] BanOrder = {
        CsTeam.Terrorist, CsTeam.CounterTerrorist,
        CsTeam.Terrorist, CsTeam.CounterTerrorist,
        CsTeam.Terrorist, CsTeam.CounterTerrorist,
    };

    public string? SelectedMap { get; private set; }
    public event Action<string>? OnMapSelected;

    public MapVote(List<string> maps)
    {
        _pool      = new List<string>(maps);
        _remaining = new List<string>(maps);
    }

    public void AssignCaptains(CCSPlayerController t, CCSPlayerController ct)
    {
        _captainT  = t;
        _captainCT = ct;
    }

    public void Start()
    {
        if (_captainT == null || _captainCT == null)
        {
            // Auto-pick captains (highest elo → highest in player list)
            var players = Utilities.GetPlayers().Where(p => p.IsValid && !p.IsBot).ToList();
            _captainT  = players.FirstOrDefault(p => p.Team == CsTeam.Terrorist);
            _captainCT = players.FirstOrDefault(p => p.Team == CsTeam.CounterTerrorist);
        }

        _phase    = VotePhase.Ban;
        _banRound = 0;

        Server.PrintToChatAll($" {ChatColors.Orange}━━━━ MAP VOTE ━━━━");
        Server.PrintToChatAll($" {ChatColors.White}Captains: {ChatColors.Red}{_captainT?.PlayerName ?? "?"}{ChatColors.White} (T) vs {ChatColors.Blue}{_captainCT?.PlayerName ?? "?"}{ChatColors.White} (CT)");
        PrintMapList();
        PromptNextBan();
    }

    private void PrintMapList()
    {
        Server.PrintToChatAll($" {ChatColors.Orange}Available maps:");
        for (int i = 0; i < _remaining.Count; i++)
            Server.PrintToChatAll($"   {ChatColors.Yellow}{i + 1}.{ChatColors.White} {_remaining[i]}");
        Server.PrintToChatAll($" {ChatColors.Grey}Type !ban <number> or !pick <number> in chat.");
    }

    private void PromptNextBan()
    {
        if (_banRound >= BanOrder.Length)
        {
            StartPickPhase();
            return;
        }

        _waitingForVote = true;
        var team    = BanOrder[_banRound];
        var captain = team == CsTeam.Terrorist ? _captainT : _captainCT;
        var color   = team == CsTeam.Terrorist ? ChatColors.Red : ChatColors.Blue;

        Server.PrintToChatAll(
            $" {color}{captain?.PlayerName ?? "Captain"}{ChatColors.White} — ban a map. Type {ChatColors.Yellow}!ban <number>");
    }

    private void StartPickPhase()
    {
        if (_remaining.Count == 1)
        {
            // Last map auto-selected
            FinishWithMap(_remaining[0]);
            return;
        }
        _phase     = VotePhase.Pick;
        _pickRound = 0;
        Server.PrintToChatAll($" {ChatColors.Orange}Ban phase done. Now picking the map.");
        PrintMapList();
        PromptNextPick();
    }

    private void PromptNextPick()
    {
        _waitingForVote = true;
        // T captain picks first
        Server.PrintToChatAll(
            $" {ChatColors.Red}{_captainT?.PlayerName ?? "T Captain"}{ChatColors.White} — pick the map. Type {ChatColors.Yellow}!pick <number>");
    }

    public bool HandleChat(CCSPlayerController player, string message)
    {
        if (!_waitingForVote) return false;

        var parts = message.Trim().Split(' ', 2);
        var cmd   = parts[0].ToLower();
        var arg   = parts.Length > 1 ? parts[1].Trim() : "";

        bool isCaptain = player == _captainT || player == _captainCT;
        if (!isCaptain) return false;

        if (_phase == VotePhase.Ban && cmd == "!ban")
        {
            if (!int.TryParse(arg, out int idx) || idx < 1 || idx > _remaining.Count) return false;
            var expectedTeam = BanOrder[_banRound];
            if (player.Team != expectedTeam)
            {
                player.PrintToChat($" {ChatColors.Red}It's not your turn to ban.");
                return true;
            }

            string banned = _remaining[idx - 1];
            _remaining.RemoveAt(idx - 1);
            _waitingForVote = false;
            _banRound++;

            Server.PrintToChatAll(
                $" {ChatColors.Red}[BAN]{ChatColors.White} {player.PlayerName} banned {ChatColors.Yellow}{banned}");
            PrintMapList();
            PromptNextBan();
            return true;
        }

        if (_phase == VotePhase.Pick && cmd == "!pick")
        {
            if (player != _captainT) { player.PrintToChat($" {ChatColors.Red}Only T captain picks."); return true; }
            if (!int.TryParse(arg, out int idx) || idx < 1 || idx > _remaining.Count) return false;

            string picked = _remaining[idx - 1];
            _waitingForVote = false;
            FinishWithMap(picked);
            return true;
        }

        return false;
    }

    private void FinishWithMap(string map)
    {
        _phase       = VotePhase.Done;
        SelectedMap  = map;
        Server.PrintToChatAll($" {ChatColors.Orange}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        Server.PrintToChatAll($" {ChatColors.Orange}[CHEATIT]{ChatColors.White} Map selected: {ChatColors.Yellow}{map}");
        Server.PrintToChatAll($" {ChatColors.Orange}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        Server.ExecuteCommand($"changelevel {map}");
        OnMapSelected?.Invoke(map);
    }
}
