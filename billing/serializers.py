from rest_framework import serializers
from .models import Bill


class BillSerializer(serializers.ModelSerializer):
    patient_name = serializers.SerializerMethodField()
    patient_unique_id = serializers.SerializerMethodField()
    appointment_details = serializers.SerializerMethodField()

    class Meta:
        model = Bill
        fields = [
            "id",
            "invoice_number",
            "patient",
            "patient_name",
            "patient_unique_id",
            "appointment",
            "appointment_details",
            "consultation_amount",
            "lab_amount",
            "pharmacy_amount",
            "gst_percent",
            "paid_amount",
            "payment_method",
            "insurance_provider",
            "insurance_claim_number",
            "subtotal",
            "gst_amount",
            "total_amount",
            "payment_status",
            "created_at",
        ]

        read_only_fields = [
            "invoice_number",
            "subtotal",
            "gst_amount",
            "total_amount",
            "payment_status",
            "created_at",
        ]

    def get_patient_name(self, obj):
        return f"{obj.patient.first_name} {obj.patient.last_name}"

    def get_patient_unique_id(self, obj):
        return obj.patient.id

    def get_appointment_details(self, obj):
        if obj.appointment:
            return f"{obj.appointment.appointment_date} - {obj.appointment.appointment_time}"
        return "-"