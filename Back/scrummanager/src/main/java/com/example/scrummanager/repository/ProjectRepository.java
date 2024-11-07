package com.example.scrummanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.scrummanager.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByTitleContaining(String title);
}
