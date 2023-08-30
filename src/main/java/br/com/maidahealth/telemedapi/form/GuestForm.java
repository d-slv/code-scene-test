package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.br.CPF;

import br.com.maidahealth.telemedapi.models.Guest;

public class GuestForm {

    @NotEmpty(message = "cpf não deve ser vazio")
    @CPF(message = "cpf inválido")
    private String cpf;

    @NotEmpty(message = "name não deve ser vazio")
    private String name;

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public Guest toGuest(){
        Guest guest = new Guest();

        guest.setCpf(cpf);
        guest.setName(name);
        return guest;
    }
}
