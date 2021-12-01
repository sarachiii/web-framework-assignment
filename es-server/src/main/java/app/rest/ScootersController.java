package app.rest;

import app.models.Scooter;
import app.models.Trip;
import app.repositories.EntityRepository;
import app.rest.exception.BadRequestException;
import app.rest.exception.PreConditionFailedException;
import app.rest.exception.ScooterNotFoundException;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class ScootersController {

  @Autowired
  private EntityRepository<Scooter> scootersRepo;

  @Autowired
  private EntityRepository<Trip> tripsRepository;

  //3.5 C: Test 2 scooters:
//    @GetMapping("/scooters")
//    public List<Scooter> getTestScooters() {
//      return List.of(
//        new Scooter("Test-scooter-A"),
//        new Scooter("Test-scooter-B")
//      );
//    }

  //3.5 D: GET the scooters list with all scooters
  @GetMapping({"/scooters", "/scooters/battery={battery}", "scooters/status={status}"})
  @ResponseBody
  public List<Scooter> getAllScooters(@RequestParam(required = false, name="battery") long battery,
                                      @RequestParam(required = false, name = "status") String status){
    if(battery > 0){
      return scootersRepo.findByQuery("Scooter_find_by_battery", battery);
    } else if (!status.isEmpty()) {
      if (!status.equals(Scooter.ScooterStatus.INUSE.toString()) || !status.equals(Scooter.ScooterStatus.MAINTENANCE.toString()) || !status.equals(Scooter.ScooterStatus.IDLE.toString())) {
       throw new BadRequestException("status=" + status + " is not a valid scooter status value");
      }
      return scootersRepo.findByQuery("Scooter_find_by_status", status);
    }
    return scootersRepo.findAll();
  }

  //3.6 CRUD methods
  //GET one scooter by id
  @GetMapping("/scooters/{id}")
  @ResponseBody
  public Scooter getScooterById(@PathVariable Long id) {
    Scooter scooter = scootersRepo.findById(id);

    if (scooter == null)
      throw new ScooterNotFoundException("id-" + id);

    return scooter;
  }

  //Save a new scooter in the scooters list
  @PostMapping("/scooters")
  public ResponseEntity<Scooter> saveScooter(@RequestBody Scooter scooter) {

    Scooter savedScooter = scootersRepo.save(scooter);

    URI location = ServletUriComponentsBuilder
      .fromCurrentRequest()
      .path("/{id}")
      .buildAndExpand(savedScooter.getId()).toUri();

    return ResponseEntity.created(location).body(savedScooter);
  }

  //Update a scooter in the scooters list
  @PutMapping("/scooters/{id}")
  public ResponseEntity<Scooter> updateScooter(@RequestBody Scooter scooter, @PathVariable Long id) {

    Scooter previousScooter = scootersRepo.findById(scooter.getId());

    if (scooter.getId() != id)
      throw new PreConditionFailedException("Scooter-Id=" + scooter.getId() + " does not match path parameter=" + id);

    if (previousScooter == null)
      throw new ScooterNotFoundException("id=" + scooter.getId());

    scootersRepo.save(scooter);

    return ResponseEntity.ok().build();
  }

  //Delete a scooter by id from the scooters list
  @DeleteMapping("/scooters/{id}")
  @ResponseBody
  public ResponseEntity<String> deleteScooterById(@PathVariable Long id) {
    if (!scootersRepo.deleteById(id))
      throw new ScooterNotFoundException("id-" + id);

    return ResponseEntity.ok().body("Scooter with id " + id + " was deleted.");
  }

  //GET summary of every scooter with id, tag, status and battery charge
  @JsonView(Scooter.Normal.class)
  @RequestMapping("/scooters/summary")
  @ResponseBody
  public List<Scooter> getScooterSummary() {
    return scootersRepo.findAll();
  }

  @PostMapping("/scooters/{id}/trips")
  public ResponseEntity<Trip> saveTrip(@RequestBody Trip trip, @PathVariable("id") long id) {

    Trip savedTrip = trip;
    Scooter scooter = getScooterById(id);

    URI location = ServletUriComponentsBuilder
      .fromCurrentRequest()
      .path("/{id}")
      .buildAndExpand(id).toUri();
//      .buildAndExpand(scooter.getId()).toUri();

    if (scooter.getStatus() != Scooter.ScooterStatus.IDLE) {
      throw new PreConditionFailedException("Scooter-Id=" + scooter.getId() + " with status " + scooter.getStatus() + " cannot be claimed for another trip");
    } else if (scooter.getBatteryCharge() < 10) {
      throw new PreConditionFailedException("Scooter-Id=" + scooter.getId() + " with battery charge " + scooter.getBatteryCharge() + " cannot be claimed for another trip");
    } else {
      savedTrip.setStartPosition(scooter.getGpsLocation());
      savedTrip = tripsRepository.save(trip);
      scooter.setStatus(Scooter.ScooterStatus.INUSE);
      scooter.associateTrip(trip);
      scootersRepo.save(scooter);
      return ResponseEntity.created(location).body(savedTrip);
    }
  }
}

