import uuid
from django.db import models
from patients.models import Patient
from doctors.models import Doctor
from appointments.models import Appointment
from accounts.models import User


class LabTest(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    test_code = models.CharField(max_length=50, unique=True)
    test_name = models.CharField(max_length=150)

    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    description = models.TextField(blank=True, null=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.test_code} - {self.test_name}"


class LabReport(models.Model):
    REPORT_STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('UPLOADED', 'Uploaded'),
        ('DELIVERED', 'Delivered'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name='lab_reports'
    )

    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name='lab_reports'
    )

    appointment = models.ForeignKey(
        Appointment,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name='lab_reports'
    )

    lab_test = models.ForeignKey(
        LabTest,
        on_delete=models.CASCADE,
        related_name='reports'
    )

    report_file = models.FileField(
        upload_to='lab_reports/',
        blank=True,
        null=True
    )

    report_date = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=REPORT_STATUS_CHOICES,
        default='PENDING'
    )

    ai_summary = models.TextField(
        blank=True,
        null=True,
        help_text='AI generated report summary. Doctor review required.'
    )

    critical_alert = models.BooleanField(default=False)

    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.patient} - {self.lab_test.test_name}"