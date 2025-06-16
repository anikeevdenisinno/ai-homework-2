package com.example.jsonplaceholderapi.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_name")
    private String name;
    
    @Column(name = "user_username")
    private String username;
    
    @Column(name = "user_email")
    private String email;
    
    @Embedded
    private Address address;
    
    @Column(name = "user_phone")
    private String phone;
    
    @Column(name = "user_website")
    private String website;
    
    @Embedded
    private Company company;
} 