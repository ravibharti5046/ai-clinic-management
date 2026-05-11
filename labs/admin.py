from django.contrib import admin
from .models import LabTest, LabReport


@admin.register(LabTest)
class LabTestAdmin(admin.ModelAdmin):
    list_display = (
        'test_code',
        'test_name',
        'price',
        'is_active',
    )

    search_fields = (
        'test_code',
        'test_name',
    )

    list_filter = (
        'is_active',
    )


@admin.register(LabReport)
class LabReportAdmin(admin.ModelAdmin):
    list_display = (
        'patient',
        'doctor',
        'lab_test',
        'report_date',
        'status',
        'critical_alert',
    )

    search_fields = (
        'patient__first_name',
        'patient__last_name',
        'lab_test__test_name',
    )

    list_filter = (
        'status',
        'critical_alert',
        'report_date',
    )