package br.com.maidahealth.telemedapi.services;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import br.com.maidahealth.telemedapi.dto.AttendanceDto;
import br.com.maidahealth.telemedapi.dto.NotificationDto;
import br.com.maidahealth.telemedapi.enums.TypeActionEnum;
import br.com.maidahealth.telemedapi.models.Device;
import br.com.maidahealth.telemedapi.models.TelemedNotification;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.repositories.TelemedNotificationRepository;
import us.raudi.pushraven.Notification;
import us.raudi.pushraven.Pushraven;

@Service
@Transactional
public class TelemedNotificationService {

	@Autowired
	private TelemedNotificationRepository repository;

	@Autowired
	private AuthenticationService authenticationService;

	@Autowired
	private AttendanceService attendanceService;

	public TelemedNotification save(TelemedNotification notification) {
		return repository.save(notification);
	}

	public TelemedNotification save(String message, Long metadataId, User user, TypeActionEnum typeAction) {
		return repository.save(new TelemedNotification(message, metadataId, user, typeAction));
	}

	@Async
	public void send(TelemedNotification telemedNotification) {
		String keyFirebaseProject = "AAAAqtAyFew:APA91bGhrSPqr7r99Wr51O5zJf15qcLYwxXFD2lG3Lh1xTC8ddJ2rNcW7GOtZAnX1TSlbPHH9hLmUOv3QhqlxfTG2OnndGL8ywo8wj-0rBYUlBFOYoVPKozZp27gp50TQ35TkQskuD7q";

		Pushraven.setKey(keyFirebaseProject);

		for (Device device : telemedNotification.getUser().getDevices()) {
			Notification not = createNotification(device.getDeviceId(), telemedNotification);
			Pushraven.setNotification(not);

			Pushraven.push();
		}

		telemedNotification.setSentAt(new Date());
		repository.save(telemedNotification);
	}

	private Notification createNotification(String deviceId, TelemedNotification telemedNotification) {

		AttendanceDto attDto = AttendanceDto.convert(attendanceService.findById(telemedNotification.getMetadataId()),
				false, null, null, null, null);

		Map<String, Object> metadata = new HashMap<>();
		metadata.put("typeAction", telemedNotification.getTypeAction().name());
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		String attDtoJsonString = gson.toJson(attDto);
		metadata.put("metadata", attDtoJsonString);

		return createDataNotification(deviceId, telemedNotification.getMessage(), telemedNotification.getMessage(),
				metadata);
	}

	private Notification createDataNotification(String deviceId, String title, String body,
			Map<String, Object> metadata) {

		Notification notif = new Notification();
		notif.to(deviceId);
		metadata.put("click_action", "FLUTTER_NOTIFICATION_CLICK");

		notif.title(title);
		notif.body(body);
		notif.data(metadata);

		return notif;
	}

	public void sendPendingNotifications() throws InterruptedException {
		List<TelemedNotification> notifications = repository.findBySentAt(null);

		for (TelemedNotification telemedNotification : notifications) {
			send(telemedNotification);
		}
	}

	public Integer unreadCount() {
		User currentUser = authenticationService.currentUser();
		return repository.countByUserAndReadedAt(currentUser, null);
	}

	public Page<NotificationDto> list(@PageableDefault(page = 0, size = 10) Pageable pageable) {
		User currentUser = authenticationService.currentUser();
		Page<TelemedNotification> notifications = repository.findByUserOrderByCreatedAtDesc(currentUser, pageable);

		Page<NotificationDto> notsDto = NotificationDto.convert(notifications);
		for (NotificationDto notDto : notsDto) {
			Object metadata = AttendanceDto.convert(attendanceService.findById(notDto.getMetadataId()), false, null,
					null, null, null);
			notDto.setExpirationFlag(metadata);
		}

		return notsDto;
	}

	public void markAllAsRead() {
		User currentUser = authenticationService.currentUser();
		List<TelemedNotification> notifications = repository.findByUserAndReadedAt(currentUser, null);

		for (TelemedNotification notification : notifications) {
			notification.setReadedAt(new Date());
		}
		repository.saveAll(notifications);
	}

	public Object getMetadataByTelemedNotificationId(Long id) {
		Optional<TelemedNotification> optionalNot = repository.findById(id);

		return optionalNot.isPresent()
				? AttendanceDto.convert(attendanceService.findById(optionalNot.get().getMetadataId()), false, null,
						null, null, null)
				: null;
	}

}
