from django.contrib import admin
from .models import Prescription


@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin):
    list_display = ('patient', 'doctor', 'follow_up_date', 'created_at')
    search_fields = ('patient__name', 'doctor__name', 'diagnosis')