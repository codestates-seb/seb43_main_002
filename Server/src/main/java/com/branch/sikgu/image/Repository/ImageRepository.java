package com.branch.sikgu.image.Repository;

import com.branch.sikgu.image.Entity.Image;
import com.branch.sikgu.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.Optional;

@Repository
public class ImageRepository {
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public ImageRepository(DataSource dataSource) {
        this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

    public Long addImage(Image image) {
        String sql = "INSERT INTO image (name, type) VALUES (:name, :type)";
        SqlParameterSource parameter = new MapSqlParameterSource()
                .addValue("name", image.getName())
                .addValue("type", image.getType());

        KeyHolder keyHolder = new GeneratedKeyHolder();
        namedParameterJdbcTemplate.update(sql, parameter, keyHolder);
        return keyHolder.getKey().longValue();
    }

    public Image findImageByMyPageId(Long myPageId) {
        String sql = "SELECT image_id, name, type FROM member_profile_image WHERE member_profile_id = :myPageId";
        SqlParameterSource parameter = new MapSqlParameterSource("myPageId", myPageId);

        return namedParameterJdbcTemplate.queryForObject(sql, parameter, (rs, rowNum) -> {
            Image image = new Image();
            image.setImageId(rs.getLong("image_id"));
            image.setName(rs.getString("name"));
            // Check if the type column is NULL
            if (rs.getObject("type") != null) {
                image.setType(rs.getString("type"));
            } else {
                image.setType(""); // Set an empty string or any default value you prefer
            }
            return image;
        });
    }

}
