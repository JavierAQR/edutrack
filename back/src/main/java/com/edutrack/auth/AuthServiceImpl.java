package com.edutrack.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.edutrack.entities.User;
import com.edutrack.repositories.UserRepository;
import com.edutrack.util.JwtUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    
    @Autowired
    private AuthenticationManager authenticationManager;// Se encarga de autenticar al usuario con su nombre de usuario y contraseña.
    @Autowired
    private PasswordEncoder passwordEncoder; // Codifica las contraseñas antes de guardarlas en la base de datos.
    @Autowired
    private UserRepository userRepository; // Repositorio que interactúa con la base de datos para las operaciones relacionadas con el usuario.

    @Override
    public String login(String username, String password) {

        // Crea un token de autenticación con el nombre de usuario y la contraseña
        var authToken = new UsernamePasswordAuthenticationToken(username, password);

        // Autentica al usuario utilizando el AuthenticationManager
        var authenticate = authenticationManager.authenticate(authToken);

        // Genera y devuelve un token JWT utilizando el nombre de usuario autenticado.
        return JwtUtils.generateToken(((UserDetails) (authenticate.getPrincipal())).getUsername());
    }

    @Override
    public String signUp(String name, String lastname, String username, String password, String email) {

        // Verifica si el nombre de usuario ya existe en la base de datos.
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("El Username ya existe");  // Lanza una excepción si el nombre de usuario ya existe.
        }
        // Verificar si el email ya existe
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("El correo electrónico ya existe");
        }
        // Crear un nuevo objeto Usuario
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password)); // La contraseña se cifra antes de guardarse
        user.setName(name);
        user.setLastname(lastname);
        user.setEmail(email);  // Asignar el email

        user = userRepository.save(user);

        // Aquí deberías publicar el evento de registro
        System.out.println("USUARIO GUARDADO " + user.getUsername());

        return JwtUtils.generateToken(username);
    }

    @Override
    public String verifyToken(String token) {
        // Obtiene el nombre de usuario del token.
        var usernameOptional = JwtUtils.getUsernameFromToken(token);
        // Si el token es válido, devuelve el nombre de usuario.
        if (usernameOptional.isPresent()) {
            return usernameOptional.get();
        }
        // Si el token no es válido, lanza una excepción.
        throw new RuntimeException("Token invalid");
    }
}
