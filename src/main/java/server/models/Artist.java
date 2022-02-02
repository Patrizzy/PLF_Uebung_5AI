package server.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.validation.constraints.NotBlank;

@Entity
@Getter
@Setter
public class Artist extends Persistent {

    @Column(unique = true)
    @NotBlank
    private String name;

    // Data-URL des Bildes
    @Lob
    private String image;

}
