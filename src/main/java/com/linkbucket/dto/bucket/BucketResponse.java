package com.linkbucket.dto.bucket;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BucketResponse {
    private Long id;
    private String name;
    private String description;
    private String shareToken;
    private int totalPills;
}