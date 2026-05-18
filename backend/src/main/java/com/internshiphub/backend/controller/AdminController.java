package com.internshiphub.backend.controller;

import com.internshiphub.backend.entity.Announcement;
import com.internshiphub.backend.entity.ApprovalStatus;
import com.internshiphub.backend.entity.Role;
import com.internshiphub.backend.entity.User;
import com.internshiphub.backend.repository.AnnouncementRepository;
import com.internshiphub.backend.repository.UserRepository;
import com.internshiphub.backend.security.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")

public class AdminController {

    private final UserRepository userRepository;
    private final AnnouncementRepository announcementRepository;

    @GetMapping("/analytics")
    public ResponseEntity<?> getAnalytics() {
        long totalUsers = userRepository.count();
        long pendingApprovals = userRepository.findAll().stream()
                .filter(u -> u.getApprovalStatus() == ApprovalStatus.PENDING)
                .count();

        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalUsers", totalUsers);
        analytics.put("pendingApprovals", pendingApprovals);
        // Add more analytics as needed
        return ResponseEntity.ok(analytics);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/users/pending")
    public ResponseEntity<List<User>> getPendingUsers() {
        List<User> pending = userRepository.findAll().stream()
                .filter(u -> u.getApprovalStatus() == ApprovalStatus.PENDING)
                .collect(Collectors.toList());
        return ResponseEntity.ok(pending);
    }

    @PutMapping("/users/{id}/approve")
    public ResponseEntity<?> approveUser(@PathVariable Long id, @RequestBody Map<String, String> body) {
        User user = userRepository.findById(id).orElseThrow();
        String status = body.get("status"); // APPROVED or REJECTED
        user.setApprovalStatus(ApprovalStatus.valueOf(status));
        return ResponseEntity.ok(userRepository.save(user));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }

    @PostMapping("/announcements")
    public ResponseEntity<?> createAnnouncement(Authentication authentication, @RequestBody Announcement announcement) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User admin = userRepository.findById(userDetails.getId()).orElseThrow();
        announcement.setCreatedBy(admin);
        announcementRepository.save(announcement);
        return ResponseEntity.ok(Map.of("message", "Announcement published successfully"));
    }

    
    @org.springframework.beans.factory.annotation.Autowired
    public AdminController(UserRepository userRepository, AnnouncementRepository announcementRepository) {
        this.userRepository = userRepository;
        this.announcementRepository = announcementRepository;
    }
}
