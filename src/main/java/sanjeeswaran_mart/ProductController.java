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

    /*
        Add Product
    */
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

            Product savedProduct =
                    productRepository.save(product);

            return ResponseEntity.ok(savedProduct);

        } catch (IOException e) {

            return ResponseEntity
                    .internalServerError()
                    .body("Image upload failed.");
        }
    }


    /*
        Get All Products
    */
    @GetMapping
    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }


    /*
        Get Single Product
    */
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(
            @PathVariable Long id) {

        return productRepository
                .findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    /*
        Update Product
    */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("price") double price,
            @RequestParam("description") String description,
            @RequestParam("stock") int stock,
            @RequestParam(
                    value = "image",
                    required = false
            ) MultipartFile image) {

        try {

            Product product =
                    productRepository
                            .findById(id)
                            .orElse(null);

            if (product == null) {

                return ResponseEntity
                        .notFound()
                        .build();
            }


            // Update product details

            product.setName(name);

            product.setPrice(price);

            product.setDescription(description);

            product.setStock(stock);


            /*
                Update image only if
                seller selects a new image
            */

            if (image != null && !image.isEmpty()) {

                Path uploadPath =
                        Paths.get(uploadDirectory);

                if (!Files.exists(uploadPath)) {

                    Files.createDirectories(uploadPath);
                }

                String fileName =
                        System.currentTimeMillis()
                        + "_"
                        + image.getOriginalFilename();

                Path filePath =
                        uploadPath.resolve(fileName);

                Files.write(
                        filePath,
                        image.getBytes()
                );

                product.setImagePath(
                        "/uploads/" + fileName
                );
            }


            Product updatedProduct =
                    productRepository.save(product);

            return ResponseEntity.ok(
                    updatedProduct
            );

        } catch (IOException e) {

            return ResponseEntity
                    .internalServerError()
                    .body("Image update failed.");
        }
    }


    /*
        Delete Product
    */
    @DeleteMapping("/{id}")
    public void deleteProduct(
            @PathVariable Long id) {

        productRepository.deleteById(id);
    }
}