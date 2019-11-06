package com.pkp.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Alien.
 */
@Entity
@Table(name = "alien")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Alien implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 50)
    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "home_planet")
    private String homePlanet;

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

    public Alien name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHomePlanet() {
        return homePlanet;
    }

    public Alien homePlanet(String homePlanet) {
        this.homePlanet = homePlanet;
        return this;
    }

    public void setHomePlanet(String homePlanet) {
        this.homePlanet = homePlanet;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Alien)) {
            return false;
        }
        return id != null && id.equals(((Alien) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Alien{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", homePlanet='" + getHomePlanet() + "'" +
            "}";
    }
}
