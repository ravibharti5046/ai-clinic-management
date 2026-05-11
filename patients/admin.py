from django.contrib import admin
from .models import Patient
from labs.models import LabReport


class LabReportInline(admin.TabularInline):
    model = LabReport
    extra = 0
    readonly_fields = (
        'lab_test',
        'report_file',
        'report_date',
        'status',
        'ai_summary',
        'critical_alert',
    )

    can_delete = False


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = (
        'patient_code',
        'first_name',
        'last_name',
        'gender',
        'phone',
        'blood_group',
        'created_at',
    )

    search_fields = (
        'patient_code',
        'first_name',
        'last_name',
        'phone',
    )

    list_filter = (
        'gender',
        'blood_group',
    )

    inlines = [LabReportInline]