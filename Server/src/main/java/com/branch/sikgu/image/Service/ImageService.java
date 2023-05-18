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

    public Image getImageById(Long id) {
        return imageRepository.getImageById(id);
    }

    public void deleteImage(Long id) {
        Image image = imageRepository.getImageById(id);
        if (image != null) {
            // 데이터베이스에서 이미지 정보 삭제
            imageRepository.deleteImage(id);

            // 파일 시스템에서 이미지 파일 삭제
            String imagePath = image.getImagePath();  // 이미지 파일의 경로
            File file = new File(imagePath);
            if (file.exists()) {
                file.delete();
            }
        }
    }
}