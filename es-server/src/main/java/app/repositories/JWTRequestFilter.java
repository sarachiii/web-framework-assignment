package app.repositories;

import app.models.JWToken;
import app.rest.config.WebConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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

        if(shouldNotFilter(request)) {
          chain.doFilter(request, response);
        }

      String encryptedToken = request.getHeader(HttpHeaders.AUTHORIZATION);

      // block the request if no token was found
      if (encryptedToken == null) {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "No token provided. You need to logon first.");
      }

      // decode the encoded and signed token, afte removing optional Bearer prefix
      JWToken jwToken = null;
      try {

        //TODO apiConfig has getpassphrase...
        jwToken = JWToken.decode(encryptedToken.replace("Bearer ", ""), this.apiConfig.getPassphrase());
      } catch (RuntimeException e) {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage() + " You need to logon first.");
      }
      return;
    }
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) {
    String path = request.getServletPath();
    return path.startsWith("/h2-console") || path.startsWith("/authentication") || path.startsWith("/favicon.ico");
  }
}
