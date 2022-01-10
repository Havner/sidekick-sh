// Version 0.7

// Make sure not to break this file's syntax as this is JS code
// and it's required for the overlay to work properly

// Things that can be set in SimHub settings and its car config:
// - RPM shift points (yellow - rpm shift light2, and red - rpm red line)
// - total range of RPM bar (min/max values)
// - speed units
// - temperature units
// - pressure units
// - fuel units
// - fuel alarm threshold (additional to the ones set here)
// - shortcuts for switching section's pages

// plain is black transparent, as in original Sidekick
const usePlainBackground = false;

// in place of wear/temps/press, section 5
const showDamageWhenDamaged = 10000;   // for how long in miliseconds, 0 to disable
const showBrakeTempsWhileBraking = true;

// in miliseconds, shows last lap time and last lap diff to best after a lap
const showLastLapFor = 5000;

// list of cars classes that should have DRS enabled in rF2 (AC autodetects)
const classesWithDrs = ['Formula Pro', 'BMW M4 Class 1 2021'];

// marks gear and speed in blue (AMS2 telemetry is broken here)
const usePitLimiterColor = true;

// use the RPM green bar before they yellow (on simhub rpm shif light 1)
const useGreenBar = false;

// in miliseconds, set to 0 for immediate, -1 to disable, marks the FFB bar red
const FBBClippingTime = 500;

// opponent gap style
// 1 is default simhub and RF2 (in front minus, behind plus)
// -1 is AC/ACC/AMS2 style (in front plus, behind minus)
// 0 follows current game style (autodetect)
const invertedGapStyle = 0;

// used for calulcating red/green marks for deltas increasing or decreasing,
// increase this value if those marks are too sensitive, causes delay
const deltaHistory = 200;

// set the fuel indicator to red on any of those conditions, disabled if 0
// sidekick also reacts to the alert set in SimHub
const warnFuelOnValue = 0;      // number of liters / galons
const warnFuelOnPercent = 0;    // total fuel percent
const warnFuelOnLaps = 2;       // number of laps remaining

// values below [0] will be green, above [1] will be red, values in between
// will be a gradient from green, through white (at ([1] - [2])/2) to red
// to make it sharp green/white/red set to:
//const liveDeltaColorValues = [-0.001, 0.001];
const liveDeltaColorValues = [-0.5, 0.5];

// values below [0] will be green, above [1] will be red, values in between
// will be a gradient from green to red
const tyreWearColorValues = [50, 100];

// TODO: sensible values for below?

// values below [0] will be blue, [0]-[1] gradient from blue to green
// [1]-[2] green, [2]-[3] gradient from green to red, above [3] red
const brakeTempColorValuesC = [100, 200, 400, 800];
const brakeTempColorValuesF = [212, 392, 752, 1472];
const brakeTempColorValuesK = [373, 473, 673, 1073];

// values below [0] will be blue, [0]-[1] gradient from blue to green
// [1]-[2] green, [2]-[3] gradient from green to red, above [3] red
const tyreTempColorValuesC = [30, 70, 110, 140];
const tyreTempColorValuesF = [86, 158, 230, 284];
const tyreTempColorValuesK = [303, 343, 383, 413];

// set depending on the game, rF2: KPA, AC(C): PSI, AMS2: BAR
// car/tire dependent, defaults might not suit you

// values below [0] will be blue, [0]-[1] gradient from blue to green
// [1]-[2] green, [2]-[3] gradient from green to red, above [3] red
const tyrePressColorValuesPSI = [20, 25, 28, 30];       // AC, ACC
const tyrePressColorValuesBAR = [1.4, 1.7, 2.0, 2.2];   // AMS2
const tyrePressColorValuesKPA = [130, 150, 170, 190];   // rFactor2
