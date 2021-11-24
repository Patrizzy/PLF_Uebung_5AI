package server.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Getter
@Setter
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    private long version;

    @NotBlank(message = "Ein Lied benötigt einen Titel.")
    @Size(min = 4)
    @Column(unique = true)
    private String title;

    @NotBlank
    private String artist;

    @NotBlank
    private String genre;

    private String duration;

    @Transient
    private Integer size;


    public long getETag() {
        return version;
    }

}
