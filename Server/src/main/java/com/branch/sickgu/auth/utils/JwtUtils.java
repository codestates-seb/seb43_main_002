package com.branch.sickgu.auth.utils;

import com.branch.sickgu.auth.jwt.JwtTokenizer;
import lombok.AllArgsConstructor;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@AllArgsConstructor
public class JwtUtils {
    private final JwtTokenizer jwtTokenizer;

    public Map<String, Object> getJwsClaimsFromRequest(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }
}