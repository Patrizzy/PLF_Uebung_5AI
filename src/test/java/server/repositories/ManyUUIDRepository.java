package server.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import server.models.ManyUUID;

import java.util.UUID;


/**
 *
 * @author F. Kasper, ferdinand.kasper@bildung.gv.at
 */
@RepositoryRestResource
public interface ManyUUIDRepository extends CrudRepository<ManyUUID, UUID> {

}
