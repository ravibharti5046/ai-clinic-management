from django.contrib import admin
from .models import Report


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "patient",
        "report_title",
        "report_file",
        "created_at",
    )

    search_fields = (
        "patient__first_name",
        "patient__last_name",
        "report_title",
    )

    list_filter = ("created_at",)