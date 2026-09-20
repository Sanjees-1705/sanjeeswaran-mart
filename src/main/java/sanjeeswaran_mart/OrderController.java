package com.sanjeeswaran.sanjeeswaran_mart;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    /*
        Place Order
    */
    @PostMapping
    public Order placeOrder(@RequestBody Order order) {

        return orderRepository.save(order);
    }

    /*
        Get Orders for a Buyer
    */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(
            @PathVariable Long userId) {

        List<Order> orders =
                orderRepository.findByUserId(userId);

        return ResponseEntity.ok(orders);
    }
}