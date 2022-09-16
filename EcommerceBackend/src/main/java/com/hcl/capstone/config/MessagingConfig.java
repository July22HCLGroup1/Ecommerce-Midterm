package com.hcl.capstone.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MessagingConfig {
	
	public static final String QUEUE = "goodbuy_queue";
	public static final String EXCHANGE = "goodbuy_exchange";
	public static final String ROUTING_KEY = "goodbuy_routingKey";
	
	@Bean
	public Queue queue() {
		return new Queue(QUEUE, true);
	}
	
	@Bean
	public FanoutExchange exchange() {
		return new FanoutExchange(EXCHANGE);
	}
	
	@Bean
	public Binding binding(Queue queue, FanoutExchange exchange) {
		return BindingBuilder.bind(queue).to(exchange);
		
	}
}
