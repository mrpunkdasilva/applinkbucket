package com.linkbucket.controller;

import com.linkbucket.dto.user.UserProfileResponse;
import com.linkbucket.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponse> getCurrentUserProfile(Authentication authentication) {
        if (authentication == null) {
            logger.error("Authentication object is null");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        String email = authentication.getName();
        logger.debug("Requesting profile for user: {}", email);
        
        UserProfileResponse profile = userService.getCurrentUserProfile(email);
        return ResponseEntity.ok(profile);
    }
}
