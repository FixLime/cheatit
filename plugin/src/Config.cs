using CounterStrikeSharp.API.Core;
using System.Text.Json.Serialization;

namespace CHEATIT;

public class CHEATITConfig : BasePluginConfig
{
    [JsonPropertyName("backend_url")]
    public string BackendUrl { get; set; } = "http://localhost:3000";

    [JsonPropertyName("api_key")]
    public string ApiKey { get; set; } = "change_me";

    [JsonPropertyName("match_id")]
    public string MatchId { get; set; } = "";

    [JsonPropertyName("awp_limit")]
    public int AwpLimit { get; set; } = 2;

    [JsonPropertyName("knife_round_zeus")]
    public bool KnifeRoundZeus { get; set; } = true;

    [JsonPropertyName("calibration_matches")]
    public int CalibrationMatches { get; set; } = 10;

    [JsonPropertyName("maps")]
    public List<string> Maps { get; set; } = new()
    {
        "de_mirage", "de_inferno", "de_nuke", "de_ancient",
        "de_anubis", "de_dust2", "de_vertigo", "de_overpass"
    };
}
