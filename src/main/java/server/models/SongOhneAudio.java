package server.models;

import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

@Projection(name = "ohneAudio", types = Song.class)
public interface SongOhneAudio {

    long getETag();

    String getTitle();

    ArtistNurName getArtist();

    Set<String> getGenres();

    String getFilename();

}
