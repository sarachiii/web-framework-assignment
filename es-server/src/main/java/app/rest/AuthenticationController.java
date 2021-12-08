package app.rest;

import app.models.User;
import app.rest.exception.NotAcceptableException;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("authentication")
public class AuthenticationController {

  @PostMapping("login")
  public ResponseEntity<User> login(@RequestBody ObjectNode json) {
    String email = json.get("email").asText();
    String password = json.get("password").asText();
    String name = User.getNameFromEmail(email);

    if (Objects.equals(password, name)) {
      return ResponseEntity.accepted().body(new User(name, email, "Accepted"));
    } else {
      throw new NotAcceptableException("password= " + password + " is not an acceptable value");
    }
  }
}

