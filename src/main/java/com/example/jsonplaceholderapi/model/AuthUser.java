package com.example.jsonplaceholderapi.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "auth_users")
public class AuthUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "auth_name")
    private String name;
    
    @Column(name = "auth_email", unique = true)
    private String email;
    
    @Column(name = "auth_password_hash")
    private String passwordHash;
} 