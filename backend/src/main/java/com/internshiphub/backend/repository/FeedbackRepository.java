package com.internshiphub.backend.repository;

import com.internshiphub.backend.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByStudentIdOrderByCreatedAtDesc(Long studentId);
}
