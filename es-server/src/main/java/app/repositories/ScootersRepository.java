package app.repositories;

import app.models.Scooter;

import java.util.List;

public interface ScootersRepository {
  List<Scooter> findAll();    //finds all available scooters

  Scooter findById(long id);  //find scooter by id, return null if scooter doesn't exist

  Scooter save(Scooter scooter); //updates the scooter in the repository indentified by scooter.id
                                 //inserts a new scooter if scooter.id==0
  Scooter deleteById(long id);  //deletes the scooter from the repo, indentified by id
                                //returns the instance that has been deleted or null
}
