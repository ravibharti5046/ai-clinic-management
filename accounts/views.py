from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.all()

        role = self.request.query_params.get('role')
        if role:
            queryset = queryset.filter(role=role)

        return queryset