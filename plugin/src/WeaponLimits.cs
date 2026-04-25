using CounterStrikeSharp.API;
using CounterStrikeSharp.API.Core;
using CounterStrikeSharp.API.Modules.Timers;
using CounterStrikeSharp.API.Modules.Utils;

namespace CHEATIT;

public class WeaponLimits
{
    private readonly int _awpLimit;
    // SteamIDs of players who won the Zeus round (their team)
    private CsTeam _zeusWinnerTeam = CsTeam.None;
    private bool _zeusRoundDone = false;

    private static readonly string[] RestrictedWeapons = { "weapon_awp", "weapon_scar20" };

    public WeaponLimits(int awpLimit)
    {
        _awpLimit = awpLimit;
    }

    public void SetZeusWinner(CsTeam team)
    {
        _zeusWinnerTeam = team;
        _zeusRoundDone  = true;
        Server.PrintToChatAll(
            $" {ChatColors.Orange}[CHEATIT]{ChatColors.White} Zeus round won by {ChatColors.Yellow}{TeamName(team)}" +
            $"{ChatColors.White} — they get {ChatColors.Orange}unlimited SCAR-20{ChatColors.White} this match.");
    }

    public void Reset()
    {
        _zeusWinnerTeam = CsTeam.None;
        _zeusRoundDone  = false;
    }

    // Call on EventItemPickup — strip disallowed weapons
    public void OnWeaponPickup(CCSPlayerController player, string weaponName)
    {
        if (player.PlayerPawn.Value == null) return;

        if (weaponName == "weapon_awp")
        {
            int teamAwpCount = CountTeamWeapon(player.Team, "weapon_awp");
            if (teamAwpCount > _awpLimit)
            {
                StripWeapon(player, "weapon_awp");
                player.PrintToChat(
                    $" {ChatColors.Orange}[CHEATIT]{ChatColors.Red} AWP limit reached ({_awpLimit}/team). Weapon removed.");
            }
        }

        if (weaponName == "weapon_scar20")
        {
            bool canUseScar = _zeusRoundDone && player.Team == _zeusWinnerTeam;
            if (!canUseScar)
            {
                StripWeapon(player, "weapon_scar20");
                string reason = _zeusRoundDone
                    ? "SCAR-20 is only available to the Zeus round winner team."
                    : "SCAR-20 is unlocked after the Zeus round.";
                player.PrintToChat($" {ChatColors.Orange}[CHEATIT]{ChatColors.Red} {reason}");
            }
        }
    }

    private static int CountTeamWeapon(CsTeam team, string weapon)
    {
        int count = 0;
        foreach (var p in Utilities.GetPlayers())
        {
            if (p.Team != team || p.PlayerPawn.Value == null) continue;
            var weapons = p.PlayerPawn.Value.WeaponServices?.MyWeapons;
            if (weapons == null) continue;
            foreach (var w in weapons)
            {
                if (w.IsValid && w.Value?.DesignerName == weapon)
                    count++;
            }
        }
        return count;
    }

    private static void StripWeapon(CCSPlayerController player, string weapon)
    {
        if (player.PlayerPawn.Value?.WeaponServices?.MyWeapons == null) return;
        foreach (var w in player.PlayerPawn.Value.WeaponServices.MyWeapons)
        {
            if (w.IsValid && w.Value?.DesignerName == weapon)
            {
                player.PlayerPawn.Value.WeaponServices.ActiveWeapon.Raw = w.Raw;
                player.DropActiveWeapon();
                break;
            }
        }
    }

    private static string TeamName(CsTeam team) =>
        team == CsTeam.Terrorist ? "T" : "CT";
}
