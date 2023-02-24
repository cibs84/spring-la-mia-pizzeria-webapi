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

@RestController
@CrossOrigin
@RequestMapping("/api/pizze")
public class PizzaController {
	
	@Autowired
	PizzaRepository pizzaRepository;
	
	@GetMapping
	public List<Pizza> index(@RequestParam(name = "keyword", required = false) String keyword) {
		
		List<Pizza> elencoPizze;
		
		if (keyword!=null && !keyword.isEmpty()) {
			elencoPizze = pizzaRepository.findByNameLike(keyword + "%");
		} else {
			elencoPizze = pizzaRepository.findAll(Sort.by("name"));
		}
		
		return elencoPizze;
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Pizza> show(@PathVariable("id") Long id) {
		Optional<Pizza> res = pizzaRepository.findById(id);
		if (res.isPresent()) {
			return new ResponseEntity<Pizza>(res.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<Pizza>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/create")
	public Pizza create(@RequestBody Pizza pizza) {
		return pizzaRepository.save(pizza);
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<Pizza> update(@RequestBody Pizza pizza,
			@PathVariable("id") Long id) {
		
		Optional<Pizza> pizzaFromDb = pizzaRepository.findById(id);
		
		if (pizzaFromDb.isPresent()) {
			pizzaFromDb.get().setName(pizza.getName());
	        pizzaFromDb.get().setDescription(pizza.getDescription());
	        pizzaFromDb.get().setPhoto(pizza.getPhoto());
	        pizzaFromDb.get().setPrice(pizza.getPrice());
	        pizza = pizzaRepository.save(pizzaFromDb.get());
	        
	        return new ResponseEntity<Pizza>(pizza, HttpStatus.OK);
		} else {
			return new ResponseEntity<Pizza>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("{id}")
	public String delete(@PathVariable Long id) {
		pizzaRepository.deleteById(id);
		return "Eliminazione effettuata";
	}
}
