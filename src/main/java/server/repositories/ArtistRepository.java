package server.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import server.models.Artist;
import server.models.ArtistNurName;


@RepositoryRestResource
public interface ArtistRepository extends PagingAndSortingRepository<Artist, Long> {

    Page<Artist> findByNameContainsIgnoreCase(String name, Pageable p);

}
