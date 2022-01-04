Sidekick SimHub edition
Version: 0.6.1
Idea: Topuz
Author: Havner

0. Acknowledgments

This overlay is a direct re-implementation of Sidekick for Assetto
Corsa by Topuz. The whole idea, design, assets and original
implementation is by him. His plugin is available here:

https://www.racedepartment.com/downloads/sidekick.11007/

Go there and buy him a beer!

1. TL;DR

If you're familiar with both Sidekick and SimHub here is a quickie:

  1. Unpack the content of the ZIP to the SimHub directory
  2. Install the fonts
  3. Have a look at sidekick_config.js
  4. Assign A-D and PrevPage in SimHub, they change sections 1-5
  5. Add the dash to some overlay layout of yours
  6. Enjoy!

2. About

I recently started playing rFactor 2 and I felt that Sidekick from
Assetto Corsa is sorely missing here.

This overlay is as close re-implementation of Sidekick as I possibly
could do with SimHub and my skills. I tried to be as pixel accurate
and as feature complete as I could.

The final result looks, behaves and feels like the original Sidekick.

This overlay is implemented for rFactor 2. It will work in other sims
to some extent (maybe fully), but have not been tested.

3. Installation

This overlay is an overlay dash for Dash Studio inside a Simhub. It
consists of three parts. The dash itself, some JavaScript files and
fonts. To install it you need all three.

Copy the "JavascriptExtensions" and "DashTemplates" to the SimHub
installation directory, e.g.: "C:\Program Files (x86)\SimHub". Install
the fonts (right click and "Install" or "Install for all users").

When you launch the SimHub the "Sidekick SH" should appear in "Dash
Studio" section, "Overlays" tab in "Available Overlays". You need to
either create a new "Overlay Layout" and add it there or add it to
some layout of yours.

4. Usage

The overlay consists of the following sections:

  1. Times
  2. Deltas.
  3. Lap/Position
  4. Fuel
  5. Tyres/Brakes

  6. Gear/Speed
  7. RPM bar
  8. RPM shift bars (yellow and red)
  9. Pedals/FFB

Sections 1-5 have multiple pages switchable with assignable SimHub
keys. Contrary to Assetto Corsa version they are not clickable. Also
the shortcuts works differently. There is no key to switch the active
section. Each section have its separate button that changes its pages.

5. Gear, speed, RPM, pedals, FFB

Gear and speed on the left show exactly that. Speedo can be set to
km/h or mph in the SimHub. Sidekick will detect this and react
accordingly. The only additional thing is that they will turn blue if
Pit Limiter is enabled. This can be disabled in the config.

RPM bar's range can be set in SimHub. Minimum and maximum RPM. The
maximum value is guessed by the SimHub. Sometimes it works, sometimes
it doesn't. Can be set per car.

Shift light points are also configurable in the SimHub. Red light will
light up at "Red line" setting. Yellow at "Shift light 2 offset"
setting. "Shift light 1 offset" is not used in Sidekick SH.

