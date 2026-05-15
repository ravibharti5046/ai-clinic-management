from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Report
from .serializers import ReportSerializer


class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all().order_by("-created_at")
    serializer_class = ReportSerializer
    parser_classes = [MultiPartParser, FormParser]