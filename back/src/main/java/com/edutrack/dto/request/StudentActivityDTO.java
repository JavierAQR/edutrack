package com.edutrack.dto.request;
import java.time.LocalDate;

public record StudentActivityDTO(
        Long id,
        String title,
        boolean completed,
        String courseName,
        String dueDate
) {}
