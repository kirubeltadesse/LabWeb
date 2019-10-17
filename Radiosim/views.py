from django.shortcuts import render
from django.views.generic import TemplateView
# Create your views here.

import logging

logger = logging.getLogger(__name__)


class IndexView(TemplateView):
    template_name = 'Radiosim/index.html'

class HomeView(TemplateView):
    template_name = 'Radiosim/index.html'

