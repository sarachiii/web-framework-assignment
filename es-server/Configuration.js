@Configuration
public class Configuration implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistery registery){
  registery.addMapping("/**").allowedOriginPatterns("http://localhost:*"), getHostIPAddressPattern())
}
