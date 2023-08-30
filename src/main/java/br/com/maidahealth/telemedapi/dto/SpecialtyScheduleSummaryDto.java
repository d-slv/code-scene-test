package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.models.Vacancy;

public class SpecialtyScheduleSummaryDto {

    private Long id;
    private String name;

    public SpecialtyScheduleSummaryDto() {
    }

    public SpecialtyScheduleSummaryDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static SpecialtyScheduleSummaryDto convert(Specialty specialty){
        return new SpecialtyScheduleSummaryDto(specialty.getId(), specialty.getName());
    }

    public static SpecialtyScheduleSummaryDto convert(Vacancy vacancy){
        return new SpecialtyScheduleSummaryDto(vacancy.getSchedule().getSpecialty().getId(), vacancy.getSchedule().getSpecialty().getName());
    }
}
