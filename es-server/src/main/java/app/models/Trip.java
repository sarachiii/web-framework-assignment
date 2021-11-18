package app.models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

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

  /**
   * Associates the given scooter with this trip, if not yet associated
   * also checks upon the current trip
   * @param scooter provide null to dissociate the currently associated scooter
   * @return whether a new association has been added
   */
  public boolean associateScooter(Scooter scooter){
    //TODO
    return false;
  }

  /**
   * Associates the given trip with this scooter, if not yet associated
   * @param trip
   * @return whether a new association has been added
   */
  public boolean associateTrip(Trip trip){
    //TODO
    return false;
  }

  /**
   * Dissociates the given trip from this scooter, if associated
   * also checks upon the current trip
   * @param trip
   * @return whether an existing new association has been removed
   */
  public boolean dissociateTrip(Trip trip){
    //TODO
    return false;
  }

}
