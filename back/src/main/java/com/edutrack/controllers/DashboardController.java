package com.edutrack.controllers;

import com.edutrack.dto.request.StudentActivityDTO;
import com.edutrack.dto.request.StudentCourseDTO;
import com.edutrack.dto.request.TeacherCourseDTO;
import com.edutrack.services.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/student/courses")
    public ResponseEntity<List<StudentCourseDTO>> getStudentCourses(@RequestHeader("Authorization") String token) {
        try {
            String jwtToken = token.substring(7); // Remove "Bearer " prefix
            List<StudentCourseDTO> courses = dashboardService.getStudentCourses(jwtToken);
            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/student/activities")
    public ResponseEntity<List<StudentActivityDTO>> getStudentActivities(@RequestHeader("Authorization") String token) {
        try {
            String jwtToken = token.substring(7); // Remove "Bearer " prefix
            List<StudentActivityDTO> activities = dashboardService.getStudentActivities(jwtToken);
            return ResponseEntity.ok(activities);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/teacher/courses")
    public ResponseEntity<List<TeacherCourseDTO>> getTeacherCourses(@RequestHeader("Authorization") String token) {
        try {
            String jwtToken = token.substring(7); // Remove "Bearer " prefix
            List<TeacherCourseDTO> courses = dashboardService.getTeacherCourses(jwtToken);
            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}