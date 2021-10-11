package app.models;

enum ScooterStatus {
  IDLE,
  INUSE,
  MAINTENANCE,
}

public class Scooter {

  public long id;
  public String tag;
  public ScooterStatus status;
  public String gpsLocation;
  public int batteryCharge;
  public double mileage;
  public int[] trips;

  public static String currentTrip;
  public static final double CENTRAL_LATITUDE = 52.379189;
  public static final double CENTRAL_LONGITUDE = 4.899431;
  public static final double RADIUS = 0.035234;
  public static double newLatitude;
  public static double newLongitude;

  public Scooter(long id, String tag, ScooterStatus status, String gpsLocation,
                 int batteryCharge, double mileage, int[] trips, String currentTrip) {
    this.id = id;
    this.tag = tag;
    this.status = status;
    this.gpsLocation = gpsLocation;
    this.batteryCharge = batteryCharge;
    this.mileage = mileage;
    this.trips = trips;
    this.currentTrip = currentTrip;
  }

  public Scooter(String tag){
    this(0, tag, null, null, 0, 0.0, new int[0], null);
  }

  public static String createLatitude() {
    double randomNumber = Math.random() * (1 - (-1)) + (-1);
    newLatitude = (randomNumber * RADIUS) + CENTRAL_LATITUDE;
    return Math.round(newLatitude * 100)/100 + "N" ;
  }

  public static String createLongitude() {
    double randomNumber = Math.random() * (1 - (-1)) + (-1);
    newLongitude = (randomNumber * RADIUS) + CENTRAL_LONGITUDE;
    return Math.round(newLongitude * 100)/100 + "E" ;
  }

  public static Scooter createSampleScooter(long id) {

//    String tag = Math.random().toString(36).substring(2, 10);
//    String enumValues = Object.values(ScooterStatus);
//    double number = Math.floor(Math.random() * enumValues.length);
    String tag = "adjkfkdhfk57";
    ScooterStatus status = ScooterStatus.IDLE;
    String gpsLocation = createLatitude() + ", " + createLongitude();
    double mileage = Math.floor(Math.random() * 10000);
    int batteryCharge = (int) Math.floor(Math.random() * (100 - 5 + 1) + 5);

    return new Scooter(id, tag, status, gpsLocation, batteryCharge, mileage, new int[0], null);
  }
}
