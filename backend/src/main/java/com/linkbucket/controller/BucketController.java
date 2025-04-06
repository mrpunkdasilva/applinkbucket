package com.linkbucket.controller;

import com.linkbucket.dto.bucket.BucketResponse;
import com.linkbucket.dto.bucket.CreateBucketRequest;
import com.linkbucket.service.BucketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buckets")
@RequiredArgsConstructor
public class BucketController {

    private final BucketService bucketService;

    @PostMapping
    public ResponseEntity<BucketResponse> createBucket(
            Authentication authentication,
            @RequestBody CreateBucketRequest request) {
        BucketResponse response = bucketService.createBucket(authentication.getName(), request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<BucketResponse>> getUserBuckets(Authentication authentication) {
        List<BucketResponse> buckets = bucketService.getUserBuckets(authentication.getName());
        return ResponseEntity.ok(buckets);
    }

    @GetMapping("/{bucketId}")
    public ResponseEntity<BucketResponse> getBucket(
            Authentication authentication,
            @PathVariable Long bucketId) {
        BucketResponse bucket = bucketService.getBucket(authentication.getName(), bucketId);
        return ResponseEntity.ok(bucket);
    }

    @DeleteMapping("/{bucketId}")
    public ResponseEntity<Void> deleteBucket(
            Authentication authentication,
            @PathVariable Long bucketId) {
        bucketService.deleteBucket(authentication.getName(), bucketId);
        return ResponseEntity.noContent().build();
    }
}