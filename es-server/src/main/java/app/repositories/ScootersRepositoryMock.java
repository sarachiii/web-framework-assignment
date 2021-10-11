package app.repositories;

import app.models.Scooter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ScootersRepositoryMock implements ScootersRepository{

  private List<Scooter> scooters = new ArrayList<>();
  private int id = 30000;

  public ScootersRepositoryMock() {
    for (int i = 0; i <= 7; i++) {
      id++;
      this.scooters.add(Scooter.createSampleScooter(id));
//      for (int j = 0; j < 3; j++) {
//        id++;
//      }
    }
  }

  @Override
  public List<Scooter> findAll() {
    return scooters;
  }
}
