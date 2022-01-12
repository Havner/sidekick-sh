// version 0.7.2

// This is not a config file, nothing to change here
// unless you want to modify overlay's behaviour

var SKSH_sb_last_index = 0;
var SKSH_sb_prev = [];

var SKSH_pb_last_index = 0;
var SKSH_pb_prev = [];

function SKSH_showSBtrend()
{
	if (!SKSH_deltaExist('PersistantTrackerPlugin.SessionBest'))
		return 0;

	const sb_delta = $prop('PersistantTrackerPlugin.SessionBestLiveDeltaSeconds');

	SKSH_sb_prev[SKSH_sb_last_index++] = sb_delta;
	SKSH_sb_last_index = SKSH_sb_last_index % deltaHistory;

	var SKSH_sb_trend = sb_delta * deltaHistory;

	for (var k = 0; k < deltaHistory; k++) {
		if (SKSH_sb_prev[k] == null)
			return 0;
		SKSH_sb_trend -= SKSH_sb_prev[k];
	}
	return SKSH_sb_trend;
}

function SKSH_showPBtrend()
{
	if (!SKSH_deltaExist('PersistantTrackerPlugin.AllTimeBest'))
		return 0;

	const pb_delta = $prop('PersistantTrackerPlugin.AllTimeBestLiveDeltaSeconds');

	SKSH_pb_prev[SKSH_pb_last_index++] = pb_delta;
	SKSH_pb_last_index = SKSH_pb_last_index % deltaHistory;

	var SKSH_pb_trend = pb_delta * deltaHistory;

	for (var k = 0; k < deltaHistory; k++) {
		if (SKSH_pb_prev[k] == null)
			return 0;
		SKSH_pb_trend -= SKSH_pb_prev[k];
	}
	return SKSH_pb_trend;
}

function SKSH_showHeadlights()
{
	switch ($prop('DataCorePlugin.CurrentGame')) {
		case 'RFactor2':
			if ($prop('GameRawData.CurrentPlayer.mHeadlights'))
				return true;
			return false;
		case 'Automobilista2':
			if (($prop('GameRawData.mCarFlags') & 1) != 0)
				return true;
			return false;
		case 'AssettoCorsaCompetizione':
			if ($prop('DataCorePlugin.GameRawData.Graphics.LightsStage') == 1)
				return true;
			return false;
	}

	return false;
}

function SKSH_showHighBeams()
{
	switch ($prop('DataCorePlugin.CurrentGame')) {
		case 'AssettoCorsaCompetizione':
			if ($prop('DataCorePlugin.GameRawData.Graphics.LightsStage') == 2)
				return true;
			return false;
	}

	return false;
}

var SKSH_lastFFBclip = null;

function SKSH_isClipping()
{
	if (FBBClippingTime < 0)
		return 0;

	var ffb = null;
	switch ($prop('DataCorePlugin.CurrentGame')) {
		case 'RFactor2':
			ffb = $prop('DataCorePlugin.GameRawData.forceFeedback.mForceValue');
			break;
		default:
			return 0;
	}

	if (Math.abs(ffb) == 1) {
		if (SKSH_lastFFBclip) {
			const now = new Date().getTime();
			if (now - SKSH_lastFFBclip > FBBClippingTime)
				return 1;
		} else {
			SKSH_lastFFBclip = new Date().getTime();
		}
	} else {
		SKSH_lastFFBclip = null;
	}

	return 0;
}

function SKSH_getValue(valProp, empty)
{
	const val = $prop(valProp);
	if (!val)
		return empty;
	if (val == 0)
		return empty;
	return val;
}

function SKSH_getTime(lapProp, empty)
{
	const lap = $prop(lapProp);
	if (lap == '00:00:00')
		return empty;
	if (String(lap)[0] == '-')
		return empty;
	return lap;
}

function SKSH_getGradient2(table, min, max, val)
{
	const mult = (table[1] - table[0]) / (max - min);
	const shift = table[0] / mult - min;

	return val / mult - shift;
}

function SKSH_getGradient4(table, min, mid, max, val)
{
	const gradient1 = [table[0], table[1]];
	const gradient2 = [table[2], table[3]];

	if (val < table[1])
		return SKSH_getGradient2(gradient1, min, mid, val);
	if (val > table [2])
		return SKSH_getGradient2(gradient2, mid, max, val);
	return mid;
}

function SKSH_getLastLapColor()
{
	var last = $prop('LastLapTime');
	var session = $prop('PersistantTrackerPlugin.SessionBest');
	var alltime = $prop('PersistantTrackerPlugin.AllTimeBest');

	if (!SKSH_getTime('LastLapTime', null))
		return 0;

	if (last == alltime)
		return 2;
	if (last == session)
		return 1;
	return 0;
}

