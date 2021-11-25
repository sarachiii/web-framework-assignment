package app;

import app.models.Scooter;
import app.models.Trip;
import app.repositories.ScootersRepositoryJpa;
import app.repositories.TripsRepositoryJpa;
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
  @Autowired
  private TripsRepositoryJpa tripRepo;

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
    List<Trip> trips = this.tripRepo.findAll();

    if (scooters != null && scooters.size() > 0) return;
    System.out.println("Configuring some initial scooter data");

    for (int i = 0; i < 7; i++) {
      Scooter scooter = Scooter.createRandomScooter();
      Trip trip1 = Trip.createRandomTrip();
      Trip trip2 = Trip.createRandomTrip();
      Trip trip3 = Trip.createRandomTrip();

      Scooter savedScooter = this.scootersRepo.save(scooter);
      Trip savedTrip = this.tripRepo.save(trip1);
    }
//      scooters.get(0).associateTrip(trips.get(0));
//      scooters.get(0).associateTrip(trips.get(1));
//      scooters.get(1).associateTrip(trips.get(2));
//      scooters.get(2).associateTrip(trips.get(3));
//      scooters.get(2).associateTrip(trips.get(4));
//      scooters.get(3).associateTrip(trips.get(5));
  }
}
