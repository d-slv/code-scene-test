package br.com.maidahealth.telemedapi.models;


import javax.persistence.*;

@Entity
public class PaymentConfig {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String merchantId;
    @Column(unique = true)
    private String merchantKey;
    private Integer maxInstallments;
    private String returnUrl;
    @OneToOne(mappedBy = "paymentConfig")
    private HealthInsurer healthInsurer;
    private String salesUrl;
    private String queryUrl;

    public PaymentConfig() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public String getMerchantKey() {
        return merchantKey;
    }

    public void setMerchantKey(String merchantKey) {
        this.merchantKey = merchantKey;
    }

    public Integer getMaxInstallments() {
        return maxInstallments;
    }

    public void setMaxInstallments(Integer maxInstallments) {
        this.maxInstallments = maxInstallments;
    }

    public String getReturnUrl() {
        return returnUrl;
    }

    public void setReturnUrl(String returnUrl) {
        this.returnUrl = returnUrl;
    }

    public HealthInsurer getHealthInsurer() {
        return healthInsurer;
    }

    public void setHealthInsurer(HealthInsurer healthInsurer) {
        this.healthInsurer = healthInsurer;
    }

    public String getSalesUrl() {
        return salesUrl;
    }

    public void setSalesUrl(String salesUrl) {
        this.salesUrl = salesUrl;
    }

    public String getQueryUrl() {
        return queryUrl;
    }

    public void setQueryUrl(String queryUrl) {
        this.queryUrl = queryUrl;
    }
}
