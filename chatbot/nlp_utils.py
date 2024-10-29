import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
nlp = spacy.load("en_core_web_sm")

class NLPUtils:
    def __init__(self, questions):
        self.vectorizer = TfidfVectorizer()
        self.question_vectors = self.vectorizer.fit_transform(questions)

    def find_best_match(self, user_question):
        user_vector = self.vectorizer.transform([user_question])
        similarities = cosine_similarity(user_vector, self.question_vectors).flatten()
        best_match_index = similarities.argmax()
        return best_match_index, similarities[best_match_index]
