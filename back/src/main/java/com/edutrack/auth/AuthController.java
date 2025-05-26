package com.edutrack.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth/")
@RequiredArgsConstructor
public class AuthController {
    
    @Autowired
    private AuthService authService; // Inyección de dependencia del servicio encargado de la lógica de autenticación.

    @PostMapping("/login") // Define que este método manejará solicitudes POST a "/api/auth/login".
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO authRequestDto) {
        try{
        var jwtToken = authService.login(authRequestDto.username(), authRequestDto.password());

        var authResponseDTO = new AuthResponseDTO(jwtToken, AuthStatus.LOGIN_SUCCESS);
  
        // Llama al servicio para autenticar al usuario y generar un token JWT
        return ResponseEntity.status(HttpStatus.OK)
                .body(authResponseDTO); 
        } catch (Exception e) {
            e.printStackTrace();

            var authResponseDTO = new AuthResponseDTO(null, AuthStatus.LOGIN_FAILED);

            return ResponseEntity.status(HttpStatus.CONFLICT)
            .body(authResponseDTO); 
        }
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> signUp (@RequestBody AuthRequestDTO authRequestDTO){
        try{
        var jwtToken = authService.signUp(authRequestDTO.name(), authRequestDTO.lastname(), authRequestDTO.username(), authRequestDTO.password(), authRequestDTO.email());

        var authResponseDTO = new AuthResponseDTO(jwtToken, AuthStatus.USER_CREATED_SUCCESSFULLY);

        return ResponseEntity.status(HttpStatus.OK)
                .body(authResponseDTO);
        } catch(Exception e){

            e.printStackTrace();

            var authResponseDTO = new AuthResponseDTO(null, AuthStatus.USER_NOT_CREATED);

            return ResponseEntity.status(HttpStatus.CONFLICT)
            .body(authResponseDTO); 
        }
        
    }
}
