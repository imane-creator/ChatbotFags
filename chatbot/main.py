from chatbotFaqs.chatbotClass import Chatbot

def main():
    chatbot = Chatbot('C:/Users/hp/Desktop/chatbotFaqs/chatbot/data/faqs.json')
    print("Chatbot FAQ - Tapez 'quit' pour quitter.")

    while True:
        user_input = input("Vous : ")
        if user_input.lower() in ['quit', 'exit']:
            print("Chatbot : Merci d'avoir utilisé notre service.")
            break
        response = chatbot.get_response(user_input)
        print(f"Chatbot : {response}")

if __name__ == "__main__":
    main()
