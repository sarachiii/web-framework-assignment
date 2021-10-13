package app.rest;

import app.models.Scooter;
import app.repositories.ScootersRepository;
import app.rest.exception.ScooterNotFoundException;
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
    if(scooter == null)
      throw new ScooterNotFoundException("id-" + id);

      return scooter;
  }

  //Save a scooter in the scooters list
  @PostMapping("/scooters")
  public ResponseEntity<Scooter> saveScooter(@RequestBody Scooter scooter) {

    Scooter savedScooter = scootersRepo.save(scooter);

    URI location = ServletUriComponentsBuilder
      .fromCurrentRequest()
      .path("/{id}")
      .buildAndExpand(savedScooter.getId()).toUri();

    return ResponseEntity.created(location).build();

//    Scooter previous = scootersRepo.findById(scooter.getId());
//    return null;
//
//    if(previous == null) {
//      throw new UserNotFoundException("id="+user.getId());
//    }
//
  }

}

