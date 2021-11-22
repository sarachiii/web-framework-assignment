package app.models;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Random;

@Entity
public class Trip {

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
   * Associates the given scooter with this trip,
   * if not yet associated also checks upon the current trip
   * @param scooter provide null to dissociate the currently associated scooter
   * @return whether a new association has been added
   */
  public boolean associateScooter(Scooter scooter){
    return false;
  }

  public static Trip createRandomTrip() {
    //TODO make a random trip
    return null;
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
}
