using CounterStrikeSharp.API;
using CounterStrikeSharp.API.Core;
using CounterStrikeSharp.API.Core.Attributes.Registration;
using CounterStrikeSharp.API.Modules.Commands;
using CounterStrikeSharp.API.Modules.Utils;
using CounterStrikeSharp.API.Modules.Timers;

namespace CHEATIT;

public class CHEATITPlugin : BasePlugin, IPluginConfig<CHEATITConfig>
{
    public override string ModuleName    => "CHEATIT";
    public override string ModuleVersion => "1.0.0";
    public override string ModuleAuthor  => "CHEATIT";

    public CHEATITConfig Config { get; set; } = new();

    private MatchStats    _stats       = new();
    private WeaponLimits  _weapons     = null!;
    private MapVote       _mapVote     = null!;
    private SpreadVote    _spreadVote  = new();
    private EloSystem     _elo         = null!;

    private bool   _zeusRoundActive = false;
    private bool   _matchLive       = false;
    private bool   _warmupDone      = false;
    private int    _totalRounds     = 0;

    // Readied-up players
    private HashSet<ulong> _readyPlayers = new();
    private int _requiredReady = 10; // 5v5

    public void OnConfigParsed(CHEATITConfig config)
    {
        Config     = config;
        _weapons   = new WeaponLimits(config.AwpLimit);
        _mapVote   = new MapVote(config.Maps);
        _elo       = new EloSystem(config.BackendUrl, config.ApiKey, config.MatchId, config.CalibrationMatches);
    }

    public override void Load(bool hotReload)
    {
        // Stats events
        RegisterEventHandler<EventPlayerHurt>(OnPlayerHurt);
        RegisterEventHandler<EventPlayerDeath>(OnPlayerDeath);
        RegisterEventHandler<EventRoundEnd>(OnRoundEnd);
        RegisterEventHandler<EventRoundStart>(OnRoundStart);
        RegisterEventHandler<EventCsWinPanelMatch>(OnMatchEnd);
        RegisterEventHandler<EventItemPickup>(OnItemPickup);
        RegisterEventHandler<EventPlayerConnectFull>(OnPlayerConnect);
        RegisterEventHandler<EventPlayerDisconnect>(OnPlayerDisconnect);

        // Commands
        AddCommand("css_ready",    "Mark yourself as ready",       OnCommandReady);
        AddCommand("css_unready",  "Mark yourself as not ready",   OnCommandUnready);
        AddCommand("css_stats",    "Show your match stats",        OnCommandStats);
        AddCommand("css_ban",      "Map vote: ban a map",          OnCommandMapBan);
        AddCommand("css_pick",     "Map vote: pick a map",         OnCommandMapPick);
        AddCommand("css_spread",   "Vote for spread",              OnCommandSpread);
        AddCommand("css_nospread", "Vote for nospread",            OnCommandNoSpread);

        Server.PrintToChatAll($" {ChatColors.Orange}[CHEATIT] Plugin loaded. Type !ready when ready.");
    }

    // ── READY SYSTEM ─────────────────────────────────────────────────────────

    private void OnCommandReady(CCSPlayerController? player, CommandInfo info)
    {
        if (player == null || _matchLive) return;
        _readyPlayers.Add(player.SteamID);
        int count = _readyPlayers.Count;
        Server.PrintToChatAll(
            $" {ChatColors.Orange}[CHEATIT]{ChatColors.Green} {player.PlayerName} is READY {ChatColors.Grey}({count}/{_requiredReady})");

        if (count >= _requiredReady)
            StartMatchFlow();
    }

    private void OnCommandUnready(CCSPlayerController? player, CommandInfo info)
    {
        if (player == null || _matchLive) return;
        _readyPlayers.Remove(player.SteamID);
        player.PrintToChat($" {ChatColors.Orange}[CHEATIT]{ChatColors.Red} You are no longer ready.");
    }

    private void StartMatchFlow()
    {
        Server.PrintToChatAll($" {ChatColors.Orange}━━━━ ALL PLAYERS READY ━━━━");
        Server.PrintToChatAll($" {ChatColors.White}Starting map vote...");

        _spreadVote.StartVote();

        // After 30 seconds (or when spread vote done), start map vote
        AddTimer(30f, () =>
        {
            if (_mapVote.SelectedMap == null)
                _mapVote.Start();
        });
    }

