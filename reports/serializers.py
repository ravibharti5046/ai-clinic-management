from rest_framework import serializers
from .models import Report


class ReportSerializer(serializers.ModelSerializer):
    patient_name = serializers.SerializerMethodField()
    patient_unique_id = serializers.SerializerMethodField()
    report_file_url = serializers.SerializerMethodField()

    class Meta:
        model = Report
        fields = [
            "id",
            "patient",
            "patient_name",
            "patient_unique_id",
            "report_title",
            "report_file",
            "report_file_url",
            "ai_summary",
            "created_at",
        ]

    def get_patient_name(self, obj):
        return f"{obj.patient.first_name} {obj.patient.last_name}"

    def get_patient_unique_id(self, obj):
        return obj.patient.id

    def get_report_file_url(self, obj):
        request = self.context.get("request")
        if obj.report_file and request:
            return request.build_absolute_uri(obj.report_file.url)
        return None