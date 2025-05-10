package org.example.ikt_project.controller;

import org.example.ikt_project.model.FAQ;
import org.example.ikt_project.service.FAQService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/faq")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"}, allowCredentials = "true")
public class FAQController {

    private final FAQService faqService;

    @Autowired
    public FAQController(FAQService faqService) {
        this.faqService = faqService;
    }

    //Endpoint: POST /api/faq/ask
    @PostMapping("/ask")
    public Map<String, String> askQuestion(@RequestBody Map<String, String> request) {
        return Map.of("answer", faqService.getAnswer(request.get("question")));
    }

    //Endpoint: GET /api/faq/random
    @GetMapping("/random")
    public List<FAQ> getRandomFAQs() {
        return faqService.getRandomFAQs();
    }

    // Endpoint: GET /api/export/all
    @GetMapping("/export/all")
    public ResponseEntity<?> exportAllQuestionsAndAnswers() {
        try {
            byte[] pdfBytes = faqService.exportAllQuestionsAndAnswers();
            if (pdfBytes.length == 0) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No questions and answers found to export");
            }
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "all_questions_answers.pdf");
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error generating PDF: " + e.getMessage());
        }
    }

    // Endpoint: GET /api/export/unanswered
    // @GetMapping("/export/unanswered")
    // public ResponseEntity<byte[]> exportUnansweredQuestions() {
    //     byte[] pdfBytes = faqService.exportUnansweredQuestions();
    //     HttpHeaders headers = new HttpHeaders();
    //     headers.setContentType(MediaType.APPLICATION_PDF);
    //     headers.setContentDispositionFormData("attachment", "unanswered_questions.pdf");
    //     return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    // }
}
