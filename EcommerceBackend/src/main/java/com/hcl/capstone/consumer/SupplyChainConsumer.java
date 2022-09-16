package com.hcl.capstone.consumer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hcl.capstone.config.MessagingConfig;
import com.hcl.capstone.dto.ProductRestockMessage;
import com.hcl.capstone.model.Product;
import com.hcl.capstone.service.ProductService;

@Component
public class SupplyChainConsumer {

	private final RabbitTemplate rabbitTemplate;
	
	@Autowired
	private ProductService productService;

	@Autowired
	public SupplyChainConsumer(RabbitTemplate rabbitTemplate) {
		this.rabbitTemplate = rabbitTemplate;
	}

	private String receiveMessage() {
		String message = (String) rabbitTemplate.receiveAndConvert(MessagingConfig.QUEUE);
		return message;
	}

	public ProductRestockMessage processMessage() throws JsonMappingException, JsonProcessingException {
		String message = receiveMessage();
		
		if(message != null) {
			ProductRestockMessage productRestockMessage = new ProductRestockMessage();
			productRestockMessage = new ObjectMapper().readValue(message, ProductRestockMessage.class);
			
			Product product = productRestockMessage.getProduct();
			int restockQuantity = productRestockMessage.getRestockQuantity();
			int newQuantity = product.getProductStock() + restockQuantity;
			product.setProductStock(newQuantity);
			productService.updateProduct(product, product.getProductId());
			
			return productRestockMessage;
		} else {
			return null;
		}
	}

}
