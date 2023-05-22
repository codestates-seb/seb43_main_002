package com.branch.sikgu.image.Service;


import com.branch.sikgu.image.Entity.Image;
import com.branch.sikgu.image.Repository.ImageRepository;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class ImageService {
    ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Long addImage(Image image) {
        return imageRepository.addImage(image);
    }

}