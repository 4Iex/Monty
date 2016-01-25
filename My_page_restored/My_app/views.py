from django.http import HttpResponse, HttpResponseNotFound
from django.shortcuts import render_to_response

def home(request):
    var = { 'title_of_page' : 'Omar Desogus' }
    return render_to_response("homeTemplate.html", var)

def not_found(request):
    html = HttpResponseNotFound('<h1>Pagina non trovata </h1>')
    return HttpResponse(html)


# Esempio templates
def templ(request):
    a = {
        'get_absolute_url' : 'http://google.com',
        'descrizione' : 'Google',
        'info' : 'Motore di ricerca'
    }
    b = {
        'get_absolute_url' : 'http://facebook.com',
        'descrizione' : 'Facebook',
        'info' : 'Social Network'
    }
    variables = {
        'sezione':
            {'titolo': 'Esempio Templates'},
            'variabile' : [a, b]
    }
    return render_to_response("esempio_templ.html", variables)
