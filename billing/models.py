from django.db import models
import uuid
from patients.models import Patient
from appointments.models import Appointment


class Bill(models.Model):
    PAYMENT_METHOD_CHOICES = (
        ("CASH", "Cash"),
        ("UPI", "UPI"),
        ("CARD", "Card"),
        ("INSURANCE", "Insurance"),
    )

    PAYMENT_STATUS_CHOICES = (
        ("PENDING", "Pending"),
        ("PARTIAL", "Partial"),
        ("PAID", "Paid"),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    invoice_number = models.CharField(max_length=50, unique=True, blank=True)

    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name="bills"
    )

    appointment = models.ForeignKey(
        Appointment,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="bills"
    )

    consultation_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    lab_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    pharmacy_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    gst_percent = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHOD_CHOICES,
        blank=True,
        null=True
    )

    insurance_provider = models.CharField(max_length=255, blank=True, null=True)
    insurance_claim_number = models.CharField(max_length=255, blank=True, null=True)

    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    gst_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS_CHOICES,
        default="PENDING"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.subtotal = (
            self.consultation_amount +
            self.lab_amount +
            self.pharmacy_amount
        )

        self.gst_amount = (self.subtotal * self.gst_percent) / 100
        self.total_amount = self.subtotal + self.gst_amount

        if self.paid_amount >= self.total_amount and self.total_amount > 0:
            self.payment_status = "PAID"
        elif self.paid_amount > 0:
            self.payment_status = "PARTIAL"
        else:
            self.payment_status = "PENDING"

        if not self.invoice_number:
            self.invoice_number = f"INV-{str(uuid.uuid4())[:8].upper()}"

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.invoice_number} - {self.patient}"