package app.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.tomcat.jni.Local;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.temporal.ChronoUnit;
import java.util.Objects;
import java.util.Random;

@Entity

@NamedQuery(name = "Trip_find_current_from_scooter",
  query = "SELECT t FROM Trip t where t.scooter.status = ?1")

public class Trip implements Identifiable {

  @Id
  @GeneratedValue
  private long id;
  private LocalDateTime startDate;
  private LocalDateTime endDate;
  //  private LocalDateTime time;
  private String startPosition;
  private String endPosition;
  private double mileage;
  private double costOfTheTrip;
  private static int newId = 1000;

  @ManyToOne
  private Scooter scooter;

  public Trip() {
  }

  public Trip(long id, LocalDateTime startDate, LocalDateTime endDate, String startPosition, String endPosition, double mileage, double costOfTheTrip) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startPosition = startPosition;
    this.endPosition = endPosition;
    this.mileage = mileage;
    this.costOfTheTrip = costOfTheTrip;
  }

  /**
   * Associates the given scooter with this trip, if not yet associated also checks upon the current trip
   *
   * @param scooter provide null to dissociate the currently associated scooter
   * @return whether a new association has been added
   */
  public boolean associateScooter(Scooter scooter) {
    if (this.scooter == null || scooter == null) {
      this.setScooter(scooter);
      return true;
    }
    return false;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Trip trip = (Trip) o;
    return id == trip.id;
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  public Scooter getScooter() {
    return scooter;
  }

  public void setScooter(Scooter scooter) {
    this.scooter = scooter;
  }

  public long getId() {
    return id;
  }

  public static LocalDateTime createRandomDate() {
    LocalDateTime start = LocalDateTime.of(2020, Month.JANUARY, 1, 00, 00, 00);
    long days = ChronoUnit.DAYS.between(start, LocalDateTime.now());

    return start.plusDays(new Random().nextInt((int) days + 1))
      .plusHours(new Random().nextInt(24))
      .plusMinutes(new Random().nextInt(60))
      .plusSeconds(new Random().nextInt(60));
  }

  public static Trip createRandomTrip() {
    LocalDateTime randomStartDate = createRandomDate();
    LocalDateTime randomEndDate = createRandomDate();

    while (randomStartDate.isAfter(randomEndDate)) {
      randomEndDate = createRandomDate();
    }

    String startgps = "gps(" + Scooter.createLatitude() + "," + Scooter.createLongitude() + ")";
    String endgps = "gps(" + Scooter.createLatitude() + "," + Scooter.createLongitude() + ")";
    double mileage = Math.floor(Math.random() * 10000);
    double cost = mileage / 10;

    return new Trip(newId++, randomStartDate, randomEndDate, startgps, endgps, mileage, cost);
  }

  public void setId(long id) {
    this.id = id;
  }

  public LocalDateTime getStartDate() {
    return startDate;
  }

  public void setStartDate(LocalDateTime startDate) {
    this.startDate = startDate;
  }

  public LocalDateTime getEndDate() {
    return endDate;
  }

  public void setEndDate(LocalDateTime endDate) {
    this.endDate = endDate;
  }

  public String getStartPosition() {
    return startPosition;
  }

  public void setStartPosition(String startPosition) {
    this.startPosition = startPosition;
  }

  public String getEndPosition() {
    return endPosition;
  }

  public void setEndPosition(String endPosition) {
    this.endPosition = endPosition;
  }

  public double getMileage() {
    return mileage;
  }

  public void setMileage(double mileage) {
    this.mileage = mileage;
  }

  public double getCostOfTheTrip() {
    return costOfTheTrip;
  }

  public void setCostOfTheTrip(double costOfTheTrip) {
    this.costOfTheTrip = costOfTheTrip;
  }

  public static int getNewId() {
    return newId;
  }

  public static void setNewId(int newId) {
    Trip.newId = newId;
  }
}