    // ── ROUND EVENTS ─────────────────────────────────────────────────────────

    private HookResult OnRoundStart(EventRoundStart ev, GameEventInfo info)
    {
        _stats.RoundNumber++;
        _stats.ResetRound();

        if (_stats.RoundNumber == 1 && Config.KnifeRoundZeus)
        {
            _zeusRoundActive = true;
            Server.PrintToChatAll($" {ChatColors.Orange}━━━━ ZEUS ROUND ━━━━");
            Server.PrintToChatAll($" {ChatColors.White}Round 1 is a Zeus round. Winner team gets {ChatColors.Orange}unlimited SCAR-20.");

            // Give all players only Zeus + knife; strip everything else after short delay
            AddTimer(0.5f, () =>
            {
                foreach (var p in Utilities.GetPlayers().Where(p => p.IsValid && !p.IsBot && p.PawnIsAlive))
                {
                    p.RemoveWeapons();
                    p.GiveNamedItem("weapon_taser");
                    p.GiveNamedItem("weapon_knife");
                    p.PrintToChat($" {ChatColors.Orange}[Zeus Round]{ChatColors.White} Kill with Zeus to win SCAR-20 for your team.");
                }
            });
        }
        else
        {
            _zeusRoundActive = false;
        }

        return HookResult.Continue;
    }

    private HookResult OnRoundEnd(EventRoundEnd ev, GameEventInfo info)
    {
        if (_stats.RoundNumber == 1 && _zeusRoundActive)
        {
            // Winner of Zeus round
            CsTeam winner = (CsTeam)ev.Winner;
            _weapons.SetZeusWinner(winner);
            _zeusRoundActive = false;
        }

        _stats.PrintRoundSummary(_stats.RoundNumber);
        _totalRounds++;
        return HookResult.Continue;
    }

    private HookResult OnMatchEnd(EventCsWinPanelMatch ev, GameEventInfo info)
    {
        _matchLive = false;
        var results = BuildMatchResults();
        var tScore  = Utilities.GetPlayers().FirstOrDefault(p => p.Team == CsTeam.Terrorist)
            ?.ActionTrackingServices?.MatchStats?.Score ?? 0;
        var ctScore = Utilities.GetPlayers().FirstOrDefault(p => p.Team == CsTeam.CounterTerrorist)
            ?.ActionTrackingServices?.MatchStats?.Score ?? 0;

        CsTeam winner = tScore > ctScore ? CsTeam.Terrorist : CsTeam.CounterTerrorist;

        // Submit ELO async
        Task.Run(async () =>
        {
            await _elo.SubmitMatchResultsAsync(results, winner, tScore, ctScore);
        });

        // Reset for next match
        _stats       = new MatchStats();
        _weapons.Reset();
        _spreadVote.Reset();
        _readyPlayers.Clear();

        return HookResult.Continue;
    }

    // ── STAT TRACKING ────────────────────────────────────────────────────────

    private HookResult OnPlayerHurt(EventPlayerHurt ev, GameEventInfo info)
    {
        if (ev.Attacker == null || ev.Userid == null) return HookResult.Continue;
        if (ev.Attacker == ev.Userid) return HookResult.Continue;
        _stats.AddDamage(ev.Attacker, ev.Userid, ev.DmgHealth, ev.Hitgroup == 1);
        return HookResult.Continue;
    }

    private HookResult OnPlayerDeath(EventPlayerDeath ev, GameEventInfo info)
    {
        if (ev.Userid != null) _stats.AddDeath(ev.Userid);
        if (ev.Attacker != null && ev.Attacker != ev.Userid)
            _stats.AddKill(ev.Attacker, ev.Headshot);
        if (ev.Assister != null) _stats.AddAssist(ev.Assister);

        // Zeus kill in round 1 — announce it
        if (_zeusRoundActive && ev.Attacker != null && ev.Weapon == "taser")
        {
            Server.PrintToChatAll(
                $" {ChatColors.Orange}⚡ {ev.Attacker.PlayerName} eliminated {ev.Userid?.PlayerName} with Zeus!");
        }
        return HookResult.Continue;
    }

