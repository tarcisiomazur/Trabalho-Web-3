package com.dw.gadoleiteiro.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "leitura")
public class Leitura {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column
    private double quantidade;

    public double getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(double quantidade) {
        this.quantidade = quantidade;
    }

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm")
    public Date getHora() {
        return hora;
    }

    public void setHora(Date hora) {
        this.hora = hora;
    }

    public Gado getGado() {
        return gado;
    }

    public void setGado(Gado gado) {
        this.gado = gado;
    }

    @Column
    private Date hora;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "gado_id", nullable = false)
    private Gado gado;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }



}