Rule of a thumb to configure it:

  Default car settings for the current game:
    Minimum disaplyed RPM:   0
    Shift light 1 offset:    5
    Shift light 2 offset:    5
    Red line:               95

  Run a car and find its max RPM values (either empirically or see in
  the "Garage Screen/General/Rev limiter". Turn on autoshifting and
  notice the RPM the gear shift happens at. Alternatively notice the
  RPM the car's shift lights point to. Decide at what RPM value you
  want to have red warning. Usually 100-300 less than the shift point.

  Car settings overrides:
    Max RPM:              from the garage screen
    Red line:             value found empirically for gear shift warning
    Max fuel:             check in the garage screen
    Min displayed RPM:    can be "auto" (will use 0 from default settings)

Pedals and FFB on the right show the current pedals and FFB
values. Pedal bars have a small rectangle at the top that lights up
only if the pedal value is 100%. The FFB bar will turn red if the
force feedback is clipping for longer than 500ms. This delay can be
changed in the config.

6. Switchable sections

Sections 1-5 consist of multiple pages. Small indicators at the bottom
of each section show which page is currently selected.

This table shows the summary of switchable sections

|----------+--------------------+-----------+----------------+------------------+------------------|
|          | Section 1          | Section 2 | Section 3      | Section 4        | Section 5        |
|----------+--------------------+-----------+----------------+------------------+------------------|
| Page 1   | Current lap time   | sb delta  | Position       | Total fuel       | Tyre wear        |
| Page 2   | Last lap time      | pb delta  | Class position | Avg fuel per lap | Tyre temps       |
| Page 3   | Session best (sb)  | gap front | Laps           | Laps remaining   | Tyre pressures   |
| Page 4   | Personal best (pb) | gap back  | Session        |                  |                  |
|----------+--------------------+-----------+----------------+------------------+------------------|
| Shortcut | Action A           | Action B  | Action C       | Action D         | Prev dash screen |
|----------+--------------------+-----------+----------------+------------------+------------------|

  Section 1

Current lap time will be red if it started in the pits. This time will
not count towards session and personal best times.

Last lap time will be green if the last lap was session best. It will
be blue if the last lap was personal best.

Pages 2-4 will show -:--.-- if there is no time set yet.

The whole section will show last lap time for the 5s after finishing
the lap regardless of the currently selected page. This time will also
be green/blue in case the sb or pb has been set. The 5s timeout can be
configured in the config file.

  Section 2

Session and personal deltas. They will show -.-- if there nothing to
be shown (no time set or current lap won't count for sb or pb).

They will be green if < -0.5s and red if > 0.5s. Between -0.5 and 0.5
it will be a gradient from green through white to red. This can be
configured in the config.

They will also show small green and red marks if the value is
decreasing or increasing accordingly. rF2 seems to return delta with
very small precision so this value needs to be calculated from
significant number of previous values not to jump all over all the
time. If it jumps too much for you there is a config option to help
with that.

If the section is set to sb or pb delta pages this section will show
the gap to the last lap (against either sb or pb, depending on the
page set) for 5s after finishing the lap. The 5s timeout can be
configured in the config file.

Also front and back gap. Time gap to the car in front on the track or
to a car behind.

  Section 3

Current position and total number of cars.
Position in class and total number of cars of that class.
Laps complete (so it starts from 0, not 1) and total number of laps if
applicable.
Session time left.

  Section 4

Total fuel in liters or galons.
Avarage fuel used per lap. If 0 it means there is not enough data.
Total laps remaining with the current fuel. If 0 it means there is not
enough data.

Those numbers will turn red if fuel is low. This can be configured on
total value, on percent of full fuel and on laps remaining. See the
config file. It will also get triggered on the warning set in the
SimHub itself.

  Section 5

Tyre wear in percent. 100 is green, 70 and below is red. Gradient in
between. Configurable in the config.

Tyre temperatures can be shown in Celcius, Fahrenheit and
Kelvin. Switchable in SimHub settings. Color gradient configurable in
the config. Separate options per unit.

Tyre pressures can be shown in BAR, PSI and KPA. Switchable in the
SimHub settings. Color gradient configurable in the config. Separate
options per unit.

By default the whole section will show brake temperatures when
braking. Can be disabled in the config. Same remark with the units and
gradient as in tyre pressures.

7. Configuration

The overlay provides 2 JavaScript files. One contains helper
functions (sidekick.js). There is nothing to be changed there unless
you want to modify the internals. The other one is a config file.
sidekick_config.js. Open it in a good text editor (e.g. notepad++) and
see what can be changed there.

Config options are commented and have descriptive names. Should be
self explanatory. Most of them have been already mentioned in this
readme.

Some others worth mentioning:

usePlainBackground: same setting as in the original Sidekick

useDRS: false by default as rFactor 2 behaves finicky with DRS
values. If enabled it should behave the same as in Assetto Corsa. But
most of the time it shows DRS availbale, even if the car you drive
does not have DRS at all. Nothing I can do here. rFactor 2 issue.

Make sure not to break the config file syntax. It needs to be a
correct JavaScript file.

Some other things that can be set in SimHub itself:
  a. RPM minimum and maximum value
  b. RPM shift points
  c. speed units
  d. temperature units
  e. pressure units
  f. fuel units
  g. fuel warning trigger


If you feel like buying me a beer please donate:
https://www.paypal.me/Renvah
Thanks and Have fun!
