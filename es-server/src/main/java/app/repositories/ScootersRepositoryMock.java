package app.repositories;

import app.models.Scooter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ScootersRepositoryMock implements ScootersRepository{

  private List<Scooter> scooters = new ArrayList<>();
  private long id = 30000;

  public ScootersRepositoryMock() {
    for (int i = 0; i <= 7; i++) {
      id++;
      this.scooters.add(Scooter.createSampleScooter(id));
    }
  }

  @Override
  public List<Scooter> findAll() {
    return scooters;
  }

  @Override
  public Scooter findById(long id) {
    for (Scooter scooter : scooters) {
      if (scooter.getId() == id) {
        return scooter;
      }
    }
    return null;
  }

  @Override
  public Scooter save(Scooter scooter) {
    for (int i = 0; i < scooters.size(); i++) {
      if (scooter.getId() == id) {
        scooters.set(i, scooter);
      }
    }
    if(scooter.getId() == 0){
      scooters.add(scooter);
    }
    return null;
  }

  @Override
  public Scooter deleteById(long id) {
    scooters.removeIf(scooter -> scooter.getId() == id);
    return null;
  }
}
