package com.linkbucket.service;

import com.linkbucket.dto.bucket.BucketResponse;
import com.linkbucket.dto.bucket.CreateBucketRequest;
import com.linkbucket.model.Bucket;
import com.linkbucket.model.User;
import com.linkbucket.repository.BucketRepository;
import com.linkbucket.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BucketService {
    private final BucketRepository bucketRepository;
    private final UserRepository userRepository;

    public BucketResponse createBucket(String userEmail, CreateBucketRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Bucket bucket = Bucket.builder()
                .name(request.getName())
                .description(request.getDescription())
                .shareToken(generateShareToken())
                .user(user)
                .build();

        bucket = bucketRepository.save(bucket);
        return convertToResponse(bucket);
    }

    public List<BucketResponse> getUserBuckets(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return bucketRepository.findByUser(user).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public BucketResponse getBucket(String userEmail, Long bucketId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Bucket bucket = bucketRepository.findByIdAndUser(bucketId, user)
                .orElseThrow(() -> new RuntimeException("Bucket not found"));

        return convertToResponse(bucket);
    }

    public void deleteBucket(String userEmail, Long bucketId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Bucket bucket = bucketRepository.findByIdAndUser(bucketId, user)
                .orElseThrow(() -> new RuntimeException("Bucket not found"));

        bucketRepository.delete(bucket);
    }

    private String generateShareToken() {
        return UUID.randomUUID().toString();
    }

    private BucketResponse convertToResponse(Bucket bucket) {
        return BucketResponse.builder()
                .id(bucket.getId())
                .name(bucket.getName())
                .description(bucket.getDescription())
                .shareToken(bucket.getShareToken())
                .totalPills(bucket.getPills() != null ? bucket.getPills().size() : 0)
                .build();
    }
}