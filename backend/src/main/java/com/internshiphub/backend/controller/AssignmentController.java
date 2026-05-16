package com.internshiphub.backend.controller;

import com.internshiphub.backend.entity.Assignment;
import com.internshiphub.backend.entity.Submission;
import com.internshiphub.backend.entity.User;
import com.internshiphub.backend.repository.AssignmentRepository;
import com.internshiphub.backend.repository.SubmissionRepository;
import com.internshiphub.backend.repository.UserRepository;
import com.internshiphub.backend.security.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/assignments")

public class AssignmentController {

    private final AssignmentRepository assignmentRepository;
    private final SubmissionRepository submissionRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Assignment>> getAllAssignments() {
        return ResponseEntity.ok(assignmentRepository.findAll());
    }

    @GetMapping("/my-submissions")
    public ResponseEntity<List<Submission>> getMySubmissions(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(submissionRepository.findByStudentId(userDetails.getId()));
    }

    @PostMapping("/{assignmentId}/submit")
    public ResponseEntity<?> submitAssignment(Authentication authentication, @PathVariable Long assignmentId, @RequestBody Submission submissionDetails) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User student = userRepository.findById(userDetails.getId()).orElseThrow();
        Assignment assignment = assignmentRepository.findById(assignmentId).orElseThrow();

        Optional<Submission> existing = submissionRepository.findByAssignmentIdAndStudentId(assignmentId, student.getId());
        Submission submission;
        if (existing.isPresent()) {
            submission = existing.get();
            submission.setFileUrl(submissionDetails.getFileUrl());
            submission.setComments(submissionDetails.getComments());
        } else {
            submission = new Submission();
            submission.setAssignment(assignment);
            submission.setStudent(student);
            submission.setFileUrl(submissionDetails.getFileUrl());
            submission.setComments(submissionDetails.getComments());
            submission.setStatus("PENDING");
        }

        return ResponseEntity.ok(submissionRepository.save(submission));
    }

    
    @org.springframework.beans.factory.annotation.Autowired
    public AssignmentController(AssignmentRepository assignmentRepository, SubmissionRepository submissionRepository, UserRepository userRepository) {
        this.assignmentRepository = assignmentRepository;
        this.submissionRepository = submissionRepository;
        this.userRepository = userRepository;
    }
}
