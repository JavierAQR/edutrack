package com.edutrack.services;

import com.edutrack.dto.request.*;

import java.util.List;

public interface DashboardService {
    List<StudentCourseDTO> getStudentCourses(String jwtToken);
    List<StudentActivityDTO> getStudentActivities(String jwtToken);
   /*  List<TeacherCourseDTO> getTeacherCourses(String jwtToken); */
}