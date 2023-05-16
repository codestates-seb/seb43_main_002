package com.branch.sikgu.image.Service;


import com.branch.sikgu.image.Entity.Image;
import com.branch.sikgu.image.Repository.ImageRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class FileService {
    ImageRepository imageRepository;



    public FileService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Long addImage(Image image) {
        return imageRepository.addImage(image);
    }

    public Image getImageById(Long id) {
        return imageRepository.getImageById(id);
    }
}