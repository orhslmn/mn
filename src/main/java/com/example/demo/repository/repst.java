package com.example.demo.repository;

import com.example.demo.model.Per;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface repst extends JpaRepository<Per, Long> {
    List<Per> findByAd(String ad);
}
