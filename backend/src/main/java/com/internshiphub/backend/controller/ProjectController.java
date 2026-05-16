package com.internshiphub.backend.controller;

import com.internshiphub.backend.entity.Project;
import com.internshiphub.backend.entity.User;
import com.internshiphub.backend.repository.ProjectRepository;
import com.internshiphub.backend.repository.UserRepository;
import com.internshiphub.backend.security.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/projects")

public class ProjectController {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Project>> getMyProjects(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(projectRepository.findByStudentId(userDetails.getId()));
    }

    @PostMapping
    public ResponseEntity<?> addProject(Authentication authentication, @RequestBody Project project) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User student = userRepository.findById(userDetails.getId()).orElseThrow();
        
        project.setStudent(student);
        project.setStatus("IN_PROGRESS");
        return ResponseEntity.ok(projectRepository.save(project));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(Authentication authentication, @PathVariable Long id, @RequestBody Project projectDetails) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Project project = projectRepository.findById(id).orElseThrow();
        
        if (!project.getStudent().getId().equals(userDetails.getId())) {
            return ResponseEntity.status(403).body("Unauthorized to update this project");
        }

        if (projectDetails.getTitle() != null) project.setTitle(projectDetails.getTitle());
        if (projectDetails.getDescription() != null) project.setDescription(projectDetails.getDescription());
        if (projectDetails.getGithubUrl() != null) project.setGithubUrl(projectDetails.getGithubUrl());
        if (projectDetails.getDeploymentUrl() != null) project.setDeploymentUrl(projectDetails.getDeploymentUrl());
        if (projectDetails.getStatus() != null) project.setStatus(projectDetails.getStatus());

        return ResponseEntity.ok(projectRepository.save(project));
    }

    
    @org.springframework.beans.factory.annotation.Autowired
    public ProjectController(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }
}
