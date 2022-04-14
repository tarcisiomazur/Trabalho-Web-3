package com.dw.gadoleiteiro.control.repository;

import com.dw.gadoleiteiro.model.Leitura;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeituraRepository extends JpaRepository<Leitura, Integer> {

}