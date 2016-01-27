from django.http import HttpResponse, HttpResponseNotFound
from django.shortcuts import render_to_response

var = { 'title_of_page' : 'Omar Desogus' }

def profile(request):
    return render_to_response("profile.html", var)

def blog(request):
    return render_to_response("blog.html", var)

def not_found(request):
    return render_to_response("not_found.html", var)

