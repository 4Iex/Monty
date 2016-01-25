from django.http import HttpResponse, HttpResponseNotFound
from django.shortcuts import render_to_response

var = { 'title_of_page' : 'Omar Desogus' }

def home(request):
    return render_to_response("home.html", var)

def not_found(request):
    return render_to_response("not_found.html", var)

