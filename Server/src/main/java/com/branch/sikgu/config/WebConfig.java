package com.branch.sikgu.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        addResourceHandler : 스프링부트에서 확인할 폴더 위치 설정 (img 폴더 밑에 아무거나 다 들어갈 수 있다)
//        addResourceLocations : 실제 시스템의 폴더 위치, 윈도우 시스템의 경우 'file:///경로' 형태로 사용

        registry.addResourceHandler("/static/**").addResourceLocations("file:///C:\\Users\\SYJ\\Desktop\\seb43_main_002\\Server\\src\\main\\resources\\static\\");
    }
}
