package server.models;

import org.springframework.data.rest.core.config.Projection;


@Projection(name = "name", types = Artist.class)
public interface ArtistNurName {

    String getName();

}
