package com.dw.gadoleiteiro.control.repository;

import com.dw.gadoleiteiro.model.Gado;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GadoRepository extends JpaRepository<Gado, Integer> {

    List<Gado> findByNomeContaining(String nome);

}