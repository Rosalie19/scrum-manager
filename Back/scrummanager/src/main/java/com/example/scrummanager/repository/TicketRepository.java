package com.example.scrummanager.repository;

import com.example.scrummanager.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findByTitleContaining(String title);
}
