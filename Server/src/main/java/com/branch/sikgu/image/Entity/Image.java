package com.branch.sikgu.image.Entity;

import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.myPage.entity.MyPage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Random;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "MEMBER_PROFILE_IMAGE")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IMAGE_ID")
    private Long imageId;

    @Column(name = "original_file_name", nullable = true)
    private String originalFileName;

    @Column(name = "name", nullable = true)
    private String name;

    @Column(name = "type", nullable = true)
    private String type;

    public Image(String name, String type) {
        // 이미지 ID를 포함한 이름 생성
        this.name = this.imageId + name;
        this.type = type;
    }

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "MEMBER_PROFILE_ID")
    private MyPage myPage;


    @PrePersist
    private void generateRandomImageName() {
        Random random = new Random();
        int randomNum = random.nextInt(9) + 1; // 1부터 9까지의 숫자 중 랜덤 선택
        this.name = randomNum + ".jpg";
    }

}