    private HookResult OnItemPickup(EventItemPickup ev, GameEventInfo info)
    {
        if (ev.Userid == null) return HookResult.Continue;
        // Strip disallowed weapons in Zeus round
        if (_zeusRoundActive)
        {
            string w = ev.Item;
            if (w != "taser" && w != "knife")
            {
                AddTimer(0.1f, () =>
                {
                    if (ev.Userid.IsValid && ev.Userid.PlayerPawn.IsValid)
                        ev.Userid.RemoveWeapons();
                    ev.Userid.GiveNamedItem("weapon_taser");
                    ev.Userid.GiveNamedItem("weapon_knife");
                });
            }
        }

        if (!_zeusRoundActive)
            _weapons.OnWeaponPickup(ev.Userid, "weapon_" + ev.Item);

        return HookResult.Continue;
    }

    // ── PLAYER CONNECT ───────────────────────────────────────────────────────

    private HookResult OnPlayerConnect(EventPlayerConnectFull ev, GameEventInfo info)
    {
        if (ev.Userid == null) return HookResult.Continue;
        AddTimer(2f, () =>
        {
            ev.Userid.PrintToChat($" {ChatColors.Orange}[CHEATIT]{ChatColors.White} Welcome! Type {ChatColors.Yellow}!ready{ChatColors.White} when ready.");
            ev.Userid.PrintToChat($" {ChatColors.Grey}Commands: !ready !spread !nospread !stats");
        });
        return HookResult.Continue;
    }

    private HookResult OnPlayerDisconnect(EventPlayerDisconnect ev, GameEventInfo info)
    {
        if (ev.Userid != null)
            _readyPlayers.Remove(ev.Userid.SteamID);
        return HookResult.Continue;
    }

    // ── CHAT COMMANDS ────────────────────────────────────────────────────────

    private void OnCommandStats(CCSPlayerController? player, CommandInfo info)
    {
        if (player == null) return;
        if (!_stats.Total.TryGetValue(player.SteamID, out var s))
        {
            player.PrintToChat($" {ChatColors.Grey}No stats yet this match.");
            return;
        }
        float kd = s.Deaths > 0 ? (float)s.Kills / s.Deaths : s.Kills;
        player.PrintToChat($" {ChatColors.Orange}[CHEATIT] Your stats:");
        player.PrintToChat($"   K/D: {ChatColors.Yellow}{kd:F2}  Kills: {s.Kills}  Deaths: {s.Deaths}  Assists: {s.Assists}");
        player.PrintToChat($"   Damage: {ChatColors.Yellow}{s.Damage}  HS%: {(s.Kills > 0 ? (int)(100f * s.HsKills / s.Kills) : 0)}%");
    }

    private void OnCommandMapBan(CCSPlayerController? player, CommandInfo info)
    {
        if (player == null) return;
        string msg = "!ban " + string.Join(" ", info.ArgString.Split(' ').Skip(0));
        _mapVote.HandleChat(player, msg);
    }

    private void OnCommandMapPick(CCSPlayerController? player, CommandInfo info)
    {
        if (player == null) return;
        string msg = "!pick " + info.ArgString;
        _mapVote.HandleChat(player, msg);
    }

    private void OnCommandSpread(CCSPlayerController? player, CommandInfo info)
    {
        if (player == null) return;
        _spreadVote.HandleChat(player, "!spread");
    }

    private void OnCommandNoSpread(CCSPlayerController? player, CommandInfo info)
    {
        if (player == null) return;
        _spreadVote.HandleChat(player, "!nospread");
    }

    // ── HELPERS ──────────────────────────────────────────────────────────────

    private List<MatchResult> BuildMatchResults()
    {
        return _stats.Total.Select(kv => new MatchResult
        {
            SteamId  = kv.Key,
            Name     = kv.Value.Name,
            Won      = false, // filled after
            Kills    = kv.Value.Kills,
            Deaths   = kv.Value.Deaths,
            Assists  = kv.Value.Assists,
            Damage   = kv.Value.Damage,
            HsKills  = kv.Value.HsKills,
            Team     = kv.Value.Team,
        }).ToList();
    }
}
