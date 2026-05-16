package com.internshiphub.backend.controller;

import com.internshiphub.backend.entity.Feedback;
import com.internshiphub.backend.entity.User;
import com.internshiphub.backend.repository.FeedbackRepository;
import com.internshiphub.backend.repository.UserRepository;
import com.internshiphub.backend.security.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/feedback")

public class FeedbackController {

    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Feedback>> getMyFeedbacks(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(feedbackRepository.findByStudentIdOrderByCreatedAtDesc(userDetails.getId()));
    }

    @PostMapping
    public ResponseEntity<?> submitFeedback(Authentication authentication, @RequestBody Feedback feedback) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User student = userRepository.findById(userDetails.getId()).orElseThrow();
        
        feedback.setStudent(student);
        return ResponseEntity.ok(feedbackRepository.save(feedback));
    }

    
    @org.springframework.beans.factory.annotation.Autowired
    public FeedbackController(FeedbackRepository feedbackRepository, UserRepository userRepository) {
        this.feedbackRepository = feedbackRepository;
        this.userRepository = userRepository;
    }
}
