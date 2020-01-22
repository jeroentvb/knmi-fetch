[![npm version](https://badge.fury.io/js/node-knmi-fetch.svg)](https://badge.fury.io/js/node-knmi-fetch)
[![Maintainability](https://api.codeclimate.com/v1/badges/b577bf1f979962766be6/maintainability)](https://codeclimate.com/github/jeroentvb/node-knmi-fetch/maintainability)

# node-knmi-fetch
Fetch data and parse it to JSON to use it in node.  
[Knmi docs](https://www.knmi.nl/kennis-en-datacentrum/achtergrond/data-ophalen-vanuit-een-script) about the API (Dutch).

Issues? Suggestions? Create an [issue](https://github.com/jeroentvb/node-knmi-fetch/issues/new).

## Table of contents
* [Installation](#installation)
* [Methods](#methods)
  * [knmi.days](#knmi.days)
  * [knmi.hours](#knmi.hours)

## Installation
```sh
npm install node-knmi-fetch
```

Usage
```js
const knmi = require('node-knmi-fetch')

// TypeScript

import * as knmi from 'node-knmi-fetch' 
```

## Methods
### knmi.days
```js
knmi.days(stationCode, variables, timeSpan, inSeason)
```
Gets and returns daily average data from a knmi station.  
Returns a Promise which resolves in an array of objects; one for each day.

**stationCode**  
*Number or string or an array of numbers or strings*  
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

**Data format**  
Data will be returned in the following format:  

<details>

<summary>Data format</summary>

```json
[
    {
        "station": {
            "name": "DE BILT",
            "code": 260,
            "coordinates": {
                "lat": 52.1,
                "lng": 5.18
            },
            "altitude": 1.9
        },
        "data": [
            {
                "STN": "260",
                "YYYYMMDD": "20190114",
                "HH": "1",
                "DD": "310",
                "FH": "60",
                "FF": "70",
                "FX": "130"
            },
            {
                "STN": "260",
                "YYYYMMDD": "20190115",
                "HH": "1",
                "DD": "240",
                "FH": "30",
                "FF": "30",
                "FX": "50"
            },
            {
                "STN": "260",
                "YYYYMMDD": "20190116",
                "HH": "1",
                "DD": "230",
                "FH": "60",
                "FF": "60",
                "FX": "110"
            }
        ]
    }
]
```
</details>

### knmi.hours
```js
knmi.hours(stationCode, variables, timeSpan, inSeason)
```
Gets and returns daily average data from a knmi station.  
Returns a Promise which resolves in an array of objects; one for each hour.  

Works the same as the `knmi.days()` method, with 2 small differences.

**variables**  
A different set of variables is available in this method.

<details>
<summary>All available variables</summary>

You can also specify a collection of variables using the following identifiers:
```
WIND = DD:FH:FF:FX     Wind
TEMP = T:T10N:TD       Temperatuur
SUNR = SQ:Q            Zonneschijnduur en globale straling
PRCP = DR:RH           Neerslag en potentiële verdamping
VICL = VV:N:U          Zicht, bewolking en relatieve vochtigheid
WEER = M:R:S:O:Y:WW    Weerverschijnselen, weertypen
ALL alle variabelen
```

You can also specify individual variables.

```
# YYYYMMDD = datum (YYYY=jaar,MM=maand,DD=dag); 
# HH       = tijd (HH=uur, UT.12 UT=13 MET, 14 MEZT. Uurvak 05 loopt van 04.00 UT tot 5.00 UT; 
# DD       = Windrichting (in graden) gemiddeld over de laatste 10 minuten van het afgelopen uur (360=noord, 90=oost, 180=zuid, 270=west, 0=windstil 990=veranderlijk. Zie http://www.knmi.nl/kennis-en-datacentrum/achtergrond/klimatologische-brochures-en-boeken; 
# FH       = Uurgemiddelde windsnelheid (in 0.1 m/s). Zie http://www.knmi.nl/kennis-en-datacentrum/achtergrond/klimatologische-brochures-en-boeken; 
# FF       = Windsnelheid (in 0.1 m/s) gemiddeld over de laatste 10 minuten van het afgelopen uur; 
# FX       = Hoogste windstoot (in 0.1 m/s) over het afgelopen uurvak; 
# T        = Temperatuur (in 0.1 graden Celsius) op 1.50 m hoogte tijdens de waarneming; 
# T10N     = Minimumtemperatuur (in 0.1 graden Celsius) op 10 cm hoogte in de afgelopen 6 uur; 
# TD       = Dauwpuntstemperatuur (in 0.1 graden Celsius) op 1.50 m hoogte tijdens de waarneming; 
# SQ       = Duur van de zonneschijn (in 0.1 uren) per uurvak, berekend uit globale straling  (-1 for <0.05 uur); 
# Q        = Globale straling (in J/cm2) per uurvak; 
# DR       = Duur van de neerslag (in 0.1 uur) per uurvak; 
# RH       = Uursom van de neerslag (in 0.1 mm) (-1 voor <0.05 mm); 
# P        = Luchtdruk (in 0.1 hPa) herleid naar zeeniveau, tijdens de waarneming; 
# VV       = Horizontaal zicht tijdens de waarneming (0=minder dan 100m, 1=100-200m, 2=200-300m,..., 49=4900-5000m, 50=5-6km, 56=6-7km, 57=7-8km, ..., 79=29-30km, 80=30-35km, 81=35-40km,..., 89=meer dan 70km); 
# N        = Bewolking (bedekkingsgraad van de bovenlucht in achtsten), tijdens de waarneming 9=bovenlucht onzichtbaar); 
# U        = Relatieve vochtigheid (in procenten) op 1.50 m hoogte tijdens de waarneming; 
# WW       = Weercode (00-99), visueel(WW) of automatisch(WaWa) waargenomen, voor het actuele weer of het weer in het afgelopen uur. Zie http://bibliotheek.knmi.nl/scholierenpdf/weercodes_Nederland; 
# IX       = Weercode indicator voor de wijze van waarnemen op een bemand of automatisch station (1=bemand gebruikmakend van code uit visuele waarnemingen, 2,3=bemand en weggelaten (geen belangrijk weersverschijnsel, geen gegevens), 4=automatisch en opgenomen (gebruikmakend van code uit visuele waarnemingen), 5,6=automatisch en weggelaten (geen belangrijk weersverschijnsel, geen gegevens), 7=automatisch gebruikmakend van code uit automatische waarnemingen); 
# M        = Mist 0=niet voorgekomen, 1=wel voorgekomen in het voorgaande uur en/of tijdens de waarneming; 
# R        = Regen 0=niet voorgekomen, 1=wel voorgekomen in het voorgaande uur en/of tijdens de waarneming; 
# S        = Sneeuw 0=niet voorgekomen, 1=wel voorgekomen in het voorgaande uur en/of tijdens de waarneming; 
# O        = Onweer 0=niet voorgekomen, 1=wel voorgekomen in het voorgaande uur en/of tijdens de waarneming; 
# Y        = IJsvorming 0=niet voorgekomen, 1=wel voorgekomen in het voorgaande uur en/of tijdens de waarneming;
```

</details>

**timeSpan**  
`timeSpan` expects a hour instead of a day. So instead of:
```js
{
  start: '20100401',
  end: '20190401'
}
```
You need to pass in:
```js
{
  start: '2010040101',
  end: '2019040112'
}
```

**Data format**  
Data will be returned in the following format:  

<details>

<summary>Data format</summary>

```json
[
    {
        "station": {
            "name": "DE BILT",
            "code": 260,
            "coordinates": {
                "lat": 52.1,
                "lng": 5.18
            },
            "altitude": 1.9
        },
        "data": [
            {
                "STN": "260",
                "YYYYMMDD": "20190114",
                "HH": "1",
                "DD": "310",
                "FH": "60",
                "FF": "70",
                "FX": "130"
            },
            {
                "STN": "260",
                "YYYYMMDD": "20190115",
                "HH": "1",
                "DD": "240",
                "FH": "30",
                "FF": "30",
                "FX": "50"
            },
            {
                "STN": "260",
                "YYYYMMDD": "20190116",
                "HH": "1",
                "DD": "230",
                "FH": "60",
                "FF": "60",
                "FX": "110"
            }
        ]
    }
]
```
</details>