package com.edutrack.repositories;

import com.edutrack.entities.PagoStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PagoStudentRepository extends JpaRepository<PagoStudent, Long> {

    boolean existsByStudent_IdAndPrecioInstitution_TipoAndEstadoPago(String studentId, String tipo, String estadoPago);

    boolean existsByStudentIdAndPrecioInstitution_TipoAndEstadoPago(Long studentId, String string, String string2);

}
