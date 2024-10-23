package com.example.scrummanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.scrummanager.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findByTitleContaining(String title);

    List<Ticket> findTicketsBySprintId(long sprintId);;
}
