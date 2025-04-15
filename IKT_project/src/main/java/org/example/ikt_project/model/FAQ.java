package org.example.ikt_project.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "data")
public class FAQ {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;

    private String answer;

}
