package server.models;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "ohneAudio", types = Song.class)
public interface SongOhneAudio {

    String getTitle();

    String getArtist();

    String getGenre();

    String getFilename();

}
