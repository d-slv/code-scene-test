package br.com.maidahealth.telemedapi.controllers;

import br.com.maidahealth.telemedapi.dto.SupportReasonDto;
import br.com.maidahealth.telemedapi.form.ReasonForm;
import br.com.maidahealth.telemedapi.models.SupportReason;
import br.com.maidahealth.telemedapi.services.SupportReasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("support")
public class SupportController {

    @Autowired
    private SupportReasonService supportReasonService;

    @PostMapping("/create-reason")
    public ResponseEntity<SupportReasonDto> createReason(@RequestBody @Valid ReasonForm form){
        return ResponseEntity.ok(new SupportReasonDto(supportReasonService.createReason(form)));
    }

    @GetMapping("get-reasons")
    public ResponseEntity<List<SupportReasonDto>> getSupportReasons(){

        List<SupportReasonDto> supportReasonDtoList = new ArrayList<>();
        for (SupportReason s : supportReasonService.getSupportReasons()){
            supportReasonDtoList.add(new SupportReasonDto(s));
        }

        return ResponseEntity.ok(supportReasonDtoList);
    }
}
