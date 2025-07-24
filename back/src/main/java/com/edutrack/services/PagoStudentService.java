package com.edutrack.services;

import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;
import com.edutrack.entities.*;
import com.edutrack.repositories.*;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PagoStudentService {
    private final PagoStudentRepository pagoRepo;
    private final PrecioInstitutionRepository precioRepo;
    private final StudentProfileService studentProfileService;

    public PagoStudent registrarPago(Long studentProfileId, Long precioInstitutionId) {
        StudentProfile student = studentProfileService.getStudentProfileById(studentProfileId);
        PrecioInstitution precio = precioRepo.findById(precioInstitutionId)
                .orElseThrow(() -> new RuntimeException("Precio no encontrado"));

        if (!student.getUser().getInstitution().getId().equals(precio.getInstitution().getId())) {
            throw new IllegalArgumentException("El precio no corresponde a la institución del estudiante");
        }

        PagoStudent pago = new PagoStudent();
        pago.setStudent(student);
        pago.setPrecioInstitution(precio);
        pago.setFechaPago(LocalDate.now());
        pago.setEstadoPago("pendiente");
        return pagoRepo.save(pago);
    }

    public boolean verificarPagoMatricula(Long studentProfileId) {
        return pagoRepo.existsByStudentIdAndPrecioInstitution_TipoAndEstadoPago(
                studentProfileId, "matricula", "pagado");
    }

    public List<PagoStudent> getPagosByStudent(Long studentProfileId) {
        return pagoRepo.findByStudentId(studentProfileId);
    }

    public List<PrecioInstitution> getPreciosByStudentProfileId(Long studentProfileId) {
        Institution institution = studentProfileService.getInstitutionByStudentProfileId(studentProfileId);
        return precioRepo.findByInstitutionId(institution.getId());
    }
}