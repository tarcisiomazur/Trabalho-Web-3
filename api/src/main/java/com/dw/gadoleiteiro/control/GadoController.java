package com.dw.gadoleiteiro.control;

import com.dw.gadoleiteiro.control.repository.GadoRepository;
import com.dw.gadoleiteiro.model.Gado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
public class GadoController {
    @Autowired
    private GadoRepository rep;

    /*
     * GET /api/gados/:id : listar gados dado um id
     */
    @GetMapping("/gados")
    public ResponseEntity<List<Gado>> getAllGados(@RequestParam(required = false) String nome)
    {
        try
        {
            List<Gado> ga = new ArrayList<Gado>();

            if (nome == null)
                rep.findAll().forEach(ga::add);
            else
                rep.findByNomeContaining(nome).forEach(ga::add);

            if (ga.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(ga, HttpStatus.OK);


        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * POST /api/gados : criar gado
     */
    @PostMapping("/gados")
    public ResponseEntity<Gado> createGado(@RequestBody Gado g)
    {
        try {
            Gado ga = rep.save(g);

            return new ResponseEntity<>(g, HttpStatus.CREATED);

        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * PUT /api/gados/:id : atualizar gado dado um id
     */
    @PutMapping("/gados/{id}")
    public ResponseEntity<Gado> updateGado(@PathVariable("id") int id, @RequestBody Gado g)
    {
        Optional<Gado> data = rep.findById(id);

        if (data.isPresent())
        {
            Gado ga = data.get();
            ga.setBrinco(g.getBrinco());
            ga.setNascimento(g.getNascimento());
            ga.setNome(g.getNome());

            return new ResponseEntity<>(rep.save(ga), HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

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
