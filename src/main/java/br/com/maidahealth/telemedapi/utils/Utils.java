package br.com.maidahealth.telemedapi.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.TimeZone;
import java.util.UUID;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.maidahealth.telemedapi.TelemedClientApiContext;
import br.com.maidahealth.telemedapi.models.ApiConfiguration;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.Insured;

@Component
public class Utils {

    public static final String DEFAULT_INSURED_PASSWORD = "Maida2020";
    public static final String DATE_FORMAT = "dd/MM/yyyy";
    public static final String HOUR_FORMAT = "'às' HH:mm";
    public static final String FULL_DATE_FORMAT = DATE_FORMAT.concat(" ").concat(HOUR_FORMAT);
    public static final int ONLINE_ACTIVITY_DURATION_IN_SECONDS = 120;

    @Autowired
	private static TelemedClientApiContext context;
    
    public static void setContext(TelemedClientApiContext ctx) {
    	context = ctx;
    }

    public static boolean isEmpty(String param) {
        return StringUtils.isEmpty(param);
    }

    public static Date parse(String strDate) {
        return parse(strDate, "dd/MM/yyyy");
    }

    public static Date parseReverse(String strDate) {
        return parse(strDate, "yyyy-MM-dd");
    }

    public static String parse(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("ddMMyyyy");
        String strDate = sdf.format(date);
        return strDate;
    }

    public static String complete(String target, int size, String characters) {
        return StringUtils.leftPad(target, size, characters);
    }

    /**
     * Valida se um número de celular é válido. Método não valida corretamente telefones fixos.
     * @param phoneNumber
     * @return
     */
    public static boolean isCellPhoneNumberValid(String phoneNumber) {

        String processedPhone = phoneNumber.replaceAll("[\\s()-]", "");

        // verifica se tem a qtde correta de numeros
        if (processedPhone.length() != 11)
            return false;

        // Se tiver 11 caracteres, verificar se começa com 9 o celular
        if (Integer.parseInt(processedPhone.substring(2, 3)) != 9)
            return false;

        return validatePhoneNumber(processedPhone);
    }

	private static boolean validatePhoneNumber(String processedPhone) {
		String last8Numbers = processedPhone.substring(processedPhone.length()-8, processedPhone.length());

        if (last8Numbers.equals("99999999") || last8Numbers.equals("88888888") || last8Numbers.equals("77777777")
                || last8Numbers.equals("66666666") || last8Numbers.equals("55555555") || last8Numbers.equals("44444444")
                || last8Numbers.equals("33333333") || last8Numbers.equals("22222222")
                || last8Numbers.equals("11111111"))
            return false;

        // DDDs validos
        List<String> dddCodes = Arrays.asList("11", "12", "13", "14", "15", "16", "17", "18", "19", "21", "22", "24",
                "27", "28", "31", "32", "33", "34", "35", "37", "38", "41", "42", "43", "44", "45", "46", "47", "48",
                "49", "51", "53", "54", "55", "61", "62", "64", "63", "65", "66", "67", "68", "69", "71", "73", "74",
                "75", "77", "79", "81", "82", "83", "84", "85", "86", "87", "88", "89", "91", "92", "93", "94", "95",
                "96", "97", "98", "99");

        // verifica se o DDD é valido
        if (!dddCodes.contains(processedPhone.substring(0, 2)))
            return false;

        // se passar por todas as validações acima, o formato está correto.
        return true;
	}

	public static boolean isLandlineNumberValid(String phoneNumber) {
		String processedPhone = phoneNumber.replaceAll("[\\s()-]", "");

        // verifica se tem a qtde correta de numeros
        if (processedPhone.length() != 10)
            return false;

        return validatePhoneNumber(processedPhone);
	}

    public static Date addDays(Date startDate, int increment) {
        Calendar dataAux = Calendar.getInstance();
        dataAux.setTime(startDate);
        return incrementDate(dataAux, Calendar.DAY_OF_MONTH, increment);
    }

    private static Date incrementDate(Calendar starDate, int param, int increment) {
        if (starDate == null) {
            return null;
        }
        starDate.add(param, increment);
        return starDate.getTime();
    }

