package br.com.maidahealth.telemedapi.services;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import br.com.maidahealth.telemedapi.models.Professional;

@Service
public class TelehealthServerApiNotificationService {
	
	@Autowired
	private ProfessionalService professionalService;

	public void setProfessionalLastSeenAt(Object obj) {
		try {
			JsonObject jsonObject = JsonParser.parseString(new Gson().toJson(obj)).getAsJsonObject();
			Professional p = professionalService.findByDocwayId(jsonObject.get("professionalUUID").getAsString());
			
			if(p == null) return;
			
			String lastSeenAtString = jsonObject.get("lastSeenAt").getAsString();
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date lastSeenAt = format.parse(lastSeenAtString);
			
			p.setLastSeenAt(lastSeenAt);
			professionalService.save(p);
		} catch (Exception e) {
			// e.printStackTrace();
		}
		
	}

}