function SKSH_getShiftLight()
{
	if ($prop('CarSettings_RPMRedLineReached') > 0)
		return 3;
	if ($prop('CarSettings_RPMShiftLight2') > 0)
		return 2;
	if (useGreenBar && $prop('CarSettings_RPMShiftLight1') > 0)
		return 1;
	return 0;
}

function SKSH_showFuelWarn()
{
	const fuel = $prop('Fuel');
	if (warnFuelOnValue > 0 && fuel > 0 && warnFuelOnValue >= fuel)
		return 1;

	const percent = $prop('FuelPercent');
	if (warnFuelOnPercent > 0 && percent > 0 && warnFuelOnPercent >= percent)
		return 1;

	const laps = $prop('DataCorePlugin.Computed.Fuel_RemainingLaps');
	if (warnFuelOnLaps > 0 && laps > 0 && warnFuelOnLaps >= laps)
		return 1;

	const alert = $prop('CarSettings_FuelAlertActive');
	return alert;
}

function SKSH_showPitLimiter()
{
	if (usePitLimiterColor && $prop('PitLimiterOn'))
		return 1;
	return 0;
}

function SKSH_showLastLapTime()
{
	// If there is no last time (e.g. after first red lap),
	// don't display last after finished lap, use new current
	if (!SKSH_getTime('LastLapTime', null))
		return false;

	// If we're N milisecs into the new lap display last lap time
	return (SKSH_timeIntoLap() < showLastLapFor);
}

function SKSH_showLastLapDelta(lapProp)
{
	if (!SKSH_deltaExist(lapProp))
		return false;

	// If there is no last time (e.g. after first red lap),
	// don't display last after finished lap, use new delta
	if (!SKSH_getTime('LastLapTime', null))
		return false;

	// If we're N milisecs into new lap display last lap delta
	return (SKSH_timeIntoLap() < showLastLapFor);
}

function SKSH_getDelta(lapProp, deltaProp, empty)
{
	if (!SKSH_deltaExist(lapProp))
		return empty;

	var delta = $prop(deltaProp);
	if (delta >= 100)
		return "+99.99";

	if (Math.abs(delta) > 10)
		return format(delta, '0.0', 1);
	return format(delta, '0.00', 1);
}

var SKSH_savedDmgChanged = 0;

// rFactor 2
var SKSH_savedDmg1 = 0;
var SKSH_savedDmg2 = 0;
var SKSH_savedDmg3 = 0;
var SKSH_savedDmg4 = 0;
var SKSH_savedDmg5 = 0;
var SKSH_savedDmg6 = 0;
var SKSH_savedDmg7 = 0;
var SKSH_savedDmg8 = 0;
var SKSH_savedDmgDetached = 0;
var SKSH_savedWheel1Detached = 0;
var SKSH_savedWheel2Detached = 0;
var SKSH_savedWheel3Detached = 0;
var SKSH_savedWheel4Detached = 0;

