from django.contrib import admin
from .models import Appointment


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "patient",
        "doctor",
        "appointment_date",
        "appointment_time",
        "status",
        "queue_number",
    )

    list_filter = ("status", "appointment_date", "doctor")

    search_fields = (
        "patient__first_name",
        "patient__last_name",
        "symptoms",
    )