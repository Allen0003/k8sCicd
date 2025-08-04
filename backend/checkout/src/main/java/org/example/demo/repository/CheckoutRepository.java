package org.example.demo.repository;


import org.example.demo.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CheckoutRepository extends JpaRepository<Inventory, Long> {
}