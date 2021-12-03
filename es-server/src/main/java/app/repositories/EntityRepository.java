package app.repositories;

import app.models.Identifiable;

import java.util.List;

public interface EntityRepository<E extends Identifiable>{
  List<E> findAll();            // finds all available instances
  E findById(long id);          // finds one instance indentified by id
                                // returns null if instance does not exist
  E save(E entity);             // updates or creates the instance matching entity.getId()
                                // generates a new unique Id if entity.getId() == 0
  boolean deleteById(long id);  // deletes the instance identified by entity.getId()
                                // returns whether an existing instance has been deleted
  List<E> findByQuery(String jpqlName, Object params0);
  //finds all instances from a named jpql-query
}
