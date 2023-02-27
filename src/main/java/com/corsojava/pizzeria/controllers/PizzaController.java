package com.corsojava.pizzeria.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.corsojava.pizzeria.models.Pizza;
import com.corsojava.pizzeria.repository.PizzaRepository;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/api/pizze")
public class PizzaController {
	
	@Autowired
	PizzaRepository pizzaRepository;
	
	@GetMapping
	public ResponseEntity<List<Pizza>> index(@RequestParam(name = "keyword", required = false) String keyword) {
		
		List<Pizza> elencoPizze;
		
		if (keyword!=null && !keyword.isEmpty()) {
			elencoPizze = pizzaRepository.findByNameLike(keyword + "%");
		} else {
			elencoPizze = pizzaRepository.findAll(Sort.by("name"));
		}
		
		if (elencoPizze.size() == 0) {
			return new ResponseEntity<List<Pizza>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Pizza>>(elencoPizze, HttpStatus.OK);
		}
	}
	
	@GetMapping("{id}")	// SHOW
	public ResponseEntity<Pizza> show(@PathVariable("id") Long id) {
		Optional<Pizza> res = pizzaRepository.findById(id);
		if (res.isPresent()) {
			return new ResponseEntity<Pizza>(res.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<Pizza>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/create")	// CREATE
	public ResponseEntity<Pizza> create(@Valid @RequestBody Pizza pizza) {
		Pizza newPizza = pizzaRepository.save(pizza);
		return new ResponseEntity<Pizza>(newPizza, HttpStatus.CREATED); 
	}
	
	@PutMapping("/update/{id}")	// UPDATE
	public ResponseEntity<Pizza> update(@Valid @RequestBody Pizza pizza,
			@PathVariable("id") Long id) {
		
		Optional<Pizza> pizzaFromDb = pizzaRepository.findById(id);
		
		if (pizzaFromDb.isPresent()) {
			pizzaFromDb.get().setName(pizza.getName());
	        pizzaFromDb.get().setDescription(pizza.getDescription());
	        pizzaFromDb.get().setPhoto(pizza.getPhoto());
	        pizzaFromDb.get().setPrice(pizza.getPrice());
	        Pizza modifiedPizza = pizzaRepository.save(pizzaFromDb.get());
	        
	        return new ResponseEntity<Pizza>(modifiedPizza, HttpStatus.OK);
		} else {
			return new ResponseEntity<Pizza>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/delete/{id}")	// DELETE
	public ResponseEntity<String> delete(@PathVariable Long id) {
		Optional<Pizza> pizzaFromDb = pizzaRepository.findById(id);
		
		if (pizzaFromDb.isPresent()) {
			pizzaRepository.deleteById(id);
			return new ResponseEntity<String>("Pizza eliminata correttamente dal database", HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<String>("La Pizza da eliminare non è presente nel database", HttpStatus.NOT_FOUND) ;
		}
	}
}
