package com.pkp.web.rest;

import com.pkp.domain.DominantHand;
import com.pkp.repository.DominantHandRepository;
import com.pkp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.pkp.domain.DominantHand}.
 */
@RestController
@RequestMapping("/api")
public class DominantHandResource {

    private final Logger log = LoggerFactory.getLogger(DominantHandResource.class);

    private static final String ENTITY_NAME = "dominantHand";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DominantHandRepository dominantHandRepository;

    public DominantHandResource(DominantHandRepository dominantHandRepository) {
        this.dominantHandRepository = dominantHandRepository;
    }

    /**
     * {@code POST  /dominant-hands} : Create a new dominantHand.
     *
     * @param dominantHand the dominantHand to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dominantHand, or with status {@code 400 (Bad Request)} if the dominantHand has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/dominant-hands")
    public ResponseEntity<DominantHand> createDominantHand(@RequestBody DominantHand dominantHand) throws URISyntaxException {
        log.debug("REST request to save DominantHand : {}", dominantHand);
        if (dominantHand.getId() != null) {
            throw new BadRequestAlertException("A new dominantHand cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DominantHand result = dominantHandRepository.save(dominantHand);
        return ResponseEntity.created(new URI("/api/dominant-hands/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /dominant-hands} : Updates an existing dominantHand.
     *
     * @param dominantHand the dominantHand to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dominantHand,
     * or with status {@code 400 (Bad Request)} if the dominantHand is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dominantHand couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/dominant-hands")
    public ResponseEntity<DominantHand> updateDominantHand(@RequestBody DominantHand dominantHand) throws URISyntaxException {
        log.debug("REST request to update DominantHand : {}", dominantHand);
        if (dominantHand.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DominantHand result = dominantHandRepository.save(dominantHand);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dominantHand.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /dominant-hands} : get all the dominantHands.
     *

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dominantHands in body.
     */
    @GetMapping("/dominant-hands")
    public List<DominantHand> getAllDominantHands(@RequestParam(required = false) String filter) {
        if ("primaryhand-is-null".equals(filter)) {
            log.debug("REST request to get all DominantHands where primaryHand is null");
            return StreamSupport
                .stream(dominantHandRepository.findAll().spliterator(), false)
                .filter(dominantHand -> dominantHand.getPrimaryHand() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all DominantHands");
        return dominantHandRepository.findAll();
    }

    /**
     * {@code GET  /dominant-hands/:id} : get the "id" dominantHand.
     *
     * @param id the id of the dominantHand to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dominantHand, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/dominant-hands/{id}")
    public ResponseEntity<DominantHand> getDominantHand(@PathVariable Long id) {
        log.debug("REST request to get DominantHand : {}", id);
        Optional<DominantHand> dominantHand = dominantHandRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dominantHand);
    }

    /**
     * {@code DELETE  /dominant-hands/:id} : delete the "id" dominantHand.
     *
     * @param id the id of the dominantHand to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/dominant-hands/{id}")
    public ResponseEntity<Void> deleteDominantHand(@PathVariable Long id) {
        log.debug("REST request to delete DominantHand : {}", id);
        dominantHandRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
