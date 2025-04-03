package com.linkbucket.service;

import com.linkbucket.dto.user.UserProfileResponse;
import com.linkbucket.model.User;
import com.linkbucket.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserProfileResponse getCurrentUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return UserProfileResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .totalBuckets(user.getBuckets() != null ? user.getBuckets().size() : 0)
                .totalPills(user.getBuckets() != null ? 
                    user.getBuckets().stream()
                        .mapToInt(bucket -> bucket.getPills() != null ? bucket.getPills().size() : 0)
                        .sum() : 0)
                .build();
    }
}