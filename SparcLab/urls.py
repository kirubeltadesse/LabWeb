from django.urls import path, re_path
from SparcLab import views
# Create your views here.

urlpatterns=[
    # path('', views.IndexView.as_view(), name='index'),
    path('', views.HomeView.as_view(), name='Home'),
    path('research', views.ResearchView.as_view(), name='Research'),
    path('highspeedio', views.HighView.as_view(), name='High'),
    path('lowpower', views.LowView.as_view(), name='Low'),
    path('rftest', views.RfView.as_view(), name='Rf'),
    path('speciesidentification', views.SpeciesView.as_view(), name='Species'),
    path('media', views.MediaView.as_view(), name='Media'),
    path('news', views.NewsView.as_view(), name='News'),
    path('awards', views.AwardView.as_view(), name='Award'),
    path('team', views.TeamView.as_view(), name='Team'),
    path('publications', views.PublicationsView.as_view(), name='Publications'),
    path('teaching', views.TeachView.as_view(), name='Teach'),
    path('service', views.ServiceView.as_view(), name='Service'),
    path('contact', views.ContactView.as_view(), name='Contact'),
    path('chip', views.ChipView.as_view(), name='Chip'),
    path('open', views.OpenView.as_view(), name='Open'),
    path('hbc', views.HbcView.as_view(), name='Hbc'),
    path('download', views.DownloadView.as_view(), name='Download'),
]
