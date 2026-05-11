from django.shortcuts import render, get_object_or_404
from .models import Bill
from clinic.models import ClinicProfile


def print_invoice(request, bill_id):
    bill = get_object_or_404(Bill, id=bill_id)
    clinic = ClinicProfile.objects.first()

    return render(request, 'billing/invoice.html', {
        'bill': bill,
        'clinic': clinic,
    })