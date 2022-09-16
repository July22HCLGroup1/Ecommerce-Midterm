package com.hcl.capstone.publisher;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hcl.capstone.config.MessagingConfig;
import com.hcl.capstone.dto.ProductRestockDTO;
import com.hcl.capstone.dto.ProductRestockMessage;
import com.hcl.capstone.model.Product;
import com.hcl.capstone.service.ProductService;

@Component
public class ProductRestockPublisher {

	private final RabbitTemplate rabbitTemplate;
	
	@Autowired
	private ProductService productService;

	@Autowired
	public ProductRestockPublisher(RabbitTemplate rabbitTemplate) {
		this.rabbitTemplate = rabbitTemplate;
	}

	public void produce(ProductRestockDTO productRestockDTO) throws JsonProcessingException {

		Product product = productService.getProductById(productRestockDTO.getProductId());
		
		ProductRestockMessage productRestockMessage = new ProductRestockMessage();
		productRestockMessage.setProduct(product);
		productRestockMessage.setMessage(productRestockDTO.getMessage());
		productRestockMessage.setRestockQuantity(productRestockDTO.getRestockQuantity());
		
		rabbitTemplate.setExchange(MessagingConfig.EXCHANGE);
		rabbitTemplate.convertAndSend(new ObjectMapper().writeValueAsString(productRestockMessage));
	}

}
