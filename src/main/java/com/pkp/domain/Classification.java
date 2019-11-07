package com.pkp.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Classification.
 */
@Entity
@Table(name = "classification")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Classification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @NotNull
    @Size(max = 50)
    @Column(name = "handed", length = 50, nullable = false)
    private String handed;

    @OneToOne
    @JoinColumn(unique = true)
    private DominantHand dominantHand;

    @OneToOne(mappedBy = "catergory")
    @JsonIgnore
    private Alien alien;

    @ManyToMany(mappedBy = "speciesTeches")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Technology> raceNames = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Classification name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHanded() {
        return handed;
    }

    public Classification handed(String handed) {
        this.handed = handed;
        return this;
    }

    public void setHanded(String handed) {
        this.handed = handed;
    }

    public DominantHand getDominantHand() {
        return dominantHand;
    }

    public Classification dominantHand(DominantHand dominantHand) {
        this.dominantHand = dominantHand;
        return this;
    }

    public void setDominantHand(DominantHand dominantHand) {
        this.dominantHand = dominantHand;
    }

    public Alien getAlien() {
        return alien;
    }

    public Classification alien(Alien alien) {
        this.alien = alien;
        return this;
    }

    public void setAlien(Alien alien) {
        this.alien = alien;
    }

    public Set<Technology> getRaceNames() {
        return raceNames;
    }

    public Classification raceNames(Set<Technology> technologies) {
        this.raceNames = technologies;
        return this;
    }

    public Classification addRaceName(Technology technology) {
        this.raceNames.add(technology);
        technology.getSpeciesTeches().add(this);
        return this;
    }

    public Classification removeRaceName(Technology technology) {
        this.raceNames.remove(technology);
        technology.getSpeciesTeches().remove(this);
        return this;
    }

    public void setRaceNames(Set<Technology> technologies) {
        this.raceNames = technologies;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Classification)) {
            return false;
        }
        return id != null && id.equals(((Classification) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Classification{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", handed='" + getHanded() + "'" +
            "}";
    }
}
