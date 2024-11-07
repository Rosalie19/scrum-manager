package com.example.scrummanager.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.scrummanager.model.Sprint;
import com.example.scrummanager.model.Ticket;
import com.example.scrummanager.repository.SprintRepository;


@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/sprints")
public class SprintController {

    @Autowired
    SprintRepository sprintRepository;

    @GetMapping
    public ResponseEntity<List<Sprint>> getAllSprints(@RequestParam(required = false) String title) {
        
        try {
            List<Sprint> sprints = new ArrayList<Sprint>();

            if (title == null)
                sprints.addAll(sprintRepository.findAll());
            else
                sprints.addAll(sprintRepository.findByTitleContaining(title));

            if (sprints.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(sprints, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sprint> getSprintById(@PathVariable("id") long id) {
        Optional<Sprint> sprintData = sprintRepository.findById(id);

        if (sprintData.isPresent()) {
            return new ResponseEntity<>(sprintData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Sprint> createSprint(@RequestBody Sprint sprint) {
        try {
            Sprint _sprint = sprintRepository
                    .save(sprint);
            return new ResponseEntity<>(_sprint, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/{id}/tickets")
    public ResponseEntity<Sprint> addTicketToSprint(@PathVariable("id") long id, @RequestBody Ticket ticket) {
        Optional<Sprint> sprintData = sprintRepository.findById(id);

        if (sprintData.isPresent()) {
            Sprint _sprint = sprintData.get();
            _sprint.getTickets().add(ticket);
            sprintRepository.save(_sprint);
            return new ResponseEntity<>(_sprint, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

    @PutMapping("/{id}")
    public ResponseEntity<Sprint> updateSprint(@PathVariable("id") long id, @RequestBody Sprint sprint) {
        Optional<Sprint> sprintData = sprintRepository.findById(id);
        if (sprintData.isPresent()) {
            Sprint _sprint = sprintData.get();
            _sprint.setTitle(sprint.getTitle());
            _sprint.setBacklog(sprint.getBacklog());
            _sprint.setStarted(sprint.getStarted());
            _sprint.setTickets(sprint.getTickets());
            _sprint.setProject(sprint.getProject());
            return new ResponseEntity<>(sprintRepository.save(_sprint), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteSprint(@PathVariable("id") long id) {
        try {
            sprintRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> deleteAllSprints() {
        try {
            sprintRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}