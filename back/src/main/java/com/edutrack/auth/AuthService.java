package com.edutrack.auth;

public interface AuthService {

    String login(String username, String password);
    String signUp(String name, String lastname, String username, String password, String email);
    String verifyToken(String token);
}
