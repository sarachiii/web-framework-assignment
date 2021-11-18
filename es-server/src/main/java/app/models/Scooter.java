package app.models;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.Entity;
import org.springframework.data.annotation.Id;

import javax.persistence.EnumType;
import javax.persistence.*;
import java.util.Arrays;
import java.util.Random;

enum ScooterStatus {
  IDLE,
  INUSE,
  MAINTENANCE,
}

@Entity
public class Scooter {

  @Id
  @GeneratedValue
//  @JsonView(Scooter.Normal.class)
  private long id;
  //  @JsonView(Scooter.Normal.class)
  private String tag;
  //  @JsonView(Scooter.Normal.class)
  @Enumerated(EnumType.STRING)
  private ScooterStatus status;
  //  @JsonView(Scooter.Normal.class)
  private int batteryCharge;
  private String gpsLocation;
  private double mileage;
  private String trips; //int[]
  private String currentTrip;

  private static final double CENTRAL_LATITUDE = 52.379189;
  private static final double CENTRAL_LONGITUDE = 4.899431;
  private static final double RADIUS = 0.035234;
  private static double newLatitude;
  private static double newLongitude;

  protected Scooter() {

  }

  public Scooter(long id, String tag, ScooterStatus status, String gpsLocation,
                 int batteryCharge, double mileage, String trips, String currentTrip) {
    this.id = id;
    this.tag = tag;
    this.status = status;
    this.gpsLocation = gpsLocation;
    this.batteryCharge = batteryCharge;
    this.mileage = mileage;
    this.trips = trips;
    this.currentTrip = currentTrip;
  }

  public Scooter(String tag, ScooterStatus status, String gpsLocation,
                 int batteryCharge, double mileage, String trips, String currentTrip) {
    this.tag = tag;
    this.status = status;
    this.gpsLocation = gpsLocation;
    this.batteryCharge = batteryCharge;
    this.mileage = mileage;
    this.trips = trips;
    this.currentTrip = currentTrip;
  }

  public Scooter(String tag) {
    this(0, tag, null, null, 0, 0.0, "[]", null);
  }

  public static String createLatitude() {
    double randomNumber = Math.random() * (1 - (-1)) + (-1);
    newLatitude = (randomNumber * RADIUS) + CENTRAL_LATITUDE;
    String test = String.valueOf(Math.round(newLatitude * 100000));
    return test.substring(0, 2) + "," + test.substring(2, 7) + "N";
  }

  public static String createLongitude() {
    double randomNumber = Math.random() * (1 - (-1)) + (-1);
    newLongitude = (randomNumber * RADIUS) + CENTRAL_LONGITUDE;
    String test = String.valueOf(Math.round(newLongitude * 100000));
    return test.substring(0, 1) + "," + test.substring(1, 6) + "E";
  }

  public static Scooter createSampleScooter(long id) {
    final String ALPHABETANDNUMBER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    StringBuilder sb = new StringBuilder();
    int lengthTag = 8;
    for (int i = 0; i < lengthTag; i++) {
      int index = new Random().nextInt(ALPHABETANDNUMBER.length());
      char randomChar = ALPHABETANDNUMBER.charAt(index);
      sb.append(randomChar);
    }
    String tag = sb.toString();
    ScooterStatus status = ScooterStatus.values()[new Random().nextInt(ScooterStatus.values().length)];

    String gpsLocation = createLatitude() + " " + createLongitude();
    int batteryCharge = (int) Math.floor(Math.random() * (100 - 5 + 1) + 5);
    double mileage = Math.floor(Math.random() * 10000);

    return new Scooter(id, tag, status, gpsLocation, batteryCharge, mileage, "[]", null);
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getTag() {
    return tag;
  }

  public ScooterStatus getStatus() {
    return status;
  }

  public String getGpsLocation() {
    return gpsLocation;
  }

  public int getBatteryCharge() {
    return batteryCharge;
  }

  public double getMileage() {
    return mileage;
  }

  public String getTrips() {
    return trips;
  }

  public String getCurrentTrip() {
    return currentTrip;
  }

  public static double getNewLatitude() {
    return newLatitude;
  }

  public static double getNewLongitude() {
    return newLongitude;
  }

  public void setTag(String tag) {
    this.tag = tag;
  }

  public void setStatus(ScooterStatus status) {
    this.status = status;
  }

  public void setGpsLocation(String gpsLocation) {
    this.gpsLocation = gpsLocation;
  }

  public void setBatteryCharge(int batteryCharge) {
    this.batteryCharge = batteryCharge;
  }

  public void setMileage(double mileage) {
    this.mileage = mileage;
  }

  public void setTrips(String trips) {
    this.trips = trips;
  }

  public void setCurrentTrip(String currentTrip) {
    this.currentTrip = currentTrip;
  }

  public static void setNewLatitude(double newLatitude) {
    Scooter.newLatitude = newLatitude;
  }

  public static void setNewLongitude(double newLongitude) {
    Scooter.newLongitude = newLongitude;
  }

  @Override
  public String toString() {
    return "Scooter{" +
      "id=" + id +
      ", tag='" + tag + '\'' +
      ", status=" + status +
      ", gpsLocation='" + gpsLocation + '\'' +
      ", batteryCharge=" + batteryCharge +
      ", mileage=" + mileage +
      ", trips=" + trips +
//      ", trips=" + Arrays.toString(trips) +
      ", currentTrip='" + currentTrip + '\'' +
      '}';
  }

  public static class Normal {
  }

  ;

}
