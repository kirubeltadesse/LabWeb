from django.shortcuts import render
from django.views.generic import TemplateView
# Create your views here.

import logging

logger = logging.getLogger(__name__)

class IndexView(TemplateView):
    template_name = 'Radiosim/index.html'

class HomeView(TemplateView):
    template_name = 'Radiosim/index.html'

class ResearchView(TemplateView):
    template_name = 'Radiosim/research.html'

class MediaView(TemplateView):
    template_name = 'Radiosim/media.html'

class NewsView(TemplateView):
    template_name = 'Radiosim/news.html'
class AwardView(TemplateView):
    template_name = 'Radiosim/awards.html'

class TeamView(TemplateView):
    template_name = 'Radiosim/team.html'

class PublicationsView(TemplateView):
    template_name = 'Radiosim/publications.html'

class TeachView(TemplateView):
    template_name = 'Radiosim/teaching.html'

class ServiceView(TemplateView):
    template_name = 'Radiosim/service.html'

class ContactView(TemplateView):
    template_name = 'Radiosim/contact.html'

class ChipView(TemplateView):
    template_name = 'Radiosim/chip.html'

class OpenView(TemplateView):
    template_name = 'Radiosim/openings.html'

class HbcView(TemplateView):
    template_name = 'Radiosim/hbc.html'

class DownloadView(TemplateView):
    template_name = 'Radiosim/download.html'
