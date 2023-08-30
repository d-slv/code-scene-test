package br.com.maidahealth.telemedapi.dto;

public class ScheduleSummaryDto {

    private SpecialtyScheduleSummaryDto specialty;
    private ProfessionalScheduleSummaryDto professional;
    private VacancyScheduleSummaryDto vacancy;

    public ScheduleSummaryDto() {
    }

    public ScheduleSummaryDto(SpecialtyScheduleSummaryDto specialty, ProfessionalScheduleSummaryDto professional, VacancyScheduleSummaryDto vacancy) {
        this.specialty = specialty;
        this.professional = professional;
        this.vacancy = vacancy;
    }

    public SpecialtyScheduleSummaryDto getSpecialty() {
        return specialty;
    }

    public void setSpecialty(SpecialtyScheduleSummaryDto specialty) {
        this.specialty = specialty;
    }

    public ProfessionalScheduleSummaryDto getProfessional() {
        return professional;
    }

    public void setProfessional(ProfessionalScheduleSummaryDto professional) {
        this.professional = professional;
    }

    public VacancyScheduleSummaryDto getVacancy() {
        return vacancy;
    }

    public void setVacancy(VacancyScheduleSummaryDto vacancy) {
        this.vacancy = vacancy;
    }


}
