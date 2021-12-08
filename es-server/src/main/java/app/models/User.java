package app.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {

  private static long nextId = 0;

  @Id
  @GeneratedValue
  private long id;
  private String name;
  private String email;
  private String hashedPassword;
  private String role;

  public User(String name, String email, String role){
    this.id = nextId++;
    this.name = name;
    this.email = email;
    this.role = role;
  }

  protected User() {
  }

  public static String getNameFromEmail(String email) {
    String[] emailString = email.split("@");
    return emailString[0]; //extracts the name from the email: the part before @
  }

  public static long getNextId() {
    return nextId;
  }

  public static void setNextId(long nextId) {
    User.nextId = nextId;
  }

  public long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getHashedPassword() {
    return hashedPassword;
  }

  public void setHashedPassword(String hashedPassword) {
    this.hashedPassword = hashedPassword;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }
}
