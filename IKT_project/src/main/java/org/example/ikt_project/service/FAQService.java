package org.example.ikt_project.service;

import org.example.ikt_project.model.FAQ;

import java.util.List;

public interface FAQService {
    String getAnswer(String userQuestion);
    boolean isSimilar(String dbQuestion, String userQuestion);
    List<FAQ> getRandomFAQs();
    String askGemini(String question);
    String askGeminiWithDatabaseContext(String userQuestion);

    // Export all questions and answers as PDF
    byte[] exportAllQuestionsAndAnswers();

    // Export unanswered questions as PDF
    // byte[] exportUnansweredQuestions();
}
