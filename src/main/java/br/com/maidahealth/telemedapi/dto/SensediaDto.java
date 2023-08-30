package br.com.maidahealth.telemedapi.dto;

import com.fasterxml.jackson.databind.JsonNode;

public class SensediaDto {
	
	private String cpf;
	
	private String situacao;
	
	private String nome;

	private String dataNascimento;

	private String nomeMae;

	private String carteira;

	public SensediaDto(JsonNode response) {
		if (response != null) {
			this.cpf = response.path("nu_cpf").asText();
			this.situacao = response.path("ds_situacao").asText();
			this.nome = response.path("nome").asText();
			this.nomeMae = response.path("nome_mae").asText();
			this.dataNascimento = response.path("data_nascimento").asText();
			this.carteira = response.path("carteira").asText();
		}
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getSituacao() {
		return situacao;
	}

	public void setSituacao(String situacao) {
		this.situacao = situacao;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(String dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getNomeMae() {
		return nomeMae;
	}

	public void setNomeMae(String nomeMae) {
		this.nomeMae = nomeMae;
	}

	public String getCarteira() {
		return carteira;
	}

	public void setCarteira(String carteira) {
		this.carteira = carteira;
	}

	
}
