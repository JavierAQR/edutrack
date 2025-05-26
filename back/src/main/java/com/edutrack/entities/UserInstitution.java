package com.edutrack.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.edutrack.entities.enums.InstitutionUserStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_institution")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInstitution {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_id", nullable = false)
    private Institution institution;

    @Enumerated(EnumType.STRING)
    private InstitutionUserStatus status = InstitutionUserStatus.PENDING;

    @Column(name = "joined_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime joinedAt;
}
