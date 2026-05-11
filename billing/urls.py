from django.urls import path
from .views import print_invoice

urlpatterns = [
    path(
        'bills/<uuid:bill_id>/invoice/',
        print_invoice,
        name='print_invoice'
    ),
]