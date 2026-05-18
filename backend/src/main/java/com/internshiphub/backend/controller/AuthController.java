package com.internshiphub.backend.controller;

import com.internshiphub.backend.dto.JwtResponse;
import com.internshiphub.backend.dto.LoginRequest;
import com.internshiphub.backend.dto.MessageResponse;
import com.internshiphub.backend.dto.SignupRequest;
import com.internshiphub.backend.entity.ApprovalStatus;
import com.internshiphub.backend.entity.Role;
import com.internshiphub.backend.entity.User;
import com.internshiphub.backend.repository.UserRepository;
import com.internshiphub.backend.security.JwtUtils;
import com.internshiphub.backend.security.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")

public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            String role = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .findFirst().orElse("ROLE_STUDENT");

            return ResponseEntity.ok(new JwtResponse(jwt,
                    userDetails.getId(),
                    userDetails.getUsername(),
                    role,
                    userDetails.getApprovalStatus()));
        } catch (org.springframework.security.authentication.DisabledException e) {
            return ResponseEntity.status(401).body(new MessageResponse("Error: Your account is still PENDING approval by an Admin."));
        } catch (org.springframework.security.authentication.BadCredentialsException e) {
            return ResponseEntity.status(401).body(new MessageResponse("Error: Invalid email or password."));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        ApprovalStatus status = ApprovalStatus.PENDING;
        if (signUpRequest.getRole() == Role.ADMIN) {
             status = ApprovalStatus.APPROVED; // Initial admins approved automatically for demo
        }

        User user = new User();
        user.setFullName(signUpRequest.getFullName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        user.setPhone(signUpRequest.getPhone());
        user.setCollege(signUpRequest.getCollege());
        user.setRole(signUpRequest.getRole());
        user.setApprovalStatus(status);

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    
    @org.springframework.beans.factory.annotation.Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, PasswordEncoder encoder, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }
}
