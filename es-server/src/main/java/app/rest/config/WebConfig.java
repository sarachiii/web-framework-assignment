package app.rest.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Set;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
      .allowedMethods("GET", "POST", "PUT", "DELETE")
      .allowedOrigins("http://localhost:4203", "http://localhost:4200")
      .allowedHeaders(HttpHeaders.AUTHORIZATION, HttpHeaders.CONTENT_TYPE)
      .exposedHeaders(HttpHeaders.AUTHORIZATION, HttpHeaders.CONTENT_TYPE)
      .allowCredentials(true);
  }

  //TODO: Which paths do need to be secured? /scooters? Filtering works btw..
  public final Set<String> SECURED_PATHS =
    Set.of("/scooters");

  //JWT configuration that can be adjusted from application.properties
  @Value("HvA")
  public String issuer;

  @Value("${jwt.pass-phrase:This is very secret information for my private encryption key.}")
  private String passphrase;

  @Value("1200") //default 20 minutes
  public int tokenDurationOfValidity;

  public String getPassphrase() {
    return passphrase;
  }
}
