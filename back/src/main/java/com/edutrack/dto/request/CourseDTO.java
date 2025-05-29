package com.edutrack.dto.request;

public record CourseDTO(
        Long id,
        String name,
        String academicArea,
        String teacher,
        String period
) {}