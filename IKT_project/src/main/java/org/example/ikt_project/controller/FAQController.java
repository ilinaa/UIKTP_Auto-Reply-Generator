package org.example.ikt_project.controller;

import org.example.ikt_project.model.FAQ;
import org.example.ikt_project.service.FAQService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faq")
@CrossOrigin(origins = "*") // Allow calls from your React frontend
public class FAQController {

    private final FAQService faqService;

    @Autowired
    public FAQController(FAQService faqService) {
        this.faqService = faqService;
    }

    // ✅ Endpoint: POST /api/faq/ask
    @PostMapping("/ask")
    public String askQuestion(@RequestBody String question) {
        return faqService.getAnswer(question);
    }

    // ✅ Endpoint: GET /api/faq/random
    @GetMapping("/random")
    public List<FAQ> getRandomFAQs() {
        return faqService.getRandomFAQs();
    }
}
