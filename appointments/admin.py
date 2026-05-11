from django.contrib import admin
from .models import Appointment, Prescription


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = (
        'patient',
        'doctor',
        'appointment_date',
        'appointment_time',
        'status',
        'queue_number',
    )

    search_fields = (
        'patient__first_name',
        'patient__last_name',
        'doctor__user__first_name',
        'doctor__doctor_code',
    )

    list_filter = (
        'status',
        'appointment_date',
        'doctor',
    )

@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin):
    list_display = (
        'appointment',
        'follow_up_date',
        'created_at',
    )

    search_fields = (
        'appointment__patient__first_name',
        'appointment__patient__last_name',
    )