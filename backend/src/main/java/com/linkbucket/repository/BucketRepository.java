package com.linkbucket.repository;

import com.linkbucket.model.Bucket;
import com.linkbucket.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BucketRepository extends JpaRepository<Bucket, Long> {
    List<Bucket> findByUser(User user);
    Optional<Bucket> findByIdAndUser(Long id, User user);
    Optional<Bucket> findByShareToken(String shareToken);
}