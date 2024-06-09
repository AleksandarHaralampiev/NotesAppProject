from django.db import models


class Note(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    body = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
