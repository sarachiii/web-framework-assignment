package app.repositories;

import app.models.Scooter;

import java.util.List;

public interface ScootersRepository {
  List<Scooter> findAll();    //finds all available scooters
}
