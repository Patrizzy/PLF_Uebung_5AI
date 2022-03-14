package server.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Collection;
import java.util.Set;

@Entity
@Getter
@Setter
public class Genre extends Persistent {

    @NotBlank(message = "Ein Genre braucht ein Genre.")
    @Size(min = 1)
    @Column(unique = true)
    private String genrename;

    @OneToMany(mappedBy = "genre")
    private Set<Song> songs;


}
