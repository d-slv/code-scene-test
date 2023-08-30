package br.com.maidahealth.telemedapi.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import br.com.maidahealth.telemedapi.dto.AttachmentViewerDto;
import br.com.maidahealth.telemedapi.dto.AttendanceDto;
import br.com.maidahealth.telemedapi.exceptions.InvalidUserException;
import br.com.maidahealth.telemedapi.form.AirmedWebhookForm;
import br.com.maidahealth.telemedapi.form.AttachmentListForm;
import br.com.maidahealth.telemedapi.form.AttachmentViewerForm;
import br.com.maidahealth.telemedapi.form.LocalChatCreationForm;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.services.AirmedService;
// import br.com.maidahealth.telemedapi.services.ApiService;
import br.com.maidahealth.telemedapi.services.AttachmentService;
import br.com.maidahealth.telemedapi.services.ChatService;
import br.com.maidahealth.telemedapi.services.TelemedServerService;

@RestController
@RequestMapping("webhook")
public class WebHookController {

    // private final ApiService service;

    @Autowired
    private AirmedService airmedService;
    
    @Autowired
    private AttachmentService attachmentService;

    @Autowired
    private ChatService chatService;
    
    @Autowired
    private TelemedServerService service;

    public WebHookController(@Qualifier("docwayService") TelemedServerService service) {
        this.service = service;
    }

    @Deprecated
    @PostMapping
    public String webhook(@RequestBody Object obj, @RequestHeader("Authorization") String token) {
        token = token.replace("Bearer", "").replaceAll(" ", "");
        if (!service.isWebhookTokenValid(token))
            throw new InvalidUserException("Token inválido");
        // service.handleWebhook(jsonObject);
        return "success";
    }

    @PostMapping(value = "/airmed")
    public ResponseEntity<?> handleAirmedWebhook(@RequestBody AirmedWebhookForm form,
                                                 @RequestHeader("accessToken") String accessToken,
                                                 BindingResult result) throws NoSuchMethodException, MethodArgumentNotValidException {
        return airmedService.handleWebhook(form, accessToken, result);
    }

    @PostMapping(value="/sync-attachments/{publicId}")
    public ResponseEntity<?> syncAttachments(@RequestBody @Valid AttachmentListForm form,
    		@RequestHeader("accessToken") String token,
            @PathVariable String publicId,
            @RequestParam(name="sync" ,required = false, defaultValue = "false" )boolean sync){
    	if (!service.isWebhookTokenValid(token))
            throw new InvalidUserException("Token inválido");
    	Attendance attendance = attachmentService.addAttachmentToAttendance(form, publicId, sync);
        return ResponseEntity.ok(AttendanceDto.convert(attendance, true, null, null, null, null));
    }

    @PostMapping(value="/sync-attachment-view")
    public ResponseEntity<AttachmentViewerDto> syncAttachmentView(@RequestBody @Valid AttachmentViewerForm form,
    		@RequestHeader("accessToken") String token){
    	if (!service.isWebhookTokenValid(token))
            throw new InvalidUserException("Token inválido");
        AttachmentViewerDto viewerDto = attachmentService.syncAttachmentView(form);
        return ResponseEntity.ok(viewerDto);
    }

    @PostMapping(value="/sync/created-chat")
    public ResponseEntity<?> synchronizeChatCreation(@RequestHeader("accessToken") String token, @RequestBody LocalChatCreationForm form) {
    	if (!service.isWebhookTokenValid(token))
            throw new InvalidUserException("Token inválido");
        return chatService.synchronizeChatCreation(form);
    }
    
}
