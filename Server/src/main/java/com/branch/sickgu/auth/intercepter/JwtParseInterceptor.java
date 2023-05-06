package com.branch.sickgu.auth.intercepter;

import com.branch.sickgu.auth.utils.ErrorResponder;
import com.branch.sickgu.auth.utils.JwtUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Slf4j
@Component
@AllArgsConstructor
public class JwtParseInterceptor implements HandlerInterceptor {
    private final JwtUtils jwtUtils;
    private static final ThreadLocal<Long> authenticatedMemberId = new ThreadLocal<>();

    public static long getAuthenticatedMemberId() {
        return authenticatedMemberId.get();
    }

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {
        try {
            Map<String, Object> claims = jwtUtils.getJwsClaimsFromRequest(request);
            authenticatedMemberId.set(Long.valueOf(claims.get("memberId").toString()));
            return true;
        } catch (Exception e) {
            /**
             * JWT 검증 및 Expiration 시, Error Response 전송.
             * - GlobalExceptionAdvice에서 처리할 수 있으나 보안과 관련된 에러는 이미 만들어 둔 ErrorResponder룰 사용해서 중복 로직을 최소화 한다.
             */

            ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED);
            return false;
        }
    }

    @Override
    public void postHandle(HttpServletRequest request,
                           HttpServletResponse response,
                           Object handler,
                           @Nullable ModelAndView modelAndView) throws Exception {
        this.authenticatedMemberId.remove();
    }
}
