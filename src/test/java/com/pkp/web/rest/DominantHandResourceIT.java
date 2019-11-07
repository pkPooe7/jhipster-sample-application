package com.pkp.web.rest;

import com.pkp.SampleApp;
import com.pkp.domain.DominantHand;
import com.pkp.repository.DominantHandRepository;
import com.pkp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.pkp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pkp.domain.enumeration.Hands;
/**
 * Integration tests for the {@link DominantHandResource} REST controller.
 */
@SpringBootTest(classes = SampleApp.class)
public class DominantHandResourceIT {

    private static final Hands DEFAULT_HAND = Hands.LEFT;
    private static final Hands UPDATED_HAND = Hands.RIGHT;

    @Autowired
    private DominantHandRepository dominantHandRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restDominantHandMockMvc;

    private DominantHand dominantHand;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DominantHandResource dominantHandResource = new DominantHandResource(dominantHandRepository);
        this.restDominantHandMockMvc = MockMvcBuilders.standaloneSetup(dominantHandResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DominantHand createEntity(EntityManager em) {
        DominantHand dominantHand = new DominantHand()
            .hand(DEFAULT_HAND);
        return dominantHand;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DominantHand createUpdatedEntity(EntityManager em) {
        DominantHand dominantHand = new DominantHand()
            .hand(UPDATED_HAND);
        return dominantHand;
    }

    @BeforeEach
    public void initTest() {
        dominantHand = createEntity(em);
    }

    @Test
    @Transactional
    public void createDominantHand() throws Exception {
        int databaseSizeBeforeCreate = dominantHandRepository.findAll().size();

        // Create the DominantHand
        restDominantHandMockMvc.perform(post("/api/dominant-hands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dominantHand)))
            .andExpect(status().isCreated());

        // Validate the DominantHand in the database
        List<DominantHand> dominantHandList = dominantHandRepository.findAll();
        assertThat(dominantHandList).hasSize(databaseSizeBeforeCreate + 1);
        DominantHand testDominantHand = dominantHandList.get(dominantHandList.size() - 1);
        assertThat(testDominantHand.getHand()).isEqualTo(DEFAULT_HAND);
    }

    @Test
    @Transactional
    public void createDominantHandWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dominantHandRepository.findAll().size();

        // Create the DominantHand with an existing ID
        dominantHand.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDominantHandMockMvc.perform(post("/api/dominant-hands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dominantHand)))
            .andExpect(status().isBadRequest());

        // Validate the DominantHand in the database
        List<DominantHand> dominantHandList = dominantHandRepository.findAll();
        assertThat(dominantHandList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDominantHands() throws Exception {
        // Initialize the database
        dominantHandRepository.saveAndFlush(dominantHand);

        // Get all the dominantHandList
        restDominantHandMockMvc.perform(get("/api/dominant-hands?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dominantHand.getId().intValue())))
            .andExpect(jsonPath("$.[*].hand").value(hasItem(DEFAULT_HAND.toString())));
    }
    
    @Test
    @Transactional
    public void getDominantHand() throws Exception {
        // Initialize the database
        dominantHandRepository.saveAndFlush(dominantHand);

        // Get the dominantHand
        restDominantHandMockMvc.perform(get("/api/dominant-hands/{id}", dominantHand.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dominantHand.getId().intValue()))
            .andExpect(jsonPath("$.hand").value(DEFAULT_HAND.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDominantHand() throws Exception {
        // Get the dominantHand
        restDominantHandMockMvc.perform(get("/api/dominant-hands/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDominantHand() throws Exception {
        // Initialize the database
        dominantHandRepository.saveAndFlush(dominantHand);

        int databaseSizeBeforeUpdate = dominantHandRepository.findAll().size();

        // Update the dominantHand
        DominantHand updatedDominantHand = dominantHandRepository.findById(dominantHand.getId()).get();
        // Disconnect from session so that the updates on updatedDominantHand are not directly saved in db
        em.detach(updatedDominantHand);
        updatedDominantHand
            .hand(UPDATED_HAND);

        restDominantHandMockMvc.perform(put("/api/dominant-hands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDominantHand)))
            .andExpect(status().isOk());

        // Validate the DominantHand in the database
        List<DominantHand> dominantHandList = dominantHandRepository.findAll();
        assertThat(dominantHandList).hasSize(databaseSizeBeforeUpdate);
        DominantHand testDominantHand = dominantHandList.get(dominantHandList.size() - 1);
        assertThat(testDominantHand.getHand()).isEqualTo(UPDATED_HAND);
    }

    @Test
    @Transactional
    public void updateNonExistingDominantHand() throws Exception {
        int databaseSizeBeforeUpdate = dominantHandRepository.findAll().size();

        // Create the DominantHand

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDominantHandMockMvc.perform(put("/api/dominant-hands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dominantHand)))
            .andExpect(status().isBadRequest());

        // Validate the DominantHand in the database
        List<DominantHand> dominantHandList = dominantHandRepository.findAll();
        assertThat(dominantHandList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDominantHand() throws Exception {
        // Initialize the database
        dominantHandRepository.saveAndFlush(dominantHand);

        int databaseSizeBeforeDelete = dominantHandRepository.findAll().size();

        // Delete the dominantHand
        restDominantHandMockMvc.perform(delete("/api/dominant-hands/{id}", dominantHand.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DominantHand> dominantHandList = dominantHandRepository.findAll();
        assertThat(dominantHandList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DominantHand.class);
        DominantHand dominantHand1 = new DominantHand();
        dominantHand1.setId(1L);
        DominantHand dominantHand2 = new DominantHand();
        dominantHand2.setId(dominantHand1.getId());
        assertThat(dominantHand1).isEqualTo(dominantHand2);
        dominantHand2.setId(2L);
        assertThat(dominantHand1).isNotEqualTo(dominantHand2);
        dominantHand1.setId(null);
        assertThat(dominantHand1).isNotEqualTo(dominantHand2);
    }
}
