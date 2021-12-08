package app.models;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

public class JWToken {

  private static final String JWT_CALLNAME_CLAIM = "sub";
  private static final String JWT_USERID_CLAIM = "id";
  private static final String JWT_ROLE_CLAIM = "role";

  private String callName;
  private Long userId;
  private String role;

  public JWToken(String callName, Long userId, String role){
    this.callName = callName;
    this.userId = userId;
    this.role = role;
  }

  public String encode(String issuer, String passphrase, int expiration){
    Key key = getKey(passphrase);

    return Jwts.builder()
      .claim(JWT_CALLNAME_CLAIM, this.callName)
      .claim(JWT_USERID_CLAIM, this.userId)
      .claim(JWT_ROLE_CLAIM, this.role)
      .setIssuer(issuer)
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000L))
      .signWith(key, SignatureAlgorithm.HS512)
      .compact();
  }

  private static Key getKey(String passphrase){
    byte[] hmacKey = passphrase.getBytes(StandardCharsets.UTF_8);
    return new SecretKeySpec(hmacKey, SignatureAlgorithm.HS512.getJcaName());
  }

}
