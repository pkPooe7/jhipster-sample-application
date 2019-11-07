package com.pkp.repository;
import com.pkp.domain.DominantHand;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DominantHand entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DominantHandRepository extends JpaRepository<DominantHand, Long> {

}
