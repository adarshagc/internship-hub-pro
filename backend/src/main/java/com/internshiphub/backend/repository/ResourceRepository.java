package com.internshiphub.backend.repository;

import com.internshiphub.backend.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findByModuleId(Long moduleId);
}
