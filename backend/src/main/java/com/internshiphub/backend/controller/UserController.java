package com.internshiphub.backend.controller;

import com.internshiphub.backend.entity.User;
import com.internshiphub.backend.repository.UserRepository;
import com.internshiphub.backend.security.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")

public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Optional<User> user = userRepository.findById(userDetails.getId());
        
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(Authentication authentication, @RequestBody User updateData) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Optional<User> userOptional = userRepository.findById(userDetails.getId());
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (updateData.getFullName() != null) user.setFullName(updateData.getFullName());
            if (updateData.getPhone() != null) user.setPhone(updateData.getPhone());
            if (updateData.getDateOfBirth() != null) user.setDateOfBirth(updateData.getDateOfBirth());
            if (updateData.getCollege() != null) user.setCollege(updateData.getCollege());
            if (updateData.getBranch() != null) user.setBranch(updateData.getBranch());
            if (updateData.getSemester() != null) user.setSemester(updateData.getSemester());
            if (updateData.getSkillLevel() != null) user.setSkillLevel(updateData.getSkillLevel());
            if (updateData.getLinkedinUrl() != null) user.setLinkedinUrl(updateData.getLinkedinUrl());
            if (updateData.getBio() != null) user.setBio(updateData.getBio());
            if (updateData.getProfileImage() != null) user.setProfileImage(updateData.getProfileImage());
            
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    
    @org.springframework.beans.factory.annotation.Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
