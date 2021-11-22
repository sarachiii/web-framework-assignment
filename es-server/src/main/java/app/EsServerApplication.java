package app;

import app.models.Scooter;
import app.models.Trip;
import app.repositories.ScootersRepositoryJpa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.transaction.Transactional;
import java.util.List;

@SpringBootApplication
public class EsServerApplication implements CommandLineRunner {

  @Autowired
  private ScootersRepositoryJpa scootersRepo;

  public static void main(String[] args) {
    SpringApplication.run(EsServerApplication.class, args);
  }

  @Transactional
  @Override
  public void run(String... args) throws Exception {
    System.out.println("Running CommandLine Startup");
    this.createInitialScooters();
  }

  private void createInitialScooters() {
    // check whether the repo is empty
    List<Scooter> scooters = this.scootersRepo.findAll();
    if (scooters != null && scooters.size() > 0) return;
    System.out.println("Configuring some initial scooter data");

    for (int i = 0; i < 7; i++) {
      Scooter scooter = Scooter.createRandomScooter();
//      Trip trip1 = Trip.createRandomTrip();
//      Trip trip2 = Trip.createRandomTrip();
//      Trip trip3 = Trip.createRandomTrip();
//      scooter.associateTrip(trip1);
//      scooter.associateTrip(trip2);
//      scooter.associateTrip(trip3);
      Scooter savedScooter = this.scootersRepo.save(scooter);
    }
  }
}
