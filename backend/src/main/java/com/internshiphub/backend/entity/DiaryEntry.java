package com.internshiphub.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "diary_entries")
public class DiaryEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @Column(nullable = false)
    private LocalDate date;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String workDone;

    private Double hoursSpent;

    private String status; // PENDING, APPROVED, REJECTED

    @CreationTimestamp
    private LocalDateTime createdAt;

    public DiaryEntry() {}

    public DiaryEntry(Long id, User student, LocalDate date, String workDone, Double hoursSpent, String status, LocalDateTime createdAt) {
        this.id = id;
        this.student = student;
        this.date = date;
        this.workDone = workDone;
        this.hoursSpent = hoursSpent;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getStudent() {
        return this.student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getWorkDone() {
        return this.workDone;
    }

    public void setWorkDone(String workDone) {
        this.workDone = workDone;
    }

    public Double getHoursSpent() {
        return this.hoursSpent;
    }

    public void setHoursSpent(Double hoursSpent) {
        this.hoursSpent = hoursSpent;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
