package app.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.temporal.ChronoUnit;
import java.util.Objects;
import java.util.Random;

@Entity
public class Trip implements Identifiable {

  @Id
  @GeneratedValue
  private long id;
  private LocalDateTime startDate;
  private LocalDateTime endDate;
  private LocalDateTime time;
  private String startPosition;
  private String endPosition;
  private double mileage;
  private double costOfTheTrip;
  private static int newId = 1000;

  @ManyToOne
  @JsonIgnore
  private Scooter scooter;

  public Trip() {
  }

  public Trip(long id, LocalDateTime startDate, LocalDateTime endDate, LocalDateTime time, String startPosition, String endPosition, double mileage, double costOfTheTrip) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.time = time;
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
    this.scooter = scooter;
    return true;
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

  public static Trip createRandomTrip() {
    LocalDateTime start = LocalDateTime.of(2020, Month.JANUARY, 1, 00, 00, 00);
    long startDays = ChronoUnit.DAYS.between(start, LocalDateTime.now());
    LocalDateTime randomStartDate = start.plusDays(new Random().nextInt((int) startDays + 1))
      .plusHours(new Random().nextInt(24))
      .plusMinutes(new Random().nextInt(60))
      .plusSeconds(new Random().nextInt(60));


    long endDays = ChronoUnit.DAYS.between(randomStartDate, LocalDateTime.now());
    LocalDateTime randomEndDate = start.plusDays(new Random().nextInt((int) endDays + 1))
      .plusHours(new Random().nextInt(24))
      .plusMinutes(new Random().nextInt(60))
      .plusSeconds(new Random().nextInt(60));

    String startgps = "gps(" + Scooter.createLatitude() + "," + Scooter.createLongitude() + ")";
    String endgps = "gps(" + Scooter.createLatitude() + "," + Scooter.createLongitude() + ")";
    double mileage = Math.floor(Math.random() * 10000);
    double cost = mileage / 10;
    Trip trip = new Trip(newId++, randomStartDate, randomEndDate, null, startgps, endgps, mileage, cost);
    return trip;
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

  public LocalDateTime getTime() {
    return time;
  }

  public void setTime(LocalDateTime time) {
    this.time = time;
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
