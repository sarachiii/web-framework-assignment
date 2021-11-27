package app.repositories;

import app.models.Identifiable;

import java.util.List;

public interface EntityRepository<E extends Identifiable>{
  List<E> findAll();
  E findById(long id);

  E save(E entity);

  boolean deleteById(long id);
  List<E> findByQuery(String jpqlName, Object... params0);
  //finds all instances from a named jpql-query
}
