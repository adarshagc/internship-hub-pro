package com.internshiphub.backend.controller;

import com.internshiphub.backend.entity.LeaveRequest;
import com.internshiphub.backend.entity.User;
import com.internshiphub.backend.repository.LeaveRequestRepository;
import com.internshiphub.backend.repository.UserRepository;
import com.internshiphub.backend.security.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/leaves")

public class LeaveController {

    private final LeaveRequestRepository leaveRequestRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<LeaveRequest>> getMyLeaves(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(leaveRequestRepository.findByStudentIdOrderByCreatedAtDesc(userDetails.getId()));
    }

    @PostMapping
    public ResponseEntity<?> requestLeave(Authentication authentication, @RequestBody LeaveRequest request) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User student = userRepository.findById(userDetails.getId()).orElseThrow();
        
        request.setStudent(student);
        request.setStatus("PENDING");
        return ResponseEntity.ok(leaveRequestRepository.save(request));
    }

    
    @org.springframework.beans.factory.annotation.Autowired
    public LeaveController(LeaveRequestRepository leaveRequestRepository, UserRepository userRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
        this.userRepository = userRepository;
    }
}
