package org.example.demo.controller;

import org.example.demo.entity.Inventory;
import org.example.demo.repository.CheckoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/checkout")
public class CheckoutController {

    @Autowired
    private CheckoutRepository checkoutRepository;



    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/update")
    public void updInventory(@RequestBody List<Inventory> inventoryList) {
        System.out.println(" size() = " + inventoryList.size());
//        System.out.println(inventoryList);
        for (Inventory cur : inventoryList)
            System.out.println(cur);
        checkoutRepository.saveAll(inventoryList);
    }
}
