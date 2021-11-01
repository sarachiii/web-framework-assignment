package app.rest.config;

import app.rest.ScootersController;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@ConditionalOnClass(ScootersController.class)
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry){
    registry.addMapping("/**")
      .allowedOriginPatterns("http://localhost:4200*", getHostIPAddressPattern());
  }

  private String getHostIPAddressPattern() {
    return null;
  }
}
