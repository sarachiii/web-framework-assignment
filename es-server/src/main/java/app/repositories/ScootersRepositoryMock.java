package app.repositories;

import app.models.Scooter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ScootersRepositoryMock implements ScootersRepository{

  private List<Scooter> scooters = new ArrayList<>();
  private int id;

  public ScootersRepositoryMock() {
    for (int i = 0; i <= 7; i++) {
      this.scooters.add(Scooter.createSampleScooter(id));
      id++;
    }
  }

  @Override
  public List<Scooter> findAll() {
    return scooters;
  }
}
