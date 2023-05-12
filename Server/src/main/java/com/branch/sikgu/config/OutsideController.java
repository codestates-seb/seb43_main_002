package com.branch.sikgu.config;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

public class OutsideController {
    @RequestMapping(value="/static", method= RequestMethod.GET)
    public String outsideFolder() throws Exception {
        return "/static";
    }
}
