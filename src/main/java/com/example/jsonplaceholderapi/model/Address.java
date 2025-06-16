package com.example.jsonplaceholderapi.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.Column;
import lombok.Data;

@Data
@Embeddable
public class Address {
    @Column(name = "address_street")
    private String street;
    
    @Column(name = "address_suite")
    private String suite;
    
    @Column(name = "address_city")
    private String city;
    
    @Column(name = "address_zipcode")
    private String zipcode;
    
    @Embedded
    private Geo geo;
} 