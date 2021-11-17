package app.repositories;

import app.models.Scooter;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class ScootersRepositoryJpa implements ScootersRepository {

  @PersistenceContext
  EntityManager entityManager;

  @Override
  public List<Scooter> findAll() {
//    TypedQuery<Scooter> query = this.entityManager.createQuery("select s from Scooter s", Scooter.class);
//    return query.getResultList();
    return null;
  }

  @Override
  public Scooter findById(long id) {
    return entityManager.find(Scooter.class, id);
  }

  @Override
  public Scooter save(Scooter scooter) {
    return entityManager.merge(scooter);
  }

  @Override
  public Scooter deleteById(long id) {
    Scooter scooter = findById(id);
    entityManager.remove(scooter);
    return null;
  }
}
