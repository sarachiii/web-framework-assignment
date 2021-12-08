package app.models;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
public class User {

  @Id
  @GeneratedValue
  private long id;
  private String name;
  private String email;
  private String hashedPassword;
  private String role;



  public User(long id, String name, String email, String role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.role = role;
  }

  public User(long id, String name, String email, String hashedPassword, String role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.role = role;
  }
}
