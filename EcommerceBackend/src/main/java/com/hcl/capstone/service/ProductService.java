package com.hcl.capstone.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hcl.capstone.model.Product;
import com.hcl.capstone.repository.ProductRepository;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	public Product saveProduct(Product product) {
		return productRepository.save(product);
	}
	
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}
	
	public Product getProductById(long id) {
		return productRepository.findById(id);
	}
	
	public void deleteProductById(long id) {
		productRepository.deleteById(id);
	}
	
	public Product updateProduct(Product product, long id) {
		Optional<Product> productRepo = Optional.ofNullable(productRepository.findById(id));
		
		if(!productRepo.isPresent()) {
			return null;
		}
		
		product.setProductId(id);
		productRepository.save(product);
		
		return productRepository.findById(id);
	}
	
	public List<Product> searchProducts(String searchStr, int index, int count) {
		Pageable pageable = PageRequest.of(index, count);
		// Returns top <count> results starting from <index>
		return productRepository.findAllByProductNameContaining(searchStr,pageable);
	}
	
	public List<Product> searchProducts(String searchStr) {
		return productRepository.findAllByProductNameContaining(searchStr);
	}

}
