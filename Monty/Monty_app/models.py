from django.db import models
#
#
# class Result(models.Model):
#     key = models.CharField(max_length=50)
#     expected_result = models.CharField(max_length=50)
#     actual_result = models.CharField(max_length=50)
#     objects = ResultsManager()
#
#
# class ResultsManager(models.Manager):
#     def create_result(self, key, expected_result, actual_result):
#         result = self.create(key=key, expected_result=expected_result, actual_result=actual_result)
#         # do something with the book
#         return result
#
#     def create_results(self,results_json):
#         results = []
#         for result in results_json:
#             results.append(self.create(key=results_json.key, expected_result=results_json.expected_result, actual_result=result.actual_result))
#         return results
