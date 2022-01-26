package server.models;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "nurAudio", types = Song.class)
public interface SongNurAudio {

    String getAudio();

}
