package com.branch.sikgu.image.Repository;

import com.branch.sikgu.image.Entity.Image;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Repository
public class ImageRepository {
        private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

        public ImageRepository(DataSource dataSource) {
            this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
        }

        public Long addImage(Image image) {
            String sql = "INSERT INTO image (name, type) VALUES ( :name, :type)";
            SqlParameterSource parameter = new MapSqlParameterSource("name", image.getName())
                    .addValue("type", image.getType());

            KeyHolder keyHolder = new GeneratedKeyHolder();
            namedParameterJdbcTemplate.update(sql, parameter, keyHolder);
            return keyHolder.getKey().longValue();
        }

    public Image getImageById(Long id) {
        String sql = "SELECT id, name, type, pic_byte FROM image WHERE id = :id";
        SqlParameterSource parameter = new MapSqlParameterSource("id", id);

        return namedParameterJdbcTemplate.queryForObject(sql, parameter, (rs, rowNum) -> {
            Image image = new Image();
            image.setId(rs.getLong("id"));
            image.setName(rs.getString("name"));
            image.setType(rs.getString("type"));
            return image;
        });
    }

    public void deleteImage(Long id) {
        String sql = "DELETE FROM image WHERE id = :id";
        SqlParameterSource parameter = new MapSqlParameterSource("id", id);
        namedParameterJdbcTemplate.update(sql, parameter);
    }

}
