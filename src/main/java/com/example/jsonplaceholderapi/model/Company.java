package com.example.jsonplaceholderapi.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Column;
import lombok.Data;

@Data
@Embeddable
public class Company {
    @Column(name = "company_name")
    private String name;
    
    @Column(name = "company_catch_phrase")
    private String catchPhrase;
    
    @Column(name = "company_bs")
    private String bs;
} 