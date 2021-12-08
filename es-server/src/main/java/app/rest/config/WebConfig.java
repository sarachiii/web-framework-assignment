package app.rest.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.net.http.HttpHeaders;
import java.util.Set;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
      .allowedMethods("GET", "POST", "PUT", "DELETE")
      .allowedOrigins("http://localhost:4203", "http://localhost:4200")
      .allowedHeaders(org.springframework.http.HttpHeaders.AUTHORIZATION, org.springframework.http.HttpHeaders.CONTENT_TYPE)
      .exposedHeaders(org.springframework.http.HttpHeaders.AUTHORIZATION, org.springframework.http.HttpHeaders.CONTENT_TYPE)
      .allowCredentials(true);
  }

  //TODO: Which paths do need to be secured? /scooters? Filtering works btw..
  public final Set<String> SECURED_PATHS =
    Set.of("/scooters");

  @Value("${jwt.pass-phrase:This is very secret information for my private encryption key.}")
  private String passphrase;

  public String getPassphrase() {
    return passphrase;
  }
}
