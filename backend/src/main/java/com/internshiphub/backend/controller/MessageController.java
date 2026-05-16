package com.internshiphub.backend.controller;

import com.internshiphub.backend.entity.MessageToAdmin;
import com.internshiphub.backend.entity.User;
import com.internshiphub.backend.repository.MessageToAdminRepository;
import com.internshiphub.backend.repository.UserRepository;
import com.internshiphub.backend.security.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/messages")

public class MessageController {

    private final MessageToAdminRepository messageRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<MessageToAdmin>> getMyMessages(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(messageRepository.findByStudentIdOrderByCreatedAtDesc(userDetails.getId()));
    }

    @PostMapping
    public ResponseEntity<?> sendMessage(Authentication authentication, @RequestBody MessageToAdmin message) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User student = userRepository.findById(userDetails.getId()).orElseThrow();
        
        message.setStudent(student);
        message.setStatus("UNREAD");
        return ResponseEntity.ok(messageRepository.save(message));
    }

    
    @org.springframework.beans.factory.annotation.Autowired
    public MessageController(MessageToAdminRepository messageRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }
}
