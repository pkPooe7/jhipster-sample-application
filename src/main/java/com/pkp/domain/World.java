package com.pkp.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A World.
 */
@Entity
@Table(name = "world")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class World implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @OneToMany(mappedBy = "homeWorld")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Alien> aliens = new HashSet<>();

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

    public World name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Alien> getAliens() {
        return aliens;
    }

    public World aliens(Set<Alien> aliens) {
        this.aliens = aliens;
        return this;
    }

    public World addAlien(Alien alien) {
        this.aliens.add(alien);
        alien.setHomeWorld(this);
        return this;
    }

    public World removeAlien(Alien alien) {
        this.aliens.remove(alien);
        alien.setHomeWorld(null);
        return this;
    }

    public void setAliens(Set<Alien> aliens) {
        this.aliens = aliens;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof World)) {
            return false;
        }
        return id != null && id.equals(((World) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "World{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
