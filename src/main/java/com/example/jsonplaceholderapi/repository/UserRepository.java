package com.example.jsonplaceholderapi.repository;

import com.example.jsonplaceholderapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
} 