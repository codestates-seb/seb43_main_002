//package com.branch.sikgu.auth.controller;
//
//import com.branch.sikgu.auth.dto.JwtResponse;
//import com.branch.sikgu.auth.dto.LoginDto;
//import com.branch.sikgu.auth.jwt.JwtTokenizer;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/members")
//public class LoginController {
//    private final AuthenticationManager authenticationManager;
//    private final JwtTokenizer jwtTokenizer;
//
//    public LoginController(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer) {
//        this.authenticationManager = authenticationManager;
//        this.jwtTokenizer = jwtTokenizer;
//    }
//
//    @PostMapping("/members/login")
//    public ResponseEntity<JwtResponse> login(@RequestBody LoginDto loginDto) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(loginDto.getUserName(), loginDto.getPassword())
//        );
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//
//        String accessToken = jwtTokenizer.generateAccessToken(userDetails);
//        String refreshToken = jwtTokenizer.generateRefreshToken(userDetails);
//
//        JwtResponse response = new JwtResponse(accessToken, refreshToken);
//
//        return ResponseEntity.ok(response);
//    }
//}