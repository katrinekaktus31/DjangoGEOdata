from django.shortcuts import render
from django.core import serializers
from django.views.generic import ListView

from .models import Article, Earthquake

""" serialize GEOJSON for earthquake2.html """
with open('D:/python_project/PC_project/diploma/GISDjango/gis/static/tableQuake1.geojson', "w",
          encoding="utf-8") as out:
    mast_point = serializers.serialize('geojson', Earthquake.objects.all(),
                                       geometry_field='geography',
                                       fields=('earthquake_id', 'mag', 'place', 'datetime'))
    out.write(mast_point)


class Home(ListView):
    """ home view with all articles about all earthquake"""
    model = Article
    template_name = 'gis/home.html'
    context_object_name = 'obj'


def about(request):
    """ description of the project for users"""
    return render(request, 'gis/about.html')


def add_layer(request):
    """ funk for adding  zip, shp layer on map"""
    return render(request, 'gis/add_layer.html')


def earthqueaks(request):
    """ funk for 3D obj visualization """
    return render(request, 'gis/earthqueaks.html')


# add cors-headers to acces localhost
def earthquaks2(request):
    response = render(request, 'gis/earthquaks2.html', {})
    response["Access-Control-Allow-Origin"] = "http://localhost:8080/"
    response["Access-Control-Allow-Methods"] = "GET"
    response["Access-Control-Allow-Headers"] = "http://127.0.0.1:8000/"
    response['Cache-Control'] = 'no-cache'
    return response


class GetArticle(ListView):
    """ funk that view article about earthquake that user chose on map"""
    model = Article
    template_name = 'gis/article.html'
    context_object_name = 'obj'

    def get_queryset(self):
        return Article.objects.filter(fk_earthquake_id_id=self.kwargs['pk'])


