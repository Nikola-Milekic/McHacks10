from flask import Flask, jsonify, request
from dotenv import load_dotenv
from pathlib import Path
import os
import cohere
import conversant
import pathlib
import json

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

@app.route('/add-persona', methods=['GET', 'POST'])
def add_persona():
    content = request.json
    name = content['name'].lower()
    examples = content['examples']

    with open('personas/template.json') as f:
        template = json.load(f)
    template['chat_prompt_config']['examples'] = examples

    os.mkdir(f'personas/{name}')
    out = json.dumps(template, indent=4)
    with open(f'personas/{name}/config.json', 'w+') as f:
        f.write(out)

    return "all good bro"
    


if __name__ == '__main__':
    app.run(host="localhost", port=3001, debug=True)