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

    @Column(name = "name")
    private String question;

    @Column(name = "content")
    private String answer;

    public Long getId() {
        return id;
    }

    public String getAnswer() {
        return answer;
    }

    public String getQuestion() {
        return question;
    }
}
