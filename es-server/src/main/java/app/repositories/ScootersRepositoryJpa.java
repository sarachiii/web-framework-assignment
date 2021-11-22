package app.repositories;

import app.models.Scooter;
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
public class ScootersRepositoryJpa implements ScootersRepository {

  @Autowired
  @PersistenceContext
  EntityManager entityManager;

  @Override
  public List<Scooter> findAll() {
    TypedQuery<Scooter> query = this.entityManager.createQuery("select s from Scooter s", Scooter.class);
    return query.getResultList();
  }

  @Override
  public Scooter findById(long id) {
    return entityManager.find(Scooter.class, id);
  }

  //Saves new scooter or updates scooter
  @Override
  public Scooter save(Scooter scooter) {
    if(scooter.getId() == 0){
      entityManager.persist(scooter);
    } else {
      entityManager.merge(scooter);
    }
    return scooter;
  }

  @Override
  public Scooter deleteById(long id) {
    Scooter scooter = findById(id);
    entityManager.remove(scooter);
    return null;
  }
}