    public static String format(Date date, String format) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(format);
            return sdf.format(date);
        } catch (Exception ex) {
            throw new RuntimeException("Excecao durante a formatacao: " + ex.getMessage());
        }
    }

    public static Date currentDate() {
        Date now = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        try {
            now = sdf.parse(sdf.format(now));
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return now;
    }

    public static Date formatDataWithHour(Date date, String hour, TimeZone timeZone) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        if (timeZone != null) {
            sdf.setTimeZone(timeZone);
        }
        Date formated;
        try {
            formated = sdf.parse(Utils.format(date, "yyyy-MM-dd") + " " + hour);
            Long time = formated.getTime();
            return new Date(time);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }

    public static String dateWithHourAndWeekday(Date date, String timezoneString) {
        String pattern = "EEEEE, dd 'de' MMMMM 'de' yyyy 'às' HH:mm";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern, new Locale("pt", "BR"));
        simpleDateFormat.setTimeZone(TimeZone.getTimeZone(timezoneString));
        try {
            return simpleDateFormat.format(date);
        } catch (Exception e) {
            return "data não encontrada";
        }
    }

    public static Date getDayWithTimeAtEndOfDay(Date date) {
        Calendar instance = Calendar.getInstance();
        instance.setTime(date);
        instance.set(Calendar.HOUR_OF_DAY, 23);
        instance.set(Calendar.MINUTE, 59);
        instance.set(Calendar.SECOND, 59);
        instance.set(Calendar.MILLISECOND, 999);
        return instance.getTime();
    }

    public static Long getDifferenceInMinutes(Date d1, Date d2) {
        long diff = d2.getTime() - d1.getTime();
        long diffInMinutes = (diff / 1000) / 60;
        Integer quantMinutes = (int) (diffInMinutes);
        return quantMinutes.longValue();
    }

    public static Date getCurrentDate(TimeZone timeZone) {
        Calendar calendar = new GregorianCalendar();
        calendar.setTimeZone(timeZone);
        Date currentDate = calendar.getTime();
        return currentDate;
    }

    public static Date getCurrentDatePlusAdditionalTime(TimeZone timeZone, int minutes) {
        Calendar calendar = new GregorianCalendar();
        calendar.setTimeZone(timeZone);
		calendar.add(Calendar.MINUTE, minutes);
        return calendar.getTime();
    }

    public static String parseToPrettyDate(Date date) {
        return Optional.ofNullable(date).map(d -> {
            LocalDateTime localDate = convertToLocalDateTime(d, ZoneId.of(context.getApiConfiguration().getTimezone()));
            LocalDateTime now = LocalDateTime.now(ZoneId.of(context.getApiConfiguration().getTimezone()));

			int days = (int) now.toLocalDate().until(localDate.toLocalDate(), ChronoUnit.DAYS);

			DateTimeFormatter formatter;
			if (days == 1) {
                formatter = DateTimeFormatter.ofPattern(HOUR_FORMAT);
                return "Amanhã " + localDate.format(formatter);
            } else if (days == 0) {
                formatter = DateTimeFormatter.ofPattern(HOUR_FORMAT);
                return "Hoje " + localDate.format(formatter);
            } else {
                formatter = DateTimeFormatter.ofPattern(FULL_DATE_FORMAT);
                return localDate.format(formatter);
            }
        }).orElse(null);
    }

    public static String parseToPretty(Date date, String format) {
        return Optional.ofNullable(date).map(d -> {
            LocalDateTime localDate = convertToLocalDateTime(d, ZoneId.of(context.getApiConfiguration().getTimezone()));

			DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);
            return localDate.format(formatter);
        }).orElse(null);
    }

    public static String convertStringLikePersonName(String name) {
        String[] strings = name.split("\\s");

        String newName = Arrays.stream(strings)
                .filter(str -> !StringUtils.isEmpty(str)) // selects only non empty strings
                .map(StringUtils::trim) // removes white spaces
                .map(StringUtils::lowerCase) // transform string to lower case
                .map(CapitalizeFirstLetter()) // capitalize only string's first letter
                .collect(Collectors.joining(" ")); // returns full string separated by white space
        return newName;
    }

    private static Function<? super String, ? extends String> CapitalizeFirstLetter() {
        return str -> {
            String transform = str;
            if (!str.matches("e|d[aeiou]$")) {
                transform = StringUtils.capitalize(str);
            }

            if (transform.contains("/")) {
                String[] fragment = str.split("\\/");
                transform = Arrays.stream(fragment).map(StringUtils::capitalize).collect(Collectors.joining("/"));
            }

            return transform;
        };
    }

    public static LocalDateTime convertToLocalDateTime(Date date, ZoneId zoneId) {
        return date.toInstant().atZone(zoneId).toLocalDateTime();
    }

    public static boolean isEmailValid(String email) {
        if (StringUtils.isEmpty(email)) return false;

        Pattern VALID_EMAIL_ADDRESS_REGEX = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
        return VALID_EMAIL_ADDRESS_REGEX.matcher(email).find();
    }

    public static String getTempDir() {
        String sistemaOperacional = System.getProperty("os.name");
        String diretorio;
        if (sistemaOperacional.toUpperCase().equals("LINUX")) {
            diretorio = System.getProperty("java.io.tmpdir") + "/";
        } else {
            diretorio = System.getProperty("java.io.tmpdir");
        }
        return diretorio;
    }

    public static String getDocumentName(Attendance att, String documentType) {
        return att.getInsured().getName().replaceAll("\\s", "-") + "-" + documentType + "-" + Utils.format(att.getFinishDate(), "dd-MM-yyyy-hh:mm:ss");
    }
    
    public static String generateRandomString(Integer length) {
    	return RandomStringUtils.random(length, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
    }
    
    /**
     * 
     * @param date
     * @param field is a Calendar field
     * @param value
     * @return
     */
    public static Date add(Date date, Integer field, Integer value) {
    	Calendar c = Calendar.getInstance();
    	c.setTime(date);
    	c.add(field, value);
    	
    	return c.getTime();
    }

    public static ZoneId getApiZoneId() {
        String apiTimezone = context.getApiConfiguration().getTimezone();

        return ZoneId.of(apiTimezone);
    }

    public static Date convertInstantToDate(Instant instant) {
        return Date.from(instant);
    }

	public static Date convertLocalDateTimeToDate(LocalDateTime dateToConvert) {
	    return Date.from(dateToConvert.atZone(getApiZoneId())
	    	      .toInstant());
	}

	public static Date normalizeDate(Date date) {
        ZoneId utcZoneId = ZoneId.of("UTC");
        LocalDateTime ldt = date.toInstant().atZone(utcZoneId).toLocalDateTime();
        Instant instant = ldt.atZone(getApiZoneId()).withZoneSameInstant(utcZoneId).toInstant();

        return Utils.convertInstantToDate(instant);
    }

    public static Date getBeginningOfDay(Date date) {
        ZoneId zone = ZoneId.of(context.getApiConfiguration().getTimezone());
		LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

		return Date.from(localDate.atStartOfDay(zone).toLocalDateTime().atZone(zone).toInstant());
    }

    public static Date getEndOfDay(Date date) {
        ZoneId zone = ZoneId.of(context.getApiConfiguration().getTimezone());
		LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

		return Date.from(localDate.plusDays(1).atStartOfDay(zone).minusMinutes(1).toLocalDateTime().atZone(zone).toInstant());
    }

    public static Date getActualDate() {
        ZoneId zone = ZoneId.of(context.getApiConfiguration().getTimezone());
        return Date.from(LocalDateTime.now(zone).atZone(zone).toInstant()); 
    }

    public static Date parse(String strDate, String pattern) {
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        Date date;
        try {
            date = sdf.parse(strDate);
        } catch (ParseException e) {
            date = null;
            e.printStackTrace();
        }
        return date;
    }

	public static boolean isWeekend(LocalDate date) {
	    DayOfWeek day = date.getDayOfWeek();
	    return day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY;
	}
	
    public static String generateRandomInsuranceNumber() {
        return UUID.randomUUID().toString();
    }

    public static String getCleanedCpf(String cpf) {
    	if (StringUtils.isEmpty(cpf))
			return "";

		return Utils.complete(cpf.replaceAll("[\\s()-.]", ""), 11, "0");
    }


	public static boolean isCpfValido(String xCPF) {
        try {

            if (StringUtils.isEmpty(xCPF)){
                return false;
            }

            if (hasAllRepeatedDigits(xCPF)){
                return false;

            }

            if (xCPF.length() < 11){
                return false;
            }

            int d1, d4, xx, nCount, resto, digito1, digito2;
            String Check;
            String Separadores = "/-.";
            d1 = 0;
            d4 = 0;
            xx = 1;
            for (nCount = 0; nCount < xCPF.length() - 2; nCount++) {
                String s_aux = xCPF.substring(nCount, nCount + 1);
                if (Separadores.indexOf(s_aux) == -1) {
                    d1 = d1 + (11 - xx) * Integer.valueOf(s_aux).intValue();
                    d4 = d4 + (12 - xx) * Integer.valueOf(s_aux).intValue();
                    xx++;
                }
            }
            resto = (d1 % 11);
            if (resto < 2) {
                digito1 = 0;
            } else {
                digito1 = 11 - resto;
            }

            d4 = d4 + 2 * digito1;
            resto = (d4 % 11);
            if (resto < 2) {
                digito2 = 0;
            } else {
                digito2 = 11 - resto;
            }

            Check = String.valueOf(digito1) + String.valueOf(digito2);
            String s_aux2 = xCPF.substring(xCPF.length() - 2, xCPF.length());

            if (s_aux2.compareTo(Check) != 0) {
                return false;
            }

            return true;
        } catch (Exception e) {
            return false;
        }
    }

	private static boolean hasAllRepeatedDigits(String xcpf) {
        String cpf=xcpf.replace(".", "").replace("-", "");
        for (int i = 1; i < cpf.length(); i++) {
            if (cpf.charAt(i) != cpf.charAt(0)) {
                return false;
            }
        }
        return true;
    }
	
    public static String normalizeToQuery(String query) {
		String newQuery = StringUtils.stripAccents(query);
		newQuery = StringUtils.upperCase(newQuery);
		newQuery = StringUtils.deleteWhitespace(newQuery);
		
    	StringBuilder ret =  new StringBuilder();
    	Matcher matches = Pattern.compile( "[A-Z0-9]" ).matcher(newQuery);
    	while (matches.find()){
    	    ret.append(matches.group(0));
    	}

    	return ret.toString();
    }

	public static boolean isBetween(Date baseDate, Date beginDate, Date endDate) {
		LocalDateTime baseLocalDateTime = convertToLocalDateTime(baseDate, getApiZoneId());
		LocalDateTime beginLocalDateTime = convertToLocalDateTime(beginDate, getApiZoneId());
		LocalDateTime endLocalDateTime = convertToLocalDateTime(endDate, getApiZoneId());
		
		if((baseLocalDateTime.isEqual(beginLocalDateTime) || baseLocalDateTime.isAfter(beginLocalDateTime))
				&& (baseLocalDateTime.isEqual(endLocalDateTime) || baseLocalDateTime.isBefore(endLocalDateTime))) {
			return true;
		}
		
		return false;
	}

	public static boolean isAfterNow(Date dateVacancy) {
		return convertToLocalDateTime(dateVacancy, getApiZoneId()).isAfter(LocalDateTime.now(ZoneId.of(context.getApiConfiguration().getTimezone())));
	}
	
	public static boolean isAfterHour(Date beginHourDate, Date endHourDate) {
		return convertToLocalDateTime(beginHourDate, getApiZoneId())
				.isAfter(convertToLocalDateTime(endHourDate, getApiZoneId()));
	}
	
	public static String convertIntListToString(List<Integer> list) {
		String listString = list.toString();
		return listString.substring(1, listString.length()-1);
	}
	
	public static List<Integer> convertStringToIntList(String string) {
		List<Integer> array = Arrays.stream(string.split(", "))
				.map(Integer::parseInt)
				.collect(Collectors.toList());
		return array;
	}
	
	public static String getDayOfWeekPortuguese(Integer dayOfWeek, TextStyle style) {
		String dayOfWeekPortuguese = DayOfWeek.of(dayOfWeek).getDisplayName(style, new Locale("pt", "BR")); 
		dayOfWeekPortuguese = dayOfWeekPortuguese.substring(0, 1).toUpperCase() + dayOfWeekPortuguese.substring(1);
		return dayOfWeekPortuguese;
	}

	public static boolean isInDaysOfWeek(LocalDate day, String daysOfWeekString) {
		List<Integer> daysOfWeekArray = convertStringToIntList(daysOfWeekString);
		for (Integer d : daysOfWeekArray) {
			if (day.getDayOfWeek().equals(DayOfWeek.of(d))) {
				return true;
			}
		}
		return false;
	}

    public static ApiConfiguration getConfig(){
        return context.getApiConfiguration();
    }

    public static Integer getAgeOfInsured(Insured insured) {

        Date birthDate = insured.getBirthDate();

        if(birthDate == null) {
            return null;
        }
        
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		int actualYear = calendar.get(Calendar.YEAR);

		calendar.setTime(birthDate);
		int birthYear = calendar.get(Calendar.YEAR);

		return actualYear - birthYear;
	}
}
