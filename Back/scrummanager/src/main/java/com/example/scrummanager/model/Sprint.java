package com.example.scrummanager.model;


import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue; // for Spring Boot 3
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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

    @OneToMany (fetch = FetchType.LAZY)
    @JoinColumn(name = "sprint_id")
    private List<Ticket> tickets;

    public Sprint() {
    }

    public Sprint(String title) {
    this.title = title;
    this.tickets = new ArrayList<>(); // initialize as an empty list
}

    public Sprint(String title, List<Ticket> tickets) {
        this.title = title;
        this.tickets = (tickets != null) ? tickets : new ArrayList<>();;
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

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }
}
