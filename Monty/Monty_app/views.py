from django.http import HttpResponse, HttpResponseNotFound
from django.shortcuts import render_to_response
# from models import Result
import os
import json
from pprint import pprint


def not_found(request):
    return render_to_response("not_found.html")

def show_results(request):
    with open(os.getcwd()+'/docs/audit.json') as data_file:
        scan_results = json.load(data_file)

    return render_to_response('results.html',scan_results)

def execute_script(request):
    return render_to_response('results.html')

