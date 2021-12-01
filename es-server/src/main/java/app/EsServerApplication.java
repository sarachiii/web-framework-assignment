package app;

import app.models.Scooter;
import app.models.Trip;
import app.repositories.ScootersRepositoryJpa;
import app.repositories.TripsRepositoryJpa;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Random;

@SpringBootApplication
public class EsServerApplication implements CommandLineRunner {

  @Autowired
  private ScootersRepositoryJpa scootersRepo;
  @Autowired
  private TripsRepositoryJpa tripRepo;

  private Logger logger = LoggerFactory.getLogger(this.getClass());

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
    List<Scooter> scooters = this.scootersRepo.findAll();
    List<Trip> trips = this.tripRepo.findAll();

    // check whether the repo is empty
    if (scooters != null && scooters.size() > 0) return;
    if (trips != null && trips.size() > 0) return;

    System.out.println("Configuring some initial scooter data");

    Random randomGenerator = new Random();

    for (int i = 0; i < 7; i++) {
      Scooter scooter = Scooter.createRandomScooter();
      Scooter savedScooter = this.scootersRepo.save(scooter);

      int randomInt = randomGenerator.nextInt(3) + 1; //create a random number
      // associate a random number of trips to a scooter
      for (int j = 0; j < randomInt; j++) {
        logger.info("randomInt -> {}", randomInt);
        Trip trip = Trip.createRandomTrip();
        trip.associateScooter(savedScooter);
        Trip savedTrip = this.tripRepo.save(trip);
        savedScooter.associateTrip(savedTrip);
      }
      this.scootersRepo.save(savedScooter);
    }
  }
}
