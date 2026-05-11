from django.contrib import admin
from .models import ClinicProfile


@admin.register(ClinicProfile)
class ClinicProfileAdmin(admin.ModelAdmin):
    list_display = (
        'clinic_name',
        'phone',
        'email',
        'gst_number',
    )