package app.rest;

import app.models.User;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.NotAcceptableStatusException;

import java.util.Objects;

@RestController
@RequestMapping("authentication")
public class AuthenticationController {

  @PostMapping("login")
  public ResponseEntity<User> login(@RequestBody ObjectNode json) {
    String email = json.get("email").asText();
    String name = email.split("\n")[0];
    String password = json.get("password").asText();

    if (Objects.equals(name, password)) {
      // TODO random id
      return ResponseEntity.accepted().body(new User(0, name, email, "registered user" ));
    }
    return null; // TODO NotAcceptableException
  }
}
