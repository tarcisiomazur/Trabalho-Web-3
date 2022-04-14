package com.dw.gadoleiteiro.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "leitura")
public class Leitura {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private double quantidade;

    public double getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(double quantidade) {
        this.quantidade = quantidade;
    }

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

    @ManyToOne()
    @JoinColumn(name = "gado_id", nullable = false)
    private Gado gado;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }



}
