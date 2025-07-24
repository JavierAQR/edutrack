package com.edutrack.controllers;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.edutrack.entities.*;
import com.edutrack.services.PagoStudentService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/pagos")
@RequiredArgsConstructor
public class PagoStudentController {
    private final PagoStudentService service;

    @PostMapping("/{studentProfileId}/{precioInstitutionId}")
    public ResponseEntity<PagoStudent> registrarPago(
            @PathVariable Long studentProfileId,
            @PathVariable Long precioInstitutionId) {
        return ResponseEntity.ok(service.registrarPago(studentProfileId, precioInstitutionId));
    }

    @GetMapping("/verificar-matricula/{studentProfileId}")
    public ResponseEntity<Boolean> verificarPagoMatricula(@PathVariable Long studentProfileId) {
        return ResponseEntity.ok(service.verificarPagoMatricula(studentProfileId));
    }

    @GetMapping("/student/{studentProfileId}")
    public ResponseEntity<List<PagoStudent>> getPagosByStudent(@PathVariable Long studentProfileId) {
        return ResponseEntity.ok(service.getPagosByStudent(studentProfileId));
    }

    @GetMapping("/precios-disponibles/{studentProfileId}")
    public ResponseEntity<List<PrecioInstitution>> getPreciosDisponibles(@PathVariable Long studentProfileId) {
        return ResponseEntity.ok(service.getPreciosByStudentProfileId(studentProfileId));
    }
}