export default {
   STATION_CODE: 249,
   VARIABLES: 'WIND',
   TIME_SPAN: {
      start: '20190114',
      end: '20190116'
   },
   INSEASON: true,
   PARSED_API_RESPONSE: [
      {
         station: {
            name: 'BERKHOUT',
            code: 249,
            coordinates: {
               lat: 52.644,
               lng: 4.979
            },
            altitude: -2.4
         },
         data: [
            {
               STN: '249',
               YYYYMMDD: '20180101',
               DDVEC: '229',
               FHVEC: '63',
               FG: '67',
               FHX: '120',
               FHXH: '2',
               FHN: '20',
               FHNH: '17',
               FXX: '200',
               FXXH: '3'
            }
         ]
      }
   ],
   API_RESPONSE: `# BRON: KONINKLIJK NEDERLANDS METEOROLOGISCH INSTITUUT (KNMI)
  # Opmerking: door stationsverplaatsingen en veranderingen in waarneemmethodieken zijn deze tijdreeksen van dagwaarden mogelijk inhomogeen! Dat betekent dat deze reeks van gemeten waarden niet geschikt is voor trendanalyse. Voor studies naar klimaatverandering verwijzen we naar de gehomogeniseerde reeks maandtemperaturen van De Bilt <http://www.knmi.nl/kennis-en-datacentrum/achtergrond/gehomogeniseerde-reeks-maandtemperaturen-de-bilt> of de Centraal Nederland Temperatuur <http://www.knmi.nl/kennis-en-datacentrum/achtergrond/centraal-nederland-temperatuur-cnt>.
  # 
  # 
  # STN      LON(east)   LAT(north)     ALT(m)  NAME
  # 249:         4.979       52.644      -2.40  BERKHOUT
  # 
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
  # 
  # STN,YYYYMMDD,DDVEC,FHVEC,   FG,  FHX, FHXH,  FHN, FHNH,  FXX, FXXH
  # 
    249,20180101,  229,   63,   67,  120,    2,   20,   17,  200,    3`,
   RAW_STATION_INFO: '# 249:         4.979       52.644      -2.40  BERKHOUT',
   API_RESPONSE_HOURS: `# BRON: KONINKLIJK NEDERLANDS METEOROLOGISCH INSTITUUT (KNMI)
  # Opmerking: door stationsverplaatsingen en veranderingen in waarneemmethodieken zijn deze tijdreeksen van uurwaarden mogelijk inhomogeen! Dat betekent dat deze reeks van gemeten waarden niet geschikt is voor trendanalyse. Voor studies naar klimaatverandering verwijzen we naar de gehomogeniseerde reeks maandtemperaturen van De Bilt <http://www.knmi.nl/klimatologie/onderzoeksgegevens/homogeen_260/index.html> of de Centraal Nederland Temperatuur <http://www.knmi.nl/klimatologie/onderzoeksgegevens/CNT/>.
  # 
  # 
  # STN      LON(east)   LAT(north)     ALT(m)  NAME
  # 249:         4.979       52.644      -2.40  BERKHOUT
  # 260:         5.180       52.100       1.90  DE BILT
  # 
  # YYYYMMDD = datum (YYYY=jaar,MM=maand,DD=dag); 
  # HH       = tijd (HH=uur, UT.12 UT=13 MET, 14 MEZT. Uurvak 05 loopt van 04.00 UT tot 5.00 UT; 
  # DD       = Windrichting (in graden) gemiddeld over de laatste 10 minuten van het afgelopen uur (360=noord, 90=oost, 180=zuid, 270=west, 0=windstil 990=veranderlijk. Zie http://www.knmi.nl/kennis-en-datacentrum/achtergrond/klimatologische-brochures-en-boeken; 
  # FH       = Uurgemiddelde windsnelheid (in 0.1 m/s). Zie http://www.knmi.nl/kennis-en-datacentrum/achtergrond/klimatologische-brochures-en-boeken; 
  # FF       = Windsnelheid (in 0.1 m/s) gemiddeld over de laatste 10 minuten van het afgelopen uur; 
  # FX       = Hoogste windstoot (in 0.1 m/s) over het afgelopen uurvak; 
  # 
  # STN,YYYYMMDD,   HH,   DD,   FH,   FF,   FX
  # 
    249,20190114,    1,  300,   80,   70,  150
    249,20190115,    1,  230,   30,   40,   50
    249,20190116,    1,  240,   80,   80,  130
    260,20190114,    1,  310,   60,   70,  130
    260,20190115,    1,  240,   30,   30,   50
    260,20190116,    1,  230,   60,   60,  110
  `,
   PARSED_API_RESPONSE_HOURS: [
      {
         'station': {
            'name': 'BERKHOUT',
            'code': 249,
            'coordinates': {
               'lat': 52.644,
               'lng': 4.979
            },
            'altitude': -2.4
         },
         'data': [
            {
               'STN': '249',
               'YYYYMMDD': '20190114',
               'HH': '1',
               'DD': '300',
               'FH': '80',
               'FF': '70',
               'FX': '150'
            },
            {
               'STN': '249',
               'YYYYMMDD': '20190115',
               'HH': '1',
               'DD': '230',
               'FH': '30',
               'FF': '40',
               'FX': '50'
            },
            {
               'STN': '249',
               'YYYYMMDD': '20190116',
               'HH': '1',
               'DD': '240',
               'FH': '80',
               'FF': '80',
               'FX': '130'
            }
         ]
      },
      {
         'station': {
            'name': 'DE BILT',
            'code': 260,
            'coordinates': {
               'lat': 52.1,
               'lng': 5.18
            },
            'altitude': 1.9
         },
         'data': [
            {
               'STN': '260',
               'YYYYMMDD': '20190114',
               'HH': '1',
               'DD': '310',
               'FH': '60',
               'FF': '70',
               'FX': '130'
            },
            {
               'STN': '260',
               'YYYYMMDD': '20190115',
               'HH': '1',
               'DD': '240',
               'FH': '30',
               'FF': '30',
               'FX': '50'
            },
            {
               'STN': '260',
               'YYYYMMDD': '20190116',
               'HH': '1',
               'DD': '230',
               'FH': '60',
               'FF': '60',
               'FX': '110'
            }
         ]
      }
   ]
};
