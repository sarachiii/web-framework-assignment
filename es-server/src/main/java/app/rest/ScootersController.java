package app.rest;

import app.models.Scooter;
import app.repositories.ScootersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ScootersController {

  @Autowired
  ScootersRepository scootersRepo;

  @GetMapping("/scooters")
  public List<Scooter> getAllScooters() {
    return scootersRepo.findAll();
  }

  @GetMapping("/scooters/{id}")
  @ResponseBody
  public Scooter getScooterById(@PathVariable Long id) {
    return scootersRepo.findById(id);
  }

  @PostMapping("/scooters")
  public ResponseEntity<Scooter> saveScooter(@RequestBody Scooter scooter) {

    Scooter previous = scootersRepo.findById(scooter.getId());

//    if(previous == null) {
//      throw new UserNotFoundException("id="+user.getId());
//    }
//
//    scootersRepo.save(scooter);
//
//    return ResponseEntity.ok().build();
  }



  //3.5 C: Test 2 scooters

  //  @GetMapping("/scooters")
  //  public List<Scooter> getTestScooters() {
  //    return List.of(
  //      new Scooter("Test-scooter-A"),
  //      new Scooter("Test-scooter-B")
  //    );
  //  }
}

