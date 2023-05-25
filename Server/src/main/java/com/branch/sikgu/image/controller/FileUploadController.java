package com.branch.sikgu.image.controller;

import com.branch.sikgu.image.Entity.Image;
import com.branch.sikgu.image.Service.ImageService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;


@RestController
public class FileUploadController {

    ImageService imageService;
//    @Value("${myapp.img-path}")
    private String imgPath = "/static/images";

    public FileUploadController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/members/images/upload")
    public String uploadImage(@RequestPart("file") MultipartFile file) throws IOException {
        Image image = new Image(file.getOriginalFilename(), file.getContentType());
        Long file_id = imageService.addImage(image);
        String file_name = image.getName();
        File f = new File(Paths.get(imgPath,file_id + file_name).toString());
        file.transferTo(f);
        return imgPath + file_id + file_name;
    }
}
