from django.urls import path, re_path
from Radiosim import views
# Create your views here.

urlpatterns=[
    path('', views.IndexView.as_view(), name='index'),
]
