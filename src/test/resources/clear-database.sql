SET FOREIGN_KEY_CHECKS=0;

TRUNCATE TABLE ATTENDANCE RESTART IDENTITY;
TRUNCATE TABLE ATTENDANCE_GUESTS RESTART IDENTITY;
TRUNCATE TABLE ATTACHMENT RESTART IDENTITY;
TRUNCATE TABLE ATTENDANCE_ATTACHMENTS RESTART IDENTITY;
TRUNCATE TABLE USUARIO RESTART IDENTITY;
TRUNCATE TABLE USUARIO_PROFILES RESTART IDENTITY;
TRUNCATE TABLE HEALTH_INSURER RESTART IDENTITY;
TRUNCATE TABLE GUEST RESTART IDENTITY;
TRUNCATE TABLE INSURED RESTART IDENTITY;
TRUNCATE TABLE INSURED_SITUATIONS RESTART IDENTITY;
TRUNCATE TABLE PROFESSIONAL RESTART IDENTITY;
TRUNCATE TABLE PROFESSIONAL_SPECIALTIES RESTART IDENTITY;
TRUNCATE TABLE SCHEDULE RESTART IDENTITY;
TRUNCATE TABLE VACANCY RESTART IDENTITY;

SET FOREIGN_KEY_CHECKS=1;