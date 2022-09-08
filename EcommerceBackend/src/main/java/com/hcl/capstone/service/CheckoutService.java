package com.hcl.capstone.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.hcl.capstone.dto.PaymentInfo;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

@Service
public class CheckoutService {
	@Value("${stripe.key.secret}")
	String secretKey;
	
	public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException{
		Stripe.apiKey = secretKey;
		
		List<String> paymentMethodTypes = new ArrayList<>();
		paymentMethodTypes.add("card");
		
		Map<String, Object> params = new HashMap<>();
		params.put("amount", paymentInfo.getAmount());
		params.put("currency", paymentInfo.getCurrency());
		params.put("payment_method_types", paymentMethodTypes);
		
		return PaymentIntent.create(params);
		
	}
	
}
