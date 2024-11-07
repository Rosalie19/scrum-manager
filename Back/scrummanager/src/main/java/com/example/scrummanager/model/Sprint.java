package com.example.scrummanager.model;


import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue; // for Spring Boot 3
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "sprints")
public class Sprint {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "started")
    private boolean  started;

    @OneToMany (fetch = FetchType.LAZY)
    @JoinColumn(name = "sprint_id")
    private List<Ticket> tickets;

    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private Project project;
    
    @Column(name = "is_backlog")
    private boolean isBacklog;

    public Sprint() {
    }

    public Sprint(String title) {
    this.title = title;
    this.tickets = new ArrayList<>(); // initialize as an empty list
}

    public Sprint(String title, List<Ticket> tickets, Boolean started, Project project , Boolean backlog) {
        this.title = title;
        this.project = project;
        this.tickets = (tickets != null) ? tickets : new ArrayList<>();
        this.started = started; 
        this.isBacklog = backlog;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    public boolean getStarted() {
        return started;
    }

    public void setStarted(boolean start) {
        this.started = start;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public boolean getBacklog() {
        return isBacklog;
    }

    public void setBacklog(boolean backlog) {
        this.isBacklog = backlog;
    }
}
