package com.sanjeeswaran.sanjeeswaran_mart;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepository;

    private final String uploadDirectory = "uploads/";

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProduct(
            @RequestParam("name") String name,
            @RequestParam("price") double price,
            @RequestParam("description") String description,
            @RequestParam("stock") int stock,
            @RequestParam("image") MultipartFile image) {

        try {

            Path uploadPath = Paths.get(uploadDirectory);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileName = System.currentTimeMillis()
                    + "_" + image.getOriginalFilename();

            Path filePath = uploadPath.resolve(fileName);

            Files.write(filePath, image.getBytes());

            Product product = new Product(
                    name,
                    price,
                    description,
                    stock,
                    "/uploads/" + fileName
            );

            Product savedProduct = productRepository.save(product);

            return ResponseEntity.ok(savedProduct);

        } catch (IOException e) {

            return ResponseEntity
                    .internalServerError()
                    .body("Image upload failed.");
        }
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }
}