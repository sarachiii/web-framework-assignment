package app.rest;

import app.models.Scooter;
import app.models.Trip;
import app.repositories.ScootersRepository;
import app.repositories.TripsRepositoryJpa;
import app.rest.exception.PreConditionFailedException;
import app.rest.exception.ScooterNotFoundException;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class ScootersController {

  @Autowired
  ScootersRepository scootersRepo;

  @Autowired
  TripsRepositoryJpa tripsRepository;

  //3.5 C: Test 2 scooters:
//    @GetMapping("/scooters")
//    public List<Scooter> getTestScooters() {
//      return List.of(
//        new Scooter("Test-scooter-A"),
//        new Scooter("Test-scooter-B")
//      );
//    }

  //3.5 D: GET the scooters list with all scooters
  @GetMapping("/scooters")
  public List<Scooter> getAllScooters() {
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
  public ResponseEntity<Scooter> deleteScooterById(@PathVariable Long id) {
    Scooter scooter = scootersRepo.deleteById(id);

    if (scooter == null)
      throw new ScooterNotFoundException("id-" + id);

    return ResponseEntity.ok(scooter);
  }

  //GET summary of every scooter with id, tag, status and battery charge
  @JsonView(Scooter.Normal.class)
  @RequestMapping("/scooters/summary")
  @ResponseBody
  public List<Scooter> getScooterSummary() {
    return getAllScooters();
  }

  @PostMapping("/scooters/{id}/trips")
  public ResponseEntity<Trip> saveTrip(@RequestBody Trip trip, @PathVariable("id") long id) {

    Trip savedTrip;
    Scooter scooter = getScooterById(id);

    URI location = ServletUriComponentsBuilder
      .fromCurrentRequest()
      .path("/{id}")
      .buildAndExpand(scooter.getId()).toUri();

    if (scooter.getStatus() != Scooter.ScooterStatus.IDLE || scooter.getBatteryCharge() < 10) {
      throw new PreConditionFailedException("Scooter-Id=" + scooter.getId() + " with status " + scooter.getStatus() + " cannot be claimed for another trip");
    } else {
      savedTrip = tripsRepository.save(trip);
      return ResponseEntity.created(location).body(savedTrip);
    }
  }
}

