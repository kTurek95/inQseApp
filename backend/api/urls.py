from django.urls import path
from . import views


urlpatterns = [
    path("documents/", views.DocumentListCreate.as_view(), name="document-list"),
    path("documents/delete/<int:pk>/", views.DocumentDelete.as_view(), name="delete-document")
]