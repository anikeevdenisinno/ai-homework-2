package com.example.jsonplaceholderapi.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Column;
import lombok.Data;

@Data
@Embeddable
public class Geo {
    @Column(name = "geo_lat")
    private String lat;
    
    @Column(name = "geo_lng")
    private String lng;
} 