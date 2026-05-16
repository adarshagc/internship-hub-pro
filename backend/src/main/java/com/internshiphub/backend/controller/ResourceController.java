package com.internshiphub.backend.controller;

import com.internshiphub.backend.entity.Course;
import com.internshiphub.backend.entity.Module;
import com.internshiphub.backend.entity.Resource;
import com.internshiphub.backend.repository.CourseRepository;
import com.internshiphub.backend.repository.ModuleRepository;
import com.internshiphub.backend.repository.ResourceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/courses")

public class ResourceController {

    private final CourseRepository courseRepository;
    private final ModuleRepository moduleRepository;
    private final ResourceRepository resourceRepository;

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseRepository.findAll());
    }

    @GetMapping("/{courseId}/modules")
    public ResponseEntity<List<Module>> getModulesByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(moduleRepository.findByCourseIdOrderByOrderNumberAsc(courseId));
    }

    @GetMapping("/modules/{moduleId}/resources")
    public ResponseEntity<List<Resource>> getResourcesByModule(@PathVariable Long moduleId) {
        return ResponseEntity.ok(resourceRepository.findByModuleId(moduleId));
    }

    
    @org.springframework.beans.factory.annotation.Autowired
    public ResourceController(CourseRepository courseRepository, ModuleRepository moduleRepository, ResourceRepository resourceRepository) {
        this.courseRepository = courseRepository;
        this.moduleRepository = moduleRepository;
        this.resourceRepository = resourceRepository;
    }
}
