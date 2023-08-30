package br.com.maidahealth.telemedapi.models;

import br.com.maidahealth.telemedapi.enums.TicketStatus;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.GenerationType.IDENTITY;

@Entity
public class Ticket implements Serializable {

    @Id @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private SupportReason reason; // motivo

    @Column(columnDefinition = "TEXT")
    private String issue; // justificativa / problema do paciente

    @Enumerated(STRING)
    private TicketStatus status;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(columnDefinition = "TEXT")
    private String finishResolution; // descricao da resolucao

    @ManyToOne
    private User userResolution; // usuario da resolucao

    @OneToMany(mappedBy = "ticket")
    private List<TicketComment> comments;

    @ManyToOne(optional = false)
    private Attendance attendance;

    @Temporal(TemporalType.TIMESTAMP)
    private Date expirationDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date closedDate;

    public Ticket() {
    }

    public Ticket(Long id, SupportReason reason, String issue, TicketStatus status, Date createdAt, String finishResolution, User userResolution) {
        this.id = id;
        this.reason = reason;
        this.issue = issue;
        this.status = status;
        this.createdAt = createdAt;
        this.finishResolution = finishResolution;
        this.userResolution = userResolution;
    }

    public Ticket(Long id, SupportReason reason, String issue, TicketStatus status, Date createdAt, String finishResolution, User userResolution, Attendance attendance) {
        this(id, reason, issue, status, createdAt, finishResolution, userResolution);
        this.attendance = attendance;
    }

    public Ticket(Long id, SupportReason reason, String issue, TicketStatus status, Date createdAt, String finishResolution, User userResolution, Attendance attendance, Date expirationDate, Date closedDate) {
        this(id, reason, issue, status, createdAt, finishResolution, userResolution, attendance);
        this.expirationDate = expirationDate;
        this.closedDate = closedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SupportReason getReason() {
        return reason;
    }

    public void setReason(SupportReason reason) {
        this.reason = reason;
    }

    public String getIssue() {
        return issue;
    }

    public void setIssue(String issue) {
        this.issue = issue;
    }

    public TicketStatus getStatus() {
        return status;
    }

    public void setStatus(TicketStatus status) {
        this.status = status;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getFinishResolution() {
        return finishResolution;
    }

    public void setFinishResolution(String finishResolution) {
        this.finishResolution = finishResolution;
    }

    public User getUserResolution() {
        return userResolution;
    }

    public void setUserResolution(User userResolution) {
        this.userResolution = userResolution;
    }

    public List<TicketComment> getComments() {
        return comments;
    }

    public void setComments(List<TicketComment> comments) {
        this.comments = comments;
    }

    public Attendance getAttendance() {
        return attendance;
    }

    public void setAttendance(Attendance attendance) {
        this.attendance = attendance;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    public Date getClosedDate() {
        return closedDate;
    }

    public void setClosedDate(Date closedDate) {
        this.closedDate = closedDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Ticket ticket = (Ticket) o;
        return id.equals(ticket.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "id=" + id +
                ", reason=" + reason +
                ", issue='" + issue + '\'' +
                ", status=" + status +
                ", createdAt=" + createdAt +
                ", finishResolution='" + finishResolution + '\'' +
                ", userResolution=" + userResolution +
                ", comments=" + comments +
                ", attendance=" + attendance +
                '}';
    }

    @PrePersist
    private void persist() {
        LocalDateTime now = LocalDateTime.now(ZoneOffset.UTC);
        LocalDateTime deadLine = now.plusDays(this.reason.getConfig().getDeadline());

        this.createdAt = Date.from(now.toInstant(ZoneOffset.UTC));
        this.status = TicketStatus.OPENED;
        this.expirationDate = Date.from(deadLine.toInstant(ZoneOffset.UTC));
    }

}
