from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import (
    PrescriptionViewSet,
    download_prescription_pdf
)

router = DefaultRouter()
router.register(
    'prescriptions',
    PrescriptionViewSet,
    basename='prescriptions'
)

urlpatterns = router.urls + [

    path(
        'prescriptions/<uuid:pk>/download/',
        download_prescription_pdf,
        name='download-prescription-pdf'
    ),

]