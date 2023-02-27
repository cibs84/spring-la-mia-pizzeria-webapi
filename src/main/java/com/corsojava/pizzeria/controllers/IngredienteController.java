package com.corsojava.pizzeria.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.corsojava.pizzeria.models.Ingrediente;
import com.corsojava.pizzeria.repository.IngredienteRepository;

@RestController
@CrossOrigin
@RequestMapping("/api/ingredienti")
public class IngredienteController {
	
	@Autowired
	IngredienteRepository ingredienteRepository;
	
	@GetMapping
	public ResponseEntity<List<Ingrediente>> index() {
		
		List<Ingrediente> elencoIngredienti;
		
		elencoIngredienti = ingredienteRepository.findAll(Sort.by("name"));
		
		if (elencoIngredienti.size() == 0) {
			return new ResponseEntity<List<Ingrediente>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Ingrediente>>(elencoIngredienti, HttpStatus.OK);
		}
	}
}
