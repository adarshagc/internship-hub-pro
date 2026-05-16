package com.internshiphub.backend.controller;

import com.internshiphub.backend.entity.DiaryEntry;
import com.internshiphub.backend.entity.User;
import com.internshiphub.backend.repository.DiaryEntryRepository;
import com.internshiphub.backend.repository.UserRepository;
import com.internshiphub.backend.security.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/diary")

public class DiaryController {

    private final DiaryEntryRepository diaryEntryRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<DiaryEntry>> getMyDiaryEntries(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(diaryEntryRepository.findByStudentIdOrderByDateDesc(userDetails.getId()));
    }

    @PostMapping
    public ResponseEntity<?> addDiaryEntry(Authentication authentication, @RequestBody DiaryEntry diaryEntry) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User student = userRepository.findById(userDetails.getId()).orElseThrow();
        
        diaryEntry.setStudent(student);
        diaryEntry.setStatus("PENDING");
        return ResponseEntity.ok(diaryEntryRepository.save(diaryEntry));
    }

    
    @org.springframework.beans.factory.annotation.Autowired
    public DiaryController(DiaryEntryRepository diaryEntryRepository, UserRepository userRepository) {
        this.diaryEntryRepository = diaryEntryRepository;
        this.userRepository = userRepository;
    }
}