function SKSH_RF2_showDamage()
{
	var showDmg = false;

	if (SKSH_savedDmgChanged != 0) {
		if ((SKSH_upTime() - SKSH_savedDmgChanged) < showDamageWhenDamaged)
			showDmg = true;
		else
			SKSH_savedDmgChanged = 0;
	}

	const dmg1 = $prop('GameRawData.CurrentPlayerTelemetry.mDentSeverity01');
	const dmg2 = $prop('GameRawData.CurrentPlayerTelemetry.mDentSeverity02');
	const dmg3 = $prop('GameRawData.CurrentPlayerTelemetry.mDentSeverity03');
	const dmg4 = $prop('GameRawData.CurrentPlayerTelemetry.mDentSeverity04');
	const dmg5 = $prop('GameRawData.CurrentPlayerTelemetry.mDentSeverity05');
	const dmg6 = $prop('GameRawData.CurrentPlayerTelemetry.mDentSeverity06');
	const dmg7 = $prop('GameRawData.CurrentPlayerTelemetry.mDentSeverity07');
	const dmg8 = $prop('GameRawData.CurrentPlayerTelemetry.mDentSeverity08');
	const dmgDetached = $prop('GameRawData.CurrentPlayerTelemetry.mDetached');
	const dmgWheel1Detached = $prop('GameRawData.CurrentPlayerTelemetry.mWheels01.mDetached');
	const dmgWheel2Detached = $prop('GameRawData.CurrentPlayerTelemetry.mWheels02.mDetached');
	const dmgWheel3Detached = $prop('GameRawData.CurrentPlayerTelemetry.mWheels03.mDetached');
	const dmgWheel4Detached = $prop('GameRawData.CurrentPlayerTelemetry.mWheels04.mDetached');

	if (SKSH_savedDmg1 != dmg1 ||
		SKSH_savedDmg2 != dmg2 ||
		SKSH_savedDmg3 != dmg3 ||
		SKSH_savedDmg4 != dmg4 ||
		SKSH_savedDmg5 != dmg5 ||
		SKSH_savedDmg6 != dmg6 ||
		SKSH_savedDmg7 != dmg7 ||
		SKSH_savedDmg8 != dmg8 ||
		SKSH_savedDmgDetached != dmgDetached ||
		SKSH_savedWheel1Detached != dmgWheel1Detached ||
		SKSH_savedWheel2Detached != dmgWheel2Detached ||
		SKSH_savedWheel3Detached != dmgWheel3Detached ||
		SKSH_savedWheel4Detached != dmgWheel4Detached)
	{
		SKSH_savedDmg1 = dmg1;
		SKSH_savedDmg2 = dmg2;
		SKSH_savedDmg3 = dmg3;
		SKSH_savedDmg4 = dmg4;
		SKSH_savedDmg5 = dmg5;
		SKSH_savedDmg6 = dmg6;
		SKSH_savedDmg7 = dmg7;
		SKSH_savedDmg8 = dmg8;
		SKSH_savedDmgDetached = dmgDetached;
		SKSH_savedWheel1Detached = dmgWheel1Detached;
		SKSH_savedWheel2Detached = dmgWheel2Detached;
		SKSH_savedWheel3Detached = dmgWheel3Detached;
		SKSH_savedWheel4Detached = dmgWheel4Detached;

		SKSH_savedDmgChanged = SKSH_upTime();

		showDmg = true;
	}

	return showDmg;
}

// Automobilista 2
var SKSH_savedDmgSusp1 = 0;
var SKSH_savedDmgSusp2 = 0;
var SKSH_savedDmgSusp3 = 0;
var SKSH_savedDmgSusp4 = 0;
var SKSH_savedDmgAero = 0;

function SKSH_AMS2_showDamage()
{
	var showDmg = false;

	if (SKSH_savedDmgChanged != 0) {
		if ((SKSH_upTime() - SKSH_savedDmgChanged) < showDamageWhenDamaged)
			showDmg = true;
		else
			SKSH_savedDmgChanged = 0;
	}

	const dmgSusp1 = $prop('GameRawData.mSuspensionDamage01');
	const dmgSusp2 = $prop('GameRawData.mSuspensionDamage02');
	const dmgSusp3 = $prop('GameRawData.mSuspensionDamage03');
	const dmgSusp4 = $prop('GameRawData.mSuspensionDamage04');
	const dmgAero = $prop('GameRawData.mAeroDamage');

	if (SKSH_savedDmgSusp1 != dmgSusp1 ||
		SKSH_savedDmgSusp2 != dmgSusp2 ||
		SKSH_savedDmgSusp3 != dmgSusp3 ||
		SKSH_savedDmgSusp4 != dmgSusp4 ||
		SKSH_savedDmgAero != dmgAero)
	{
		SKSH_savedDmgSusp1 = dmgSusp1;
		SKSH_savedDmgSusp2 = dmgSusp2;
		SKSH_savedDmgSusp3 = dmgSusp3;
		SKSH_savedDmgSusp4 = dmgSusp4;
		SKSH_savedDmgAero = dmgAero;

		SKSH_savedDmgChanged = SKSH_upTime();

		showDmg = true;
	}

	return showDmg;
}

// AssettoCorsa, AssettoCorsaCompetizione
function SKSH_AC_showDamage()
{
	var showDmg = false;

	if (SKSH_savedDmgChanged != 0) {
		if ((SKSH_upTime() - SKSH_savedDmgChanged) < showDamageWhenDamaged)
			showDmg = true;
		else
			SKSH_savedDmgChanged = 0;
	}

	const dmg1 = $prop('GameRawData.Physics.CarDamage01');
	const dmg2 = $prop('GameRawData.Physics.CarDamage02');
	const dmg3 = $prop('GameRawData.Physics.CarDamage03');
	const dmg4 = $prop('GameRawData.Physics.CarDamage04');

	if (SKSH_savedDmg1 != dmg1 ||
		SKSH_savedDmg2 != dmg2 ||
		SKSH_savedDmg3 != dmg3 ||
		SKSH_savedDmg4 != dmg4)
	{
		SKSH_savedDmg1 = dmg1;
		SKSH_savedDmg2 = dmg2;
		SKSH_savedDmg3 = dmg3;
		SKSH_savedDmg4 = dmg4;

		SKSH_savedDmgChanged = SKSH_upTime();

		showDmg = true;
	}

	return showDmg;
}

