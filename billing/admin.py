from django.contrib import admin
from .models import Bill


@admin.register(Bill)
class BillAdmin(admin.ModelAdmin):
    list_display = (
        "invoice_number",
        "patient",
        "appointment",
        "subtotal",
        "gst_amount",
        "total_amount",
        "paid_amount",
        "payment_status",
        "payment_method",
        "created_at",
    )

    list_filter = (
        "payment_status",
        "payment_method",
        "created_at",
    )

    search_fields = (
        "invoice_number",
        "patient__first_name",
        "patient__last_name",
        "insurance_provider",
        "insurance_claim_number",
    )