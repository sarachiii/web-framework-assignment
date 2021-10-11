package app.models;

enum ScooterStatus {
  IDLE,
  INUSE,
  MAINTENANCE,
}

public class Scooter {

  public int id;
  public String tag;
  public ScooterStatus status;
  public String gpsLocation;
  public int batteryCharge;
  public double mileage;
  public String[] trips;
  public String currentTrip;

  public Scooter(int id, String tag, ScooterStatus status, String gpsLocation,
                 int batteryCharge, double mileage, String[] trips, String currentTrip) {
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
    this(0, tag, null, null, 0, 0.0, null, null);
  }

}
