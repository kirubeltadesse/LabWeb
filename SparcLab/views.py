from django.shortcuts import render
from django.views.generic import TemplateView
# Create your views here.

import logging

logger = logging.getLogger(__name__)

# class IndexView(TemplateView):
#     template_name = 'SparcLab/index.html'

class HomeView(TemplateView):
    template_name = 'SparcLab/home.html'

class ResearchView(TemplateView):
    template_name = 'SparcLab/research.html'

class HighView(TemplateView):
    template_name = 'SparcLab/highspeedio.html'

class LowView(TemplateView):
    template_name = 'SparcLab/lowpower.html'

class RfView(TemplateView):
    template_name = 'SparcLab/rftest.html'

class SpeciesView(TemplateView):
    template_name = 'SparcLab/speciesindet.html'

class MediaView(TemplateView):
    template_name = 'SparcLab/media.html'

class NewsView(TemplateView):
    template_name = 'SparcLab/news.html'
class AwardView(TemplateView):
    template_name = 'SparcLab/awards.html'

class TeamView(TemplateView):
    template_name = 'SparcLab/team.html'

class PublicationsView(TemplateView):
    template_name = 'SparcLab/publications.html'

class TeachView(TemplateView):
    template_name = 'SparcLab/teaching.html'

class ServiceView(TemplateView):
    template_name = 'SparcLab/service.html'

class ContactView(TemplateView):
    template_name = 'SparcLab/contact.html'

class ChipView(TemplateView):
    template_name = 'SparcLab/chip.html'

class OpenView(TemplateView):
    template_name = 'SparcLab/openings.html'

class HbcView(TemplateView):
    template_name = 'SparcLab/hbc.html'

class DownloadView(TemplateView):
    template_name = 'SparcLab/download.html'
