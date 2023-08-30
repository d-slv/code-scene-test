package br.com.maidahealth.telemedapi.form;

import br.com.maidahealth.telemedapi.customvalidations.GenderSubset;
import br.com.maidahealth.telemedapi.enums.GenderEnum;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.InsuredType;
import br.com.maidahealth.telemedapi.utils.Utils;
import org.hibernate.validator.constraints.br.CPF;

import javax.validation.Valid;
import javax.validation.constraints.*;

public class InsuredSignupForm {

    @NotEmpty(message = "Obrigatório informar o nome")
    private String name;

    @NotEmpty(message = "Obrigatório informar a data de nascimento")
    private String birthDate;

    @NotNull(message = "Obrigatório informar o sexo")
    @GenderSubset(anyOf = {"FEMALE", "MALE", "OTHER"})
    private String gender;

    @NotNull(message = "Obrigatório informar o CPF")
    @CPF(message = "CPF inválido")
    private String cpf;

    @Valid
    @NotNull(message = "Endereço não pode ser vazio")
    private ClientAddressForm address;

    @NotBlank(message = "Telefone é obrigatório")
    private String phoneNumber;

    @NotEmpty(message = "Obrigatório informar o email")
    @Email(message = "Email inválido")
    private String email;

    @NotEmpty(message = "Obrigatório informar a senha")
    private String password;

    @NotEmpty(message = "Obrigatório informar a confirmação de senha")
    private String passwordConfirmation;

    @NotNull(message = "Obrigatório aceitar os termos de usuário")
    @AssertTrue(message = "Usuário deve concordar com os termos")
    private Boolean termsAccepted;
    
    private String healthInsuranceNumber;

    public InsuredSignupForm() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getCpf() {
		return cpf.replaceAll("[\\s()-.]", "");
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public ClientAddressForm getAddress() {
        return address;
    }

    public void setAddress(ClientAddressForm address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordConfirmation() {
        return passwordConfirmation;
    }

    public void setPasswordConfirmation(String passwordConfirmation) {
        this.passwordConfirmation = passwordConfirmation;
    }

    public Boolean getTermsAccepted() {
        return termsAccepted;
    }

    public void setTermsAccepted(Boolean termsAccepted) {
        this.termsAccepted = termsAccepted;
    }

    public String getHealthInsuranceNumber() {
		return healthInsuranceNumber;
	}

	public void setHealthInsuranceNumber(String healthInsuranceNumber) {
		this.healthInsuranceNumber = healthInsuranceNumber;
	}

	public Insured toInsured() {
        Insured insured = new Insured(getCpf(), name, Utils.generateRandomInsuranceNumber(), "", Utils.parse(birthDate, "yyyy-MM-dd"), InsuredType.HOLDER);
        insured.setLastPhoneNumber(phoneNumber);
        insured.setGender(GenderEnum.valueOf(this.gender));
        if(this.healthInsuranceNumber != null) {
            insured.setHealthInsuranceNumber(healthInsuranceNumber);
        }

        return insured;
    }

    public InsuredUpdateForm toInsuredUpdateForm() {
        InsuredUpdateForm insuredUpdateForm = new InsuredUpdateForm();
        insuredUpdateForm.setCpf(getCpf());
        insuredUpdateForm.setName(this.name);
        insuredUpdateForm.setEmail(this.email);
        insuredUpdateForm.setGender(GenderEnum.valueOf(this.gender));
        insuredUpdateForm.setBirthdate(this.birthDate);
        insuredUpdateForm.setPhoneNumber(this.phoneNumber);
        insuredUpdateForm.setAddress(this.address);
        insuredUpdateForm.setHealthInsuranceNumber(this.healthInsuranceNumber);

        return insuredUpdateForm;
    }
    
	public static InsuredSignupForm generateDefaultInsuredForm(String name, String email) {
		InsuredSignupForm form2 = new InsuredSignupForm();
		
		ClientAddressForm addressForm = new ClientAddressForm();
		addressForm.setIbgeCode(2211001);
		addressForm.setNumber("0");
		addressForm.setStreet("Rua dos Bobos");
		addressForm.setNeighborhood("Bairro Vinícius de Morais");
		addressForm.setZipCode("64000000");
		
		form2.setCpf("00000000000");
		form2.setGender("OTHER");
		
		form2.setAddress(addressForm);
		form2.setPhoneNumber("86900000000");
		form2.setBirthDate("1971-01-01");
		form2.setName(name);
		form2.setEmail(email);
		
		return form2;
	}

}
