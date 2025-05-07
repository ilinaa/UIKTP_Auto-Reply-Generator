package org.example.ikt_project.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImportService {
    String importFile(MultipartFile file) throws Exception;
} 