package server.repositories;


import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import server.models.Song;
import server.models.SongOhneAudio;

@RepositoryRestResource(excerptProjection = SongOhneAudio.class)
public interface SongRepository extends PagingAndSortingRepository<Song, Long> {
}
