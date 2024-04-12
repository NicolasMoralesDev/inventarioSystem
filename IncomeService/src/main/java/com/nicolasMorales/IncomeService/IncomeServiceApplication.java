package com.nicolasMorales.IncomeService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class IncomeServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(IncomeServiceApplication.class, args);
	}

}
