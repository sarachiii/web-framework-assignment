package app.repositories;

import app.models.Scooter;
import app.models.Trip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
@Primary
public class TripsRepositoryJpa {

  @Autowired
  @PersistenceContext
  EntityManager entityManager;

  public List<Trip> findAll() {
    TypedQuery<Trip> query = this.entityManager.createQuery("select t from Trip t", Trip.class);
    return query.getResultList();
  }

  public Trip findById(long id) {
    return entityManager.find(Trip.class, id);
  }

  //Saves new trip or updates trip
  public Trip save(Trip trip) {
    return entityManager.merge(trip);
  }

  public Trip deleteById(long id) {
    Trip trip = findById(id);
    entityManager.remove(trip);
    return null;
  }
}
