package com.hcl.capstone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.hcl.capstone.consumer.SupplyChainConsumer;
import com.hcl.capstone.dto.ProductRestockDTO;
import com.hcl.capstone.dto.ProductRestockMessage;
import com.hcl.capstone.publisher.ProductRestockPublisher;

@RestController
public class RestockController {

	@Autowired
	private ProductRestockPublisher productRestockPublisher;
	
	@Autowired
	private SupplyChainConsumer supplyChainConsumer;
	
	@PostMapping(value = "/api/request-restock")
	public ResponseEntity<?> requestRestock(@RequestBody ProductRestockDTO productRestockDTO) throws JsonProcessingException {
		productRestockPublisher.produce(productRestockDTO);
		return new ResponseEntity<ProductRestockDTO>(HttpStatus.CREATED);
	}
	
	@GetMapping(value = "/api/process-restock")
	public ResponseEntity<?> processRestock() throws JsonMappingException, JsonProcessingException {
		ProductRestockMessage productRestockMessage = supplyChainConsumer.processMessage();
		if(productRestockMessage != null) {
			String response = "Successfully restock item: " + productRestockMessage.getProduct().getProductName() + " for " + productRestockMessage.getRestockQuantity() + " item(s). Current stock: " + productRestockMessage.getProduct().getProductStock(); 
			return new ResponseEntity<String>(response, HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("No message in queue", HttpStatus.OK);
		}
	}
}
