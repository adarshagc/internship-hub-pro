package com.internshiphub.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "submissions")
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id", nullable = false)
    private Assignment assignment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    private String fileUrl;

    @Column(columnDefinition = "TEXT")
    private String comments;

    private String status; // PENDING, GRADED, REJECTED

    private Integer marks;

    @CreationTimestamp
    private LocalDateTime submittedAt;

    private LocalDateTime reviewedAt;

    public Submission() {}

    public Submission(Long id, Assignment assignment, User student, String fileUrl, String comments, String status, Integer marks, LocalDateTime submittedAt, LocalDateTime reviewedAt) {
        this.id = id;
        this.assignment = assignment;
        this.student = student;
        this.fileUrl = fileUrl;
        this.comments = comments;
        this.status = status;
        this.marks = marks;
        this.submittedAt = submittedAt;
        this.reviewedAt = reviewedAt;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Assignment getAssignment() {
        return this.assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public User getStudent() {
        return this.student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public String getFileUrl() {
        return this.fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getComments() {
        return this.comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getMarks() {
        return this.marks;
    }

    public void setMarks(Integer marks) {
        this.marks = marks;
    }

    public LocalDateTime getSubmittedAt() {
        return this.submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public LocalDateTime getReviewedAt() {
        return this.reviewedAt;
    }

    public void setReviewedAt(LocalDateTime reviewedAt) {
        this.reviewedAt = reviewedAt;
    }
}
