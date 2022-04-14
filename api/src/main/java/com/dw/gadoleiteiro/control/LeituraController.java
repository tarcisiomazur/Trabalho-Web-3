package com.dw.gadoleiteiro.control;

import com.dw.gadoleiteiro.control.repository.GadoRepository;
import com.dw.gadoleiteiro.model.Gado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

@RestController
public class LeituraController {

    @Autowired
    private GadoRepository rep;

    @GetMapping("/gados")
    public ResponseEntity<List<Gado>> getAllGados(@RequestParam(required = false) String nome)
    {
        try
        {
            List<Gado> la = new ArrayList<Gado>();

            if (nome == null)
                rep.findAll().forEach(la::add);
            else
                rep.findByNomeContaining(nome).forEach(la::add);

            if (la.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(la, HttpStatus.OK);


        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
