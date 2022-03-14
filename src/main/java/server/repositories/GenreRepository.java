package server.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import server.models.Genre;


@RepositoryRestResource
public interface GenreRepository extends PagingAndSortingRepository<Genre, Long> {

    Page<Genre> findByGenrenameContainsIgnoreCase(String genrename, Pageable p);

}
