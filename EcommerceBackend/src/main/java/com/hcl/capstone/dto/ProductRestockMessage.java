package com.hcl.capstone.dto;

import com.hcl.capstone.model.Product;

public class ProductRestockMessage {
	
	private Product product;
	private int restockQuantity;
	private String message;
	
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public int getRestockQuantity() {
		return restockQuantity;
	}
	public void setRestockQuantity(int restockQuantity) {
		this.restockQuantity = restockQuantity;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	

}
