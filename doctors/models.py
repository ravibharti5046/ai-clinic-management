import uuid
from django.db import models
from accounts.models import User


class Doctor(models.Model):

    SPECIALIZATION_CHOICES = (
        ('GENERAL', 'General Physician'),
        ('CARDIOLOGY', 'Cardiology'),
        ('DERMATOLOGY', 'Dermatology'),
        ('NEUROLOGY', 'Neurology'),
        ('ORTHOPEDIC', 'Orthopedic'),
        ('PEDIATRIC', 'Pediatric'),
        ('ENT', 'ENT'),
    )

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='doctor_profile'
    )

    doctor_code = models.CharField(
        max_length=50,
        unique=True
    )

    specialization = models.CharField(
        max_length=50,
        choices=SPECIALIZATION_CHOICES
    )

    qualification = models.CharField(
        max_length=255
    )

    experience_years = models.PositiveIntegerField()

    consultation_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    phone = models.CharField(
        max_length=15
    )

    address = models.TextField(
        blank=True,
        null=True
    )

    available = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.doctor_code} - Dr. {self.user.first_name}"