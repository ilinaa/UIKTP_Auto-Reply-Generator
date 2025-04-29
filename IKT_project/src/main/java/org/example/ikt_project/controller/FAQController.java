package org.example.ikt_project.controller;

import org.example.ikt_project.model.FAQ;
import org.example.ikt_project.service.FAQService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/faq")
@CrossOrigin(origins = "*") // Allow calls from your React frontend
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
}
