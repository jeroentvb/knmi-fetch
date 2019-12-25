module.exports = {
  STATION_CODE: 249,
  VARIABLES: 'WIND',
  TIME_SPAN: {
    start: '20190114',
    end: '20190116'
  },
  INSEASON: true,
  PARSED_API_RESPONSE: [
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
    }],
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
    249,20180101,  229,   63,   67,  120,    2,   20,   17,  200,    3`
}
