package br.com.maidahealth.telemedapi.enums;

import org.springframework.util.StringUtils;

public enum ChatType {
    
    PRIVATE("Privado"),
    GROUP("Grupo");

    private String description;

    private ChatType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public static ChatType getTypeByDescription(String description) {
		if(StringUtils.isEmpty(description)) {
			return null;
		}
		ChatType[] types = ChatType.values();
		for (int i = 0; i < types.length; i++) {
			if(types[i].getDescription().equalsIgnoreCase(description)) {
				return types[i];
			}
		}
		return null;
	}

}
