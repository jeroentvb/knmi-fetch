[![Maintainability](https://api.codeclimate.com/v1/badges/b577bf1f979962766be6/maintainability)](https://codeclimate.com/github/jeroentvb/node-knmi-fetch/maintainability)

# node-knmi-fetch
Fetch data and parse it to JSON to use it in node.  
[Knmi docs](https://www.knmi.nl/kennis-en-datacentrum/achtergrond/data-ophalen-vanuit-een-script) about the API (Dutch).

## Table of contents
* [Installation](#installation)
* [Methods](#methods)

## Installation
```sh
npm install node-knmi-fetch
```

Usage
```js
const knmi = require('node-knmi-fetch')

// or

import knmi from 'node-knmi-fetch' 
```

## Methods
### knmi.days()
```js
knmi.days(stationCode:, variables, timeSpan, inSeason)
```
Gets and returns daily average data from a knmi station.  
Returns a Promise which resolves in an array of objects; one for each day.

**stationCode**  
*Number or string*  
The code of the station you want to get data from. Station codes can be found [here](http://projects.knmi.nl/klimatologie/metadata/index.html).

**variables**  
*String or array of strings or null*  
The variables you want to get from the station. [From the kmni docs (Dutch)](https://www.knmi.nl/kennis-en-datacentrum/achtergrond/data-ophalen-vanuit-een-script).  
Null will return all available variables.

<details>
<summary>All available variables</summary>

You can also specify a collection of variables using the following identifiers:
```
WIND = DDVEC:FG:FHX:FHX:FX wind
TEMP = TG:TN:TX:T10N temperature
SUNR = SQ:SP:Q Sunshine duration and global radiation
PRCP = DR:RH:EV24 precipitation and potential evaporation
PRES = PG:PGX:PGN pressure at sea level
VICL = VVN:VVX:NG visibility and clouds
MSTR = UG:UX:UN humidity
ALL  = All variables
Default is ALL.
```

You can also specify individual variables.

```
# YYYYMMDD = Date (YYYY=year MM=month DD=day); 
# DDVEC    = Vector mean wind direction in degrees (360=north, 90=east, 180=south, 270=west, 0=calm/variable); 
# FHVEC    = Vector mean windspeed (in 0.1 m/s); 
# FG       = Daily mean windspeed (in 0.1 m/s); 
# FHX      = Maximum hourly mean windspeed (in 0.1 m/s); 
# FHXH     = Hourly division in which FHX was measured; 
# FHN      = Minimum hourly mean windspeed (in 0.1 m/s); 
# FHNH     = Hourly division in which FHN was measured; 
# FXX      = Maximum wind gust (in 0.1 m/s); 
# FXXH     = Hourly division in which FXX was measured; 
# TG       = Daily mean temperature in (0.1 degrees Celsius); 
# TN       = Minimum temperature (in 0.1 degrees Celsius); 
# TNH      = Hourly division in which TN was measured; 
# TX       = Maximum temperature (in 0.1 degrees Celsius); 
# TXH      = Hourly division in which TX was measured; 
# T10N     = Minimum temperature at 10 cm above surface (in 0.1 degrees Celsius); 
# T10NH    = 6-hourly division in which T10N was measured; 6=0-6 UT, 12=6-12 UT, 18=12-18 UT, 24=18-24 UT
# SQ       = Sunshine duration (in 0.1 hour) calculated from global radiation (-1 for <0.05 hour); 
# SP       = Percentage of maximum potential sunshine duration; 
# Q        = Global radiation (in J/cm2); 
# DR       = Precipitation duration (in 0.1 hour); 
# RH       = Daily precipitation amount (in 0.1 mm) (-1 for <0.05 mm); 
# RHX      = Maximum hourly precipitation amount (in 0.1 mm) (-1 for <0.05 mm); 
# RHXH     = Hourly division in which RHX was measured; 
# EV24     = Potential evapotranspiration (Makkink) (in 0.1 mm); 
# PG       = Daily mean sea level pressure (in 0.1 hPa) calculated from 24 hourly values; 
# PX       = Maximum hourly sea level pressure (in 0.1 hPa); 
# PXH      = Hourly division in which PX was measured; 
# PN       = Minimum hourly sea level pressure (in 0.1 hPa); 
# PNH      = Hourly division in which PN was measured; 
# VVN      = Minimum visibility; 0: <100 m, 1:100-200 m, 2:200-300 m,..., 49:4900-5000 m, 50:5-6 km, 56:6-7 km, 57:7-8 km,..., 79:29-30 km, 80:30-35 km, 81:35-40 km,..., 89: >70 km)
# VVNH     = Hourly division in which VVN was measured; 
# VVX      = Maximum visibility; 0: <100 m, 1:100-200 m, 2:200-300 m,..., 49:4900-5000 m, 50:5-6 km, 56:6-7 km, 57:7-8 km,..., 79:29-30 km, 80:30-35 km, 81:35-40 km,..., 89: >70 km)
# VVXH     = Hourly division in which VVX was measured; 
# NG       = Mean daily cloud cover (in octants, 9=sky invisible); 
# UG       = Daily mean relative atmospheric humidity (in percents); 
# UX       = Maximum relative atmospheric humidity (in percents); 
# UXH      = Hourly division in which UX was measured; 
# UN       = Minimum relative atmospheric humidity (in percents); 
# UNH      = Hourly division in which UN was measured; 
```

</details>

**timeSpan**  
*object*  
Object with the keys `start` and `end` which contain strings in the following format: `YYYYMMDD`.  
Start will default to the first day of the current month.  
End will default to the current day, or the last day for which there is data.  
  
Example:
```js
{
  start: '20190128',
  end: '20191117'
}
```
  
**inSeason**  
*boolean*  
If true, `timeSpan` cannot be undefined. Data will be returned only for the days between start and end date for the given years.  
  
Example:  
Consider the following `timeSpan`:
```js
{
  start: '20100401',
  end: '20190401'
}
```
If `inSeason` is true, this will return data for every first of april between 2010 and 2019.
