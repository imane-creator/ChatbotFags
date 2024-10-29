
from django.contrib import admin
from django.urls import path

from chatbot.views import get_response, chatbot_page

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", chatbot_page, name="chatbot_page"),
    path("get-response/", get_response, name="get_response"),
]
