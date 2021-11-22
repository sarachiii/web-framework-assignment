package app.models;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

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

  /**
   * Associates the given scooter with this trip, if not yet associated also checks upon the current trip
   * @param scooter provide null to dissociate the currently associated scooter
   * @return whether a new association has been added
   */
  public boolean associateScooter(Scooter scooter){
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
}
