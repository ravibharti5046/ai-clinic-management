from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = (
        ('ADMIN', 'Admin'),
        ('DOCTOR', 'Doctor'),
        ('RECEPTIONIST', 'Receptionist'),
        ('LAB_STAFF', 'Lab Staff'),
        ('PHARMACIST', 'Pharmacist'),
        ('BILLING_STAFF', 'Billing Staff'),
        ('PATIENT', 'Patient'),
    )

    role = models.CharField(max_length=30, choices=ROLE_CHOICES, default='PATIENT')
    phone = models.CharField(max_length=15, blank=True, null=True)

    groups = models.ManyToManyField(
        Group,
        related_name="accounts_user_groups",
        blank=True,
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name="accounts_user_permissions",
        blank=True,
    )

    def __str__(self):
        return f"{self.username} - {self.role}"