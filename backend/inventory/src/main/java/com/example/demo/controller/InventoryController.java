package com.example.demo.controller;

import com.example.demo.entity.Inventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.repository.InventoryRepository;

import java.util.List;


@RestController
@RequestMapping("/item")
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;

    // 建立新商品
    @GetMapping("/init")
    public void createUser() {
        Inventory item1 = new Inventory("silver", "ABC",
                "Book", 12, "special books", 0);
        Inventory item2 = new Inventory("white", "DEF",
                "Chair", 40, "magic chairs", 0);
        Inventory item3 = new Inventory("orange", "123",
                "Ball", 79, "lamalo balls", 0);

        inventoryRepository.save(item1);
        inventoryRepository.save(item2);
        inventoryRepository.save(item3);
    }

    // 建立新商品
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/list")
    public List<Inventory> getInventoryList() {
        return inventoryRepository.findAll();
    }


}