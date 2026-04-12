package com.nijro.travel.repository;

import com.nijro.travel.entity.SocialFeedPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SocialFeedPhotoRepository extends JpaRepository<SocialFeedPhoto, Long> {
    List<SocialFeedPhoto> findAllByOrderByCreatedAtDesc();
}

