package com.edutrack.auth;

import java.io.IOException;

import com.edutrack.dto.request.UserInfoDTO;
import com.edutrack.entities.User;
import com.edutrack.repositories.UserRepository;
import com.edutrack.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.edutrack.token.VerificationToken;
import com.edutrack.token.VerificationTokenRepository;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/auth/")
@RequiredArgsConstructor
@CrossOrigin
@Slf4j
public class AuthController {
    
    @Autowired
    private AuthService authService; // Inyección de dependencia del servicio encargado de la lógica de autenticación.

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private AuthServiceImpl userService;

    private final JwtUtils jwtUtils;

    private final UserRepository userRepository;



    @PostMapping("/login") // Define que este método manejará solicitudes POST a "/api/auth/login".
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO authRequestDto) {
        try{
            var jwtToken = authService.login(authRequestDto.username(), authRequestDto.password());

            var authResponseDTO = new AuthResponseDTO(jwtToken, AuthStatus.LOGIN_SUCCESS, "Inicio de sesión exitoso.");
  
            // Llama al servicio para autenticar al usuario y generar un token JWT
            return ResponseEntity.status(HttpStatus.OK)
                .body(authResponseDTO); 

        } catch (Exception e) {
            String errorMessage = e.getMessage();
            
            AuthStatus status = AuthStatus.LOGIN_FAILED;

            if (errorMessage.contains("Usuario no encontrado")) {
                errorMessage = "Usuario no encontrado";
            } else if (errorMessage.contains("La cuenta no ha sido verificada")) {
                errorMessage = "La cuenta no ha sido verificada. Por favor, revise su correo electrónico.";
            } else if (errorMessage.contains("Bad credentials")) {
                errorMessage = "Usuario o contraseña incorrectos";
            }
            
            var authResponseDTO = new AuthResponseDTO(null, status, errorMessage);

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(authResponseDTO); 
        }
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> signUp (@RequestBody AuthRequestDTO authRequestDTO){
        try{
        var jwtToken = authService.signUp(authRequestDTO.name(), authRequestDTO.lastname(), authRequestDTO.username(), authRequestDTO.password(), authRequestDTO.email(), authRequestDTO.birthdate());

        var authResponseDTO = new AuthResponseDTO(jwtToken, AuthStatus.USER_CREATED_SUCCESSFULLY, "Usuario registrado exitosamente.");

        return ResponseEntity.status(HttpStatus.OK)
                .body(authResponseDTO);
        } catch(Exception e){

            String errorMessage = e.getMessage();
            AuthStatus status = AuthStatus.USER_NOT_CREATED;
            e.printStackTrace();

            if (e.getMessage().contains("Username already exists")){
                errorMessage = "El nombre de usuario ya está en uso.";
            } else if (e.getMessage().contains("Email already exists")){
                errorMessage = "El correo electrónico ya está registrado.";
            }

            var authResponseDTO = new AuthResponseDTO(null, status, errorMessage);

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(authResponseDTO); 
        }
        
    }


    @GetMapping("/verifyEmail")
    public void verifyEmail(@RequestParam("token") String token, HttpServletResponse response) throws IOException {
        // Imprime el token recibido en la consola para verificación
        System.out.println("Recibida solicitud de verificación para token: " + token);

        try {
            // Busca el token de verificación en la base de datos utilizando el repositorio
            VerificationToken theToken = tokenRepository.findByToken(token);

            // Si no se encuentra el token, redirige al usuario a la página de verificación con un mensaje de error
            if (theToken == null) {
                System.out.println("Token no encontrado");
                response.sendRedirect("http://localhost:5173/verification?status=invalid-token");
                return;
            }

            // Valida el token y guarda el resultado
            String result = userService.validateToken(token);

            // Imprime el resultado de la validación en la consola para saber si es válido, expirado, etc.
            System.out.println("Resultado de la validación: " + result);

            // Dependiendo del resultado de la validación, redirige al usuario a diferentes páginas
            switch (result) {
                case "valido":
                    // Si el token es válido, redirige con un mensaje de éxito
                    response.sendRedirect("http://localhost:5173/verification?status=success");
                    break;
                case "expired":
                    // Si el token ya ha expirado, redirige con un mensaje de expiración
                    response.sendRedirect("http://localhost:5173/verification?status=expired");
                    break;
                default:
                    // Si el token no es válido, redirige con un mensaje de error
                    response.sendRedirect("http://localhost:5173/verification?status=invalid-token");
            }
        } catch (Exception e) {
            // Si ocurre algún error durante el proceso de verificación, se captura la excepción
            // Se imprime el mensaje del error en la consola y se redirige al usuario a una página de error
            System.out.println("Error durante la verificación: " + e.getMessage());
            e.printStackTrace();
            response.sendRedirect("http://localhost:5173/verification?status=error");
        }
    }

    @GetMapping("/user-info")
    public ResponseEntity<?> getUserInfo(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.badRequest().body("Authorization header is missing or invalid");
            }

            String jwtToken = authHeader.substring(7);
            String username = jwtUtils.getUsernameFromToken(jwtToken)
                    .orElseThrow(() -> new RuntimeException("Invalid token"));

            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            return ResponseEntity.ok(new UserInfoDTO(
                    user.getUserType().toString(),
                    user.getName() + " " + user.getLastname(),
                    user.getEmail()
            ));
        } catch (Exception e) {
            log.error("Error in /user-info endpoint: {}", e.getMessage());
            return ResponseEntity.internalServerError().body("Error processing your request");
        }
    }
}
