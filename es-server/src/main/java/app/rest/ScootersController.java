package app.rest;

import app.models.Scooter;
import app.repositories.ScootersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ScootersController {

  @Autowired
  ScootersRepository scootersRepo;

  @GetMapping("/scooters")
  public List<Scooter> getAllScooters() {
    return scootersRepo.findAll();
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

