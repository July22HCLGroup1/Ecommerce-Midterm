package com.hcl.capstone.dto;

public class ProductRestockDTO {
	
	private long productId;
	private int restockQuantity;
	private String message;

	public long getProductId() {
		return productId;
	}

	public void setProductId(long productId) {
		this.productId = productId;
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
