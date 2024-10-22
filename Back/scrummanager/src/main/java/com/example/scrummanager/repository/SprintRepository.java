package com.example.scrummanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.scrummanager.model.Sprint;

public interface SprintRepository extends JpaRepository<Sprint, Long> {

    List<Sprint> findByTitleContaining(String title);
}
