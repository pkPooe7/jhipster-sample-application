package com.pkp.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import com.pkp.domain.enumeration.Hands;

/**
 * A DominantHand.
 */
@Entity
@Table(name = "dominant_hand")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DominantHand implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "hand")
    private Hands hand;

    @OneToOne(mappedBy = "dominantHand")
    @JsonIgnore
    private Classification primaryHand;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Hands getHand() {
        return hand;
    }

    public DominantHand hand(Hands hand) {
        this.hand = hand;
        return this;
    }

    public void setHand(Hands hand) {
        this.hand = hand;
    }

    public Classification getPrimaryHand() {
        return primaryHand;
    }

    public DominantHand primaryHand(Classification classification) {
        this.primaryHand = classification;
        return this;
    }

    public void setPrimaryHand(Classification classification) {
        this.primaryHand = classification;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DominantHand)) {
            return false;
        }
        return id != null && id.equals(((DominantHand) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DominantHand{" +
            "id=" + getId() +
            ", hand='" + getHand() + "'" +
            "}";
    }
}
