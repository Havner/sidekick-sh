// version 0.6.1

// This is not a config file, nothing to change here
// unless you want to modify overlay's behaviour

var sb_last_index = 0;
var sb_prev = [];

var pb_last_index = 0;
var pb_prev = [];

function SBtrend()
{
	var sb_delta = $prop('PersistantTrackerPlugin.SessionBestLiveDeltaSeconds');

	sb_prev[sb_last_index++] = sb_delta;
	sb_last_index = sb_last_index % deltaHistory;

	var sb_trend = sb_delta * deltaHistory;

	for (var k = 0; k < deltaHistory; k++) {
		if (sb_prev[k] == null)
			return 0;
		sb_trend -= sb_prev[k];
	}
	return sb_trend;
}

function PBtrend()
{
	var pb_delta = $prop('PersistantTrackerPlugin.AllTimeBestLiveDeltaSeconds');

	pb_prev[pb_last_index++] = pb_delta;
	pb_last_index = pb_last_index % deltaHistory;

	var pb_trend = pb_delta * deltaHistory;

	for (var k = 0; k < deltaHistory; k++) {
		if (pb_prev[k] == null)
			return 0;
		pb_trend -= pb_prev[k];
	}
	return pb_trend;
}

var lastFFBclip = null;

function isClipping()
{
	if (FBBClippingTime < 0)
		return 0;

	var ffb = $prop('DataCorePlugin.GameRawData.forceFeedback.mForceValue');

	if (Math.abs(ffb) == 1) {
		if (lastFFBclip) {
			var now = new Date().getTime();
			if (now - lastFFBclip > FBBClippingTime)
				return 1;
		} else {
			lastFFBclip = new Date().getTime();
		}
	} else {
		lastFFBclip = null;
	}

	return 0;
}

function handleGradient2(table, min, max, val)
{
	var mult = (table[1] - table[0]) / (max - min);
	var shift = table[0] / mult - min;

	return val / mult - shift;
}

function handleGradient4(table, min, mid, max, val)
{
	var gradient1 = [table[0], table[1]];
	var gradient2 = [table[2], table[3]];

	if (val < table[1])
		return handleGradient2(gradient1, min, mid, val);
	if (val > table [2])
		return handleGradient2(gradient2, mid, max, val);
	return mid;
}

function showFuelWarn()
{
	var fuel = $prop('DataCorePlugin.GameData.Fuel');
	if (warnFuelOnValue > 0 && fuel > 0 && warnFuelOnValue >= fuel)
		return 1;

	var percent = $prop('DataCorePlugin.GameData.FuelPercent');
	if (warnFuelOnPercent > 0 && percent > 0 && warnFuelOnPercent >= percent)
		return 1;

	var laps = $prop('DataCorePlugin.Computed.Fuel_RemainingLaps');
	if (warnFuelOnLaps > 0 && laps > 0 && warnFuelOnLaps >= laps)
		return 1;

	var alert = $prop('DataCorePlugin.GameData.CarSettings_FuelAlertActive');
	return alert;
}

function showPitLimiter()
{
	var pl = $prop('DataCorePlugin.GameData.PitLimiterOn');
	if (pl && usePitLimiterColor)
		return 1;
	return 0;
}

function showLastLapTime()
{
	// If there is no last time (e.g. after first red lap),
	// don't display last after finished lap, use new current
	if (lastIsEmpty())
		return false;

	// If we're N milisecs into the new lap display last lap time
	return (timeIntoLap() < showLastLapFor);
}

function showLastLapDelta(lap_var)
{
	// If the current lap is red, the live deltas will be invalid, display -.--
	if (currentIsRed())
		return -1;

	// If there is no valid time to compare to, display -.--
	var lap = $prop(lap_var);
	if (lap == '00:00:00')
		return -1;

	// If there is no last time (e.g. after first red lap),
	// don't display last after finished lap, use new delta
	if (lastIsEmpty())
		return 0;

	// If we're N milisecs into new lap display last lap delta
	if (timeIntoLap() < showLastLapFor)
		return 1;

	// Else, use live delta
	return 0;
}

function showBrakeTemps()
{
	var brake = $prop('DataCorePlugin.GameData.Brake');
	return (showBrakeTempsWhileBraking && brake > 0);
}

function showDRSAvail()
{
	var drs = $prop('DataCorePlugin.GameData.DRSAvailable');
	return (useDRS && drs);
}

function showDRSEnabled()
{
	var drs = $prop('DataCorePlugin.GameData.DRSEnabled');
	return (useDRS && drs);
}

// helpers, not used directly in SimHub

function currentIsRed()
{
	var valid = $prop('DataCorePlugin.Computed.Fuel_CurrentLapIsValidForTracking');
	return (valid == 0);
}

function lastIsEmpty()
{
	var last = $prop('DataCorePlugin.GameData.LastLapTime')
	return (last == '00:00:00');
}

function timeIntoLap()
{
	var lap = $prop('DataCorePlugin.GameData.CurrentLapTime');
	var date = new Date('January 1, 1970 ' + lap + ' GMT');
	return date.getTime();
}
