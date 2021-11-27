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

@Repository("SCOOTERS.JPA")
@Transactional
@Primary
public class ScootersRepositoryJpa
  extends AbstractEntityRepositoryJpa<Scooter> {

  @Autowired
  @PersistenceContext
  EntityManager entityManager;

  public ScootersRepositoryJpa() {
    super(Scooter.class);
  }

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
    return entityManager.merge(scooter);
  }

  @Override
  public boolean deleteById(long id) {
    Scooter scooter = findById(id);
    if(scooter != null){
      entityManager.remove(scooter);
      return true;
    }
    return false;
  }

  @Override
  public List<Scooter> findByQuery(String jpqlName, Object... params0) {
    TypedQuery<Scooter> query = this.entityManager.createNamedQuery(jpqlName, Scooter.class);
    query.setParameter(1, params0).getResultList();
    return query.getResultList();
  }
}
