package com.internshiphub.backend.controller;

import com.internshiphub.backend.entity.*;
import com.internshiphub.backend.repository.*;
import com.internshiphub.backend.security.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/mentor")
@PreAuthorize("hasRole('MENTOR')")

public class MentorController {

    private final ResourceRepository resourceRepository;
    private final AssignmentRepository assignmentRepository;
    private final SubmissionRepository submissionRepository;
    private final QuizRepository quizRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final AnnouncementRepository announcementRepository;
    private final UserRepository userRepository;

    @PostMapping("/resources")
    public ResponseEntity<?> createResource(Authentication authentication, @RequestBody Resource resource) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User mentor = userRepository.findById(userDetails.getId()).orElseThrow();
        resource.setUploadedBy(mentor);
        return ResponseEntity.ok(resourceRepository.save(resource));
    }

    @PostMapping("/assignments")
    public ResponseEntity<?> createAssignment(Authentication authentication, @RequestBody Assignment assignment) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User mentor = userRepository.findById(userDetails.getId()).orElseThrow();
        assignment.setCreatedBy(mentor);
        return ResponseEntity.ok(assignmentRepository.save(assignment));
    }

    @GetMapping("/submissions")
    public ResponseEntity<List<Submission>> getAllSubmissions() {
        return ResponseEntity.ok(submissionRepository.findAll());
    }

    @PutMapping("/submissions/{id}")
    public ResponseEntity<?> reviewSubmission(@PathVariable Long id, @RequestBody Submission reviewData) {
        Submission submission = submissionRepository.findById(id).orElseThrow();
        submission.setStatus(reviewData.getStatus());
        submission.setMarks(reviewData.getMarks());
        submission.setReviewedAt(LocalDateTime.now());
        return ResponseEntity.ok(submissionRepository.save(submission));
    }

    @PostMapping("/quizzes")
    public ResponseEntity<?> createQuiz(Authentication authentication, @RequestBody Quiz quiz) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User mentor = userRepository.findById(userDetails.getId()).orElseThrow();
        quiz.setCreatedBy(mentor);
        return ResponseEntity.ok(quizRepository.save(quiz));
    }

    @GetMapping("/leaves")
    public ResponseEntity<List<LeaveRequest>> getAllLeaves() {
        return ResponseEntity.ok(leaveRequestRepository.findAll());
    }

    @PutMapping("/leaves/{id}")
    public ResponseEntity<?> reviewLeave(Authentication authentication, @PathVariable Long id, @RequestBody LeaveRequest reviewData) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User mentor = userRepository.findById(userDetails.getId()).orElseThrow();
        
        LeaveRequest leave = leaveRequestRepository.findById(id).orElseThrow();
        leave.setStatus(reviewData.getStatus());
        leave.setReviewedBy(mentor);
        return ResponseEntity.ok(leaveRequestRepository.save(leave));
    }

    @PostMapping("/announcements")
    public ResponseEntity<?> createAnnouncement(Authentication authentication, @RequestBody Announcement announcement) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User mentor = userRepository.findById(userDetails.getId()).orElseThrow();
        announcement.setCreatedBy(mentor);
        return ResponseEntity.ok(announcementRepository.save(announcement));
    }

    
    @org.springframework.beans.factory.annotation.Autowired
    public MentorController(ResourceRepository resourceRepository, AssignmentRepository assignmentRepository, SubmissionRepository submissionRepository, QuizRepository quizRepository, LeaveRequestRepository leaveRequestRepository, AnnouncementRepository announcementRepository, UserRepository userRepository) {
        this.resourceRepository = resourceRepository;
        this.assignmentRepository = assignmentRepository;
        this.submissionRepository = submissionRepository;
        this.quizRepository = quizRepository;
        this.leaveRequestRepository = leaveRequestRepository;
        this.announcementRepository = announcementRepository;
        this.userRepository = userRepository;
    }
}
