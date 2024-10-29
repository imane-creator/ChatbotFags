from django.shortcuts import render
from django.http import JsonResponse
import json
from chatbotFaqs.chatbotClass import Chatbot

chatbot = Chatbot('chatbot/data/faqs.json')

def get_response(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_input = data.get("question", "")
        response = chatbot.get_response(user_input)
        return JsonResponse({"response": response})
    return JsonResponse({"error": "Invalid request method"}, status=400)

def chatbot_page(request):
    return render(request, 'chatbot/chatbot.html')
