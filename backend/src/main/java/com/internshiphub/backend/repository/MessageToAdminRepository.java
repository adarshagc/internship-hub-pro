package com.internshiphub.backend.repository;

import com.internshiphub.backend.entity.MessageToAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageToAdminRepository extends JpaRepository<MessageToAdmin, Long> {
    List<MessageToAdmin> findByStudentIdOrderByCreatedAtDesc(Long studentId);
}
