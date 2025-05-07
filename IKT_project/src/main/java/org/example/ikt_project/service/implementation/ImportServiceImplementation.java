package org.example.ikt_project.service.implementation;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.example.ikt_project.model.FAQ;
import org.example.ikt_project.model.FAQUser;
import org.example.ikt_project.repository.FAQRepository;
import org.example.ikt_project.service.FAQService;
import org.example.ikt_project.service.ImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ImportServiceImplementation implements ImportService {


    @Autowired
    private FAQService faqService;

    @Override
    public String importFile(MultipartFile file) throws Exception {
        String fileName = file.getOriginalFilename();
        if (fileName == null) {
            throw new IllegalArgumentException("File name cannot be null");
        }

        String fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
        List<FAQUser> faqUsers = new ArrayList<>();

        switch (fileExtension) {
            case "csv":
            case "txt":
                faqUsers = importFAQUsersFromCsvOrTxt(file);
                break;
            case "xlsx":
            case "xls":
                faqUsers = importFAQUsersFromExcel(file);
                break;
            case "json":
                faqUsers = importFAQUsersFromJson(file);
                break;
            default:
                throw new IllegalArgumentException("Unsupported file format: " + fileExtension);
        }
        System.out.println("Imported " + faqUsers.size() + " FAQUsers");
        for (FAQUser user : faqUsers) {
            System.out.println("User: " + user.getQuestion());
        }   
        // For each imported FAQUser, get the answer using the FAQ logic
        for (FAQUser user : faqUsers) {
            user.setAnswer(faqService.getAnswer(user.getQuestion()));
            System.out.println("Answer: " + user.getAnswer());
        }

        return new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(faqUsers);
    }

    private List<FAQUser> importFAQUsersFromCsvOrTxt(MultipartFile file) throws Exception {
        List<FAQUser> faqUsers = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length >= 4) {
                    FAQUser user = new FAQUser();
                    user.setName(parts[0].trim());
                    user.setIndex(parts[1].trim());
                    user.setEmail(parts[2].trim());
                    user.setQuestion(parts[3].trim());
                    faqUsers.add(user);
                }
            }
        }
        return faqUsers;
    }

    private List<FAQUser> importFAQUsersFromExcel(MultipartFile file) throws Exception {
        List<FAQUser> faqUsers = new ArrayList<>();
        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue; // Skip header row
                Cell nameCell = row.getCell(0);
                Cell indexCell = row.getCell(1);
                Cell emailCell = row.getCell(2);
                Cell questionCell = row.getCell(3);
                if (nameCell != null && indexCell != null && emailCell != null && questionCell != null) {
                    FAQUser user = new FAQUser();
                    user.setName(nameCell.toString().trim());
                    user.setIndex(indexCell.toString().trim());
                    user.setEmail(emailCell.toString().trim());
                    user.setQuestion(questionCell.toString().trim());
                    faqUsers.add(user);
                }
            }
        }
        return faqUsers;
    }

    private List<FAQUser> importFAQUsersFromJson(MultipartFile file) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        List<Map<String, String>> jsonData = mapper.readValue(file.getInputStream(), 
            mapper.getTypeFactory().constructCollectionType(List.class, Map.class));
        List<FAQUser> faqUsers = new ArrayList<>();
        for (Map<String, String> item : jsonData) {
            FAQUser user = new FAQUser();
            user.setName(item.getOrDefault("name", ""));
            user.setIndex(item.getOrDefault("index", ""));
            user.setEmail(item.getOrDefault("email", ""));
            user.setQuestion(item.getOrDefault("question", ""));
            faqUsers.add(user);
        }
        return faqUsers;
    }
} 