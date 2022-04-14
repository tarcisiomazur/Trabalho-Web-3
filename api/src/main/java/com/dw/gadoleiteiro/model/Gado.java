package com.dw.gadoleiteiro.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "gado")
public class Gado {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(unique = true)
    private int brinco;

    @Column
    private String nome;

    @Column
    private Date nascimento;

    @OneToMany(mappedBy = "gado")
    private List<Leitura> leituras;

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

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Date getNascimento() {
        return nascimento;
    }

    public void setNascimento(Date nascimento) {
        this.nascimento = nascimento;
    }

    public List<Leitura> getLeituras() {
        return leituras;
    }

    public void setLeituras(List<Leitura> leituras) {
        this.leituras = leituras;
    }


}
