from django.db import models
import uuid
from patients.models import Patient


class Report(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name="reports"
    )

    report_title = models.CharField(max_length=255)

    report_file = models.FileField(
        upload_to="reports/"
    )

    ai_summary = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient} - {self.report_title}"