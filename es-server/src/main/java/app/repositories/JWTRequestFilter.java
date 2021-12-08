package app.repositories;

import app.rest.config.WebConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JWTRequestFilter extends OncePerRequestFilter {

  @Autowired
  WebConfig apiConfig;

  @Override
  public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
    throws ServletException, IOException {
    String servletPath = request.getServletPath();

    if (HttpMethod.OPTIONS.matches(request.getMethod()) ||
      this.apiConfig.SECURED_PATHS.stream().noneMatch(servletPath::startsWith)) {

      chain.doFilter(request, response);
      return;
    }
  }

}
