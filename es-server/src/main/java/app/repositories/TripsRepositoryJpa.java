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

@Repository("TRIPS.JPA")
@Transactional
@Primary
public class TripsRepositoryJpa extends AbstractEntityRepositoryJpa<Trip> {

  @Autowired
  @PersistenceContext
  EntityManager entityManager;

  public TripsRepositoryJpa() {
    super(Trip.class);
  }

  @Override
  public List<Trip> findAll() {
    TypedQuery<Trip> query = this.entityManager.createQuery("select t from Trip t", Trip.class);
    return query.getResultList();
  }

  @Override
  public Trip findById(long id) {
    return entityManager.find(Trip.class, id);
  }

  @Override
  //Saves new trip or updates trip
  public Trip save(Trip trip) {
    return entityManager.merge(trip);
  }

  @Override
  public boolean deleteById(long id) {
    Trip trip = findById(id);
    if (trip != null) {
      entityManager.remove(trip);
      return true;
    }
    return false;
  }

  @Override
  public List<Trip> findByQuery(String jpqlName, Object params0) {
    TypedQuery<Trip> query = this.entityManager.createNamedQuery(jpqlName, Trip.class);
    return query.setParameter(1, params0).getResultList();
  }
}
