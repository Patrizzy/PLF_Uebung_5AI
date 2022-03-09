package server.repositories;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import server.models.Song;
import server.models.SongOhneAudio;

import java.util.List;

@RepositoryRestResource(excerptProjection = SongOhneAudio.class)
public interface SongRepository extends PagingAndSortingRepository<Song, Long> {

    @Override
    @RestResource(exported = false)
    void delete(Song song);

    Page<Song> findByTitleContainsIgnoreCase(String title, Pageable p);

    Page<Song> findByArtistNameContainsIgnoreCase(String name, Pageable p);

}
