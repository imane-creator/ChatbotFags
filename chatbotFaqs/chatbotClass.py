import json
from chatbot.nlp_utils import NLPUtils

class Chatbot:
    def __init__(self, faq_file):
        self.faq_data = self.load_faqs(faq_file)
        self.questions = [item['question'] for item in self.faq_data]
        self.answers = [item['answer'] for item in self.faq_data]
        self.nlp_utils = NLPUtils(self.questions)

    def load_faqs(self, file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)

    def get_response(self, user_question):
        best_match_index, similarity_score = self.nlp_utils.find_best_match(user_question)
        if similarity_score > 0.2:  # Ajustez le seuil selon vos besoins
            return self.answers[best_match_index]
        if user_question.strip() in ["?", ""]:
            return "Je suis là pour répondre à vos questions. Essayez d'être un peu plus spécifique !"

        else:
            return "Désolé, je ne comprends pas votre question."
