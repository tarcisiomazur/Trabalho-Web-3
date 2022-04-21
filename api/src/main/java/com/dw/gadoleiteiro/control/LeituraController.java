package com.dw.gadoleiteiro.control;

import com.dw.gadoleiteiro.control.repository.LeituraRepository;
import com.dw.gadoleiteiro.model.Gado;
import com.dw.gadoleiteiro.model.Leitura;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
public class LeituraController {
    @Autowired
    private LeituraRepository rep;

    /*
     * GET /api/leituras : listar leituras
     */
    @GetMapping("/leituras")
    public ResponseEntity<List<Leitura>> getAllLeituras(@RequestParam(required = true) int gado_id)
    {
        try
        {
            List<Leitura> le = new ArrayList<Leitura>();
            rep.findByGado_id(gado_id).forEach(le::add);

            if (le.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(le, HttpStatus.OK);


        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    /*
     * GET /api/leituras/:id : retorna a leitura dado um id
     */
    @GetMapping("/leituras/{id}")
    public ResponseEntity<Leitura> getLeitura(@PathVariable("id") int id)
    {
        try
        {
            Optional<Leitura> la = rep.findById(id);
            if (!la.isPresent())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(la.get(), HttpStatus.OK);


        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * POST /api/leituras : criar Leitura
     */
    @PostMapping("/leituras")
    public ResponseEntity<Leitura> createLeitura(@RequestBody Leitura l)
    {
        try {
            Leitura le = rep.save(l);

            return new ResponseEntity<>(l, HttpStatus.CREATED);

        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * PUT /api/leituras/:id : atualizar leitura dado um id
     */
    @PutMapping("/leituras/{id}")
    public ResponseEntity<Leitura> updateLeitura(@PathVariable("id") int id, @RequestBody Leitura l)
    {
        Optional<Leitura> data = rep.findById(id);

        if (data.isPresent())
        {
            Leitura le = data.get();
            le.setHora(l.getHora());
            le.setQuantidade(l.getQuantidade());

            return new ResponseEntity<>(rep.save(le), HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    /*
     * DEL /api/leituras/:id : remover leitura dado um id
     */
    @DeleteMapping("/leituras/{id}")
    public ResponseEntity<HttpStatus> deleteLeitura(@PathVariable("id") int id)
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
