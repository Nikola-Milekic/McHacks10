from flask import Flask, jsonify
from dotenv import load_dotenv
import os
import cohere
import conversant
import pathlib

load_dotenv()
COHERE_API_KEY = os.environ.get('APIKEY')

app = Flask(__name__)
personaDir = str(pathlib.Path().resolve())+"/src/personas"

@app.route('/')
def hello():
    co = cohere.Client(COHERE_API_KEY)
    bot = conversant.PromptChatbot.from_persona("friend", client=co, persona_dir=personaDir)
    return bot.reply("How old are you?")

@app.route('/list-personas')
def listPersonas():
    personaNames = os.listdir(personaDir)
    return jsonify(personaNames)
    


if __name__ == '__main__':
    app.run(host="localhost", port=3001, debug=True)