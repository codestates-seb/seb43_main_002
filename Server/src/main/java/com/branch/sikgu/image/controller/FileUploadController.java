package com.branch.sikgu.image.controller;

import com.branch.sikgu.image.Entity.Image;
import com.branch.sikgu.image.Service.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;


@RestController
public class FileUploadController {

    FileService fileService;

//    @Value("${myapp.img-path}")
    private String imgPath;


    private String staticPath = "/static/";

    public FileUploadController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/members/images/upload")
    public String uploadImage(@RequestPart("file") MultipartFile file) throws IOException {
        Image image = new Image(file.getOriginalFilename(), file.getContentType());
        Long file_id = fileService.addImage(image);
        String file_name = image.getName();
        String file_type = image.getType();
        File f = new File(Paths.get(imgPath,file_id + file_name).toString());
        String newPath = "\\profile\\";
        file.transferTo(f);
        return staticPath + file_id + file_name;
    }

}
