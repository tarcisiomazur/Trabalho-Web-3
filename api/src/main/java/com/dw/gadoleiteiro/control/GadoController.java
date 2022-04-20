package com.dw.gadoleiteiro.control;

import com.dw.gadoleiteiro.control.repository.GadoRepository;
import com.dw.gadoleiteiro.model.Gado;
import com.dw.gadoleiteiro.model.Leitura;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
public class GadoController {
    @Autowired
    private GadoRepository rep;

    /*
     * GET /api/gados?nome= : listar gados ou por nome
     */
    @GetMapping("/gados")
    public ResponseEntity<List<Gado>> getAllGados(@RequestParam(required = false) String nome)
    {
        try
        {
            List<Gado> ga = new ArrayList<Gado>();

            if (nome == null)
                rep.findAll().forEach(ga::add);
            else {
                ga = rep.findByNomeContaining(nome);

            }
            if (ga.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(ga, HttpStatus.OK);


        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    /*
     * GET /api/gados/:id : retorna o gado dado um id
     */
    @GetMapping("/gados/{id}")
    public ResponseEntity<Gado> getGado(@PathVariable("id") int id)
    {
        try
        {
            Optional<Gado> ga = rep.findById(id);
            if (!ga.isPresent())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(ga.get(), HttpStatus.OK);


        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * POST /api/gados : criar gado
     */
    @PostMapping("/gados")
    public ResponseEntity<Object> createGado(@RequestBody Gado g)
    {
        try {
            Gado ga = rep.save(g);

            return new ResponseEntity<>(ga, HttpStatus.CREATED);

        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * PUT /api/gados/:id : atualizar gado dado um id
     */
    @PutMapping("/gados/{id}")
    public ResponseEntity<Gado> updateGado(@PathVariable("id") int id, @RequestBody Gado g) {
        try {
            Optional<Gado> data = rep.findById(id);

            if (data.isPresent()) {
                Gado ga = data.get();
                ga.setBrinco(g.getBrinco());
                ga.setNascimento(g.getNascimento());
                ga.setNome(g.getNome());

                return new ResponseEntity<>(rep.save(ga), HttpStatus.OK);
            } else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
     * DEL /api/gados/:id : remover gado dado um id
     */
    @DeleteMapping("/gados/{id}")
    public ResponseEntity<HttpStatus> deleteGado(@PathVariable("id") int id)
    {
        try {
            rep.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
