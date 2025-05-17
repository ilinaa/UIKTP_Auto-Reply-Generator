package org.example.ikt_project.service.implementation;

import org.example.ikt_project.model.FAQ;
import org.example.ikt_project.repository.FAQRepository;
import org.example.ikt_project.service.FAQService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.ByteArrayOutputStream;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfWriter;

@Service
public class FAQServiceImplementation implements FAQService {

    private final FAQRepository faqRepository;
    private final WebClient webClient;

    public FAQServiceImplementation(FAQRepository faqRepository) {
        this.faqRepository = faqRepository;
        this.webClient = WebClient.builder()
                .baseUrl(API_URL)
                .build();
    }

    @Value("${gemini.api.key}")
    private String apiKey;

    // private static final String API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
    // I couldn't use the old API_URL so I created mine, I think it can be changed to the old one
    private static final String API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    @Override
    public String getAnswer(String userQuestion) {
        // The question is send together with the questions in the database and then together are send on the API_URL
        // where the answer is sent back using the FAQ from DB and returned back to the frontend.
        return askGeminiWithDatabaseContext(userQuestion);
    }

    @Override
    public boolean isSimilar(String dbQuestion, String userQuestion) {
        if (dbQuestion == null || userQuestion == null) return false;
        dbQuestion = dbQuestion.trim().toLowerCase();
        userQuestion = userQuestion.trim().toLowerCase();
        return userQuestion.contains(dbQuestion) || dbQuestion.contains(userQuestion);
    }

    @Override
    public List<FAQ> getRandomFAQs() {
        List<FAQ> allFaqs = faqRepository.findAll();
        Collections.shuffle(allFaqs);
        return allFaqs.stream()
                .limit(5)
                .toList();
    }

    //gemini finds the answer from browser
    @Override
    public String askGemini(String question) {
        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of(
                                "parts", List.of(
                                        Map.of("text", question)
                                )
                        )
                )
        );

        Mono<Map> response = webClient.post()
                .uri(uriBuilder -> uriBuilder.queryParam("key", apiKey).build())
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class);

        Map responseMap = response.block();
        if (responseMap != null && responseMap.containsKey("candidates")) {
            List candidates = (List) responseMap.get("candidates");
            if (!candidates.isEmpty()) {
                Map candidate = (Map) candidates.get(0);
                Map content = (Map) candidate.get("content");
                List parts = (List) content.get("parts");
                if (!parts.isEmpty()) {
                    Map part = (Map) parts.get(0);
                    return (String) part.get("text");
                }
            }
        }
        return "Извинете, моментално немам одговор на вашето прашање.";
    }


    // gemini finds the answer
    @Override
    public String askGeminiWithDatabaseContext(String userQuestion) {
        List<FAQ> faqs = faqRepository.findAll();

        StringBuilder contextBuilder = new StringBuilder();
        contextBuilder.append("Here are some FAQs from the database:\n");
        int count = 0;
        for (FAQ faq : faqs) {
            contextBuilder.append((count + 1))
                    .append(". ")
                    .append(faq.getQuestion())
                    .append(" - Answer: ")
                    .append(faq.getAnswer())
                    .append("\n");
            count++;
        }

        contextBuilder.append("\nBased on these FAQs, answer this question: ")
                .append(userQuestion);

        String finalPrompt = contextBuilder.toString();

        // Then send `finalPrompt` to Gemini instead of just `userQuestion`
        return askGemini(finalPrompt);
    }

    @Override
    public byte[] exportAllQuestionsAndAnswers() {
        List<FAQ> faqs = faqRepository.findAll();
        return generatePdf(faqs, "All Questions and Answers");
    }

    private byte[] generatePdf(List<FAQ> faqs, String title) {
        try {
            if (faqs == null || faqs.isEmpty()) {
                System.err.println("No FAQs found to export");
                return new byte[0];
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, baos);
            document.open();

            // Load Unicode font from resources
            String fontResourcePath = getClass().getClassLoader().getResource("fonts/DejaVuSans.ttf").toString();
            BaseFont baseFont = BaseFont.createFont(fontResourcePath, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            Font font = new Font(baseFont, 14);

            // Add title
            Paragraph titleParagraph = new Paragraph(title, font);
            titleParagraph.setAlignment(Paragraph.ALIGN_CENTER);
            document.add(titleParagraph);
            document.add(new Paragraph("\n", font));

            // Add content
            for (FAQ faq : faqs) {
                String question = faq.getQuestion() != null ? faq.getQuestion() : "No question";
                String answer = faq.getAnswer() != null ? faq.getAnswer() : "Not answered yet";

                Paragraph questionParagraph = new Paragraph("Question: " + question, font);
                Paragraph answerParagraph = new Paragraph("Answer: " + answer, font);

                document.add(questionParagraph);
                document.add(answerParagraph);
                document.add(new Paragraph("\n", font));
            }

            document.close();
            return baos.toByteArray();
        } catch (Exception e) {
            System.err.println("Error generating PDF: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to generate PDF: " + e.getMessage());
        }
    }
}
