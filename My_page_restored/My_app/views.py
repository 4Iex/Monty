from django.http import HttpResponse, HttpResponseNotFound

def hello_world(request):
    html = "<html><body><p>Hello, world!</p></body></html>"
    return HttpResponse(html)

def not_found(request):
    html = HttpResponseNotFound('<h1>Pagina non trovata </h1>')
    return HttpResponse(html)
