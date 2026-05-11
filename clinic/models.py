from django.db import models


class ClinicProfile(models.Model):
    clinic_name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='clinic_logo/', blank=True, null=True)
    address = models.TextField()
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    gst_number = models.CharField(max_length=50, blank=True, null=True)

    bank_name = models.CharField(max_length=100, blank=True, null=True)
    account_number = models.CharField(max_length=50, blank=True, null=True)
    ifsc_code = models.CharField(max_length=20, blank=True, null=True)

    invoice_terms = models.TextField(
        blank=True,
        null=True,
        default="Thank you for your payment."
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.clinic_name