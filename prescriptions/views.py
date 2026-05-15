from django.http import HttpResponse
from django.template.loader import get_template

from xhtml2pdf import pisa

from rest_framework import viewsets

from .models import Prescription
from .serializers import PrescriptionSerializer


class PrescriptionViewSet(viewsets.ModelViewSet):
    queryset = Prescription.objects.all().order_by('-created_at')
    serializer_class = PrescriptionSerializer


def download_prescription_pdf(request, pk):
    prescription = Prescription.objects.get(id=pk)

    template = get_template("prescriptions/prescription_pdf.html")

    html = template.render({
        "prescription": prescription
    })

    response = HttpResponse(content_type='application/pdf')

    response[
        'Content-Disposition'
    ] = f'attachment; filename="prescription_{prescription.id}.pdf"'

    pisa_status = pisa.CreatePDF(
        html,
        dest=response
    )

    if pisa_status.err:
        return HttpResponse(
            "Error generating PDF",
            status=500
        )

    return response