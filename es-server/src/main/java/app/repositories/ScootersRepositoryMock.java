package app.repositories;

import app.models.Scooter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ScootersRepositoryMock implements ScootersRepository{

  private static List<Scooter> scooters = new ArrayList<>();
  private long id = 30000;

  public ScootersRepositoryMock() {
    for (int i = 0; i <= 7; i++) {
      id++;
      scooters.add(Scooter.createSampleScooter(id));
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

    if(scooter.getId() == 0){ //if id is == 0, generate new unique id
      scooter.setId(++id);
    }

    int indexNumber = scooters.indexOf(scooter);

    if(indexNumber == -1) { //if scooter doesn't exists in scooters list add it, else update the scooter
      scooters.add(scooter);
    } else {
      scooters.set(indexNumber,scooter);
    }

    return scooter;
  }

  @Override
  public Scooter deleteById(long id) {
    for (Scooter scooter : scooters) {
      if (scooter.getId() == id) {
        scooters.remove(scooter);
        return scooter;
      }
    }
    return null;
  }
}
