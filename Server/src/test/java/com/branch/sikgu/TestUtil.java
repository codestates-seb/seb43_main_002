package com.branch.sikgu;

import com.fasterxml.jackson.databind.ObjectMapper;

public class TestUtil {
    public static String toJsonString(Object obj) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(obj);
    }
}
