package com.dw.gadoleiteiro.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "leitura")
public class Leitura {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(unique = true)
    private int brinco;

    @Column
    private Date nascimento;

    @ManyToOne
    @JoinColumn(name = "gado_id")
    private Gado gado;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getBrinco() {
        return brinco;
    }

    public void setBrinco(int brinco) {
        this.brinco = brinco;
    }

    public Date getNascimento() {
        return nascimento;
    }

    public void setNascimento(Date nascimento) {
        this.nascimento = nascimento;
    }

    public Gado getGado() {
        return gado;
    }

    public void setGado(Gado gado) {
        this.gado = gado;
    }
}
