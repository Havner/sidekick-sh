// Version 0.6.1

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
var usePlainBackground = false;

// in place of wear/temps/press, section 5
var showBrakeTempsWhileBraking = true;

// in miliseconds, shows last lap time and last lap diff to best after a lap
var showLastLapFor = 5000;

// whether to show yellow (avail) and green (in use) DRS markers
// DRS is finicky in rF2, especially for cars that don't support it
var useDRS = false;

// marks gear and speed in blue
var usePitLimiterColor = true;

// in miliseconds, set to 0 for immediate, -1 to disable, marks the FFB bar red
var FBBClippingTime = 500;

// used for calulcating red/green marks for deltas increasing or decreasing,
// increase this value if those marks are too sensitive, causes delay
var deltaHistory = 200;

// set the fuel indicator to red on any of those conditions, disabled if 0
// sidekick also reacts to the alert set in SimHub
var warnFuelOnValue = 0;      // number of liters / galons
var warnFuelOnPercent = 0;    // total fuel percent
var warnFuelOnLaps = 2;       // number of laps remaining

// values below [0] will be green, above [1] will be red, values in between
// will be a gradient from green, through white (at ([1] - [2])/2) to red
// to make it sharp green/white/red set to:
//var liveDeltaColorValues = [-0.001, 0.001];
var liveDeltaColorValues = [-0.5, 0.5];

// values below [0] will be green, above [1] will be red, values in between
// will be a gradient from green to red
var tyreWearColorValues = [70, 100];

// TODO: sensible values for below?

// values below [0] will be blue, [0]-[1] gradient from blue to green
// [1]-[2] green, [2]-[3] gradient from green to red, above [3] red
var tyreBrakeColorValuesC = [400, 500, 600, 700];
var tyreBrakeColorValuesF = [752, 932, 1112, 1292];
var tyreBrakeColorValuesK = [673, 773, 873, 973];

// values below [0] will be blue, [0]-[1] gradient from blue to green
// [1]-[2] green, [2]-[3] gradient from green to red, above [3] red
var tyreTempColorValuesC = [60, 80, 100, 120];
var tyreTempColorValuesF = [140, 176, 212, 248];
var tyreTempColorValuesK = [333, 353, 373, 393];

// values below [0] will be blue, [0]-[1] gradient from blue to green
// [1]-[2] green, [2]-[3] gradient from green to red, above [3] red
var tyrePressColorValuesBAR = [1.4, 1.7, 2, 2.2];
var tyrePressColorValuesPSI = [20, 25, 28, 30];
var tyrePressColorValuesKPA = [140, 170, 200, 220];
