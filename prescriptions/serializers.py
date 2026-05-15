from rest_framework import serializers
from .models import Prescription


class PrescriptionSerializer(serializers.ModelSerializer):
    patient_name = serializers.SerializerMethodField()
    doctor_name = serializers.SerializerMethodField()

    class Meta:
        model = Prescription
        fields = [
            "id",
            "patient",
            "patient_name",
            "doctor",
            "doctor_name",
            "diagnosis",
            "symptoms",
            "medicines",
            "advice",
            "follow_up_date",
            "created_at",
        ]

    def get_patient_name(self, obj):
        return f"{obj.patient.first_name} {obj.patient.last_name}"

    def get_doctor_name(self, obj):
        if obj.doctor:
            return str(obj.doctor)
        return "-"