function SKSH_section5()
{
	if (showDamageWhenDamaged > 0) {
		switch ($prop('DataCorePlugin.CurrentGame')) {
			case 'RFactor2':
				if (SKSH_RF2_showDamage())
					return 2;
				break;
			case 'Automobilista2':
				if (SKSH_AMS2_showDamage())
					return 2;
				break;
			case 'AssettoCorsa':
			case 'AssettoCorsaCompetizione':
				if (SKSH_AC_showDamage())
					return 2;
				break;
		}
	}

	if (showBrakeTempsWhileBraking && $prop('Brake') > 0) {
		return 1;
	}

	return 0;
}

function SKSH_classSupportsDrs()
{
	const carClass = $prop('CarClass');
	for (var i = 0; i < classesWithDrs.length; i++) {
		if (carClass == classesWithDrs[i])
			return true;
	}
	return false;
}

function SKSH_useDRS()
{
	var useDRS = false;
	switch ($prop('DataCorePlugin.CurrentGame')) {
		case 'AssettoCorsa':
			useDRS = true;
			break;
		case 'RFactor2':
			useDRS = SKSH_classSupportsDrs();
			break;
		case 'Automobilista2':
			// no DRS in telemetry yet
			useDRS = false;
			break;
	}
	return useDRS;
}

function SKSH_showDRSAvail()
{
	return (SKSH_useDRS() && $prop('DRSAvailable'));
}

function SKSH_showDRSEnabled()
{
	return (SKSH_useDRS() && $prop('DRSEnabled'));
}

function SKSH_getTirePressPSI(tyrePressProp)
{
	var press = $prop(tyrePressProp);
	var unitPress = $prop('TyrePressureUnit');
	if (unitPress == 'Kpa')
		press *= 0.145038;
	else if (unitPress == 'Bar')
		press *= 14.5038;
	return press;
}

function SKSH_getTirePressBAR(tyrePressProp)
{
	var press = $prop(tyrePressProp);
	var unitPress = $prop('TyrePressureUnit');
	if (unitPress == 'Psi')
		press *= 0.0689476;
	else if (unitPress == 'Kpa')
		press *= 0.01;
	return press;
}

function SKSH_getTirePressKPA(tyrePressProp)
{
	var press = $prop(tyrePressProp);
	var unitPress = $prop('TyrePressureUnit');
	if (unitPress == 'Psi')
		press *= 6.89476;
	else if (unitPress == 'Bar')
		press *= 100;
	return press;
}

function SKSH_showLapInvalid()
{
	if (SKSH_outlap())
		return 1;

	switch ($prop('DataCorePlugin.CurrentGame')) {
		case 'Automobilista2':
			if ($prop('DataCorePlugin.GameRawData.mLapInvalidated'))
				return 1;
			return 0;
		case 'AssettoCorsaCompetizione':
			if ($prop('DataCorePlugin.GameRawData.Graphics.isValidLap'))
				return 0;
			return 1;
	}

	return 0;
}

function SKSH_getGap(driverProp)
{
	if ($prop(driverProp + '_Position') <= 0)
		return '-.-';
	var gap = $prop(driverProp + '_Gap');
	var mult = invertedGapStyle;
	if (mult == 0) {
		switch ($prop('DataCorePlugin.CurrentGame')) {
			case 'Automobilista2':
			case 'AssettoCorsa':
			case 'AssettoCorsaCompetizione':
				mult = -1;
				break;
			case 'RFactor2':
			default:
				mult = 1;
				break;
		}
	}
	return format(gap * mult, '0.0', 1);
}

// helpers, not used directly in SimHub

function SKSH_outlap()
{
	switch ($prop('DataCorePlugin.CurrentGame')) {
		case 'Automobilista2':
			if (!SKSH_getTime('CurrentLapTime', null))
				return true;
			return false;
		default:
			if ($prop('DataCorePlugin.Computed.Fuel_CurrentLapIsValidForTracking') == 0)
				return true;
			return false;
	}
}

function SKSH_deltaExist(lapProp)
{
	// If the current lap is outlap, the live deltas will be invalid
	if (SKSH_outlap()) {
		return false;
	}

	// If there is no valid time to compare to
	if (!SKSH_getTime(lapProp, null))
		return false;

	return true;
}

function SKSH_timeIntoLap()
{
	const lap = $prop('CurrentLapTime');
	const date = new Date('January 1, 1970 ' + lap + ' GMT');
	return date.getTime();
}

function SKSH_upTime()
{
	const lap = $prop('SystemInfoPlugin.Uptime');
	const date = new Date('January 1, 1970 ' + lap + ' GMT');
	return date.getTime();
}
