import json
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from pathlib import Path
import os
import cohere
import conversant
import pathlib
import json
from flask_cors import CORS

load_dotenv()
COHERE_API_KEY = os.environ.get('APIKEY')

app = Flask(__name__)
CORS(app)
personaDir = str(pathlib.Path().resolve())+"/src/personas"
srcDir = str(pathlib.Path().resolve())+"/src"
co = cohere.Client(COHERE_API_KEY)

@app.route('/list-personas')
def list_personas():
    """
    Retrieves all persona names in a .
    """
    personaNames = [f for f in os.listdir(personaDir) if os.path.isdir(os.path.join(personaDir, f))]
    return jsonify(personaNames)

@app.route('/add-persona', methods=['POST'])
def add_persona():
    """
    Endpoint to create a new persona config.
    ---
    POST:
    {
        "name": "John Doe"
        "examples": [
            {
                "user": "{QUESTION}"
                "bot": "{RESPONSE}"
            },
            ...
        ]
    }
    """

    content = request.json
    print(content)
    name = content[0]['answer'].lower()
    questions = content
    for q in questions:
        q.pop('id', None)
        q.pop('question')
        q['user'] = q.pop('realQuestion')
        q['bot'] = q.pop('answer')

    with open(f'{srcDir}/template.json') as f:
        template = json.load(f)
    template['chat_prompt_config']['examples'] = [questions,[]]

    if not os.path.exists(f'{personaDir}/{name}'):
        os.mkdir(f'{personaDir}/{name}')
    out = json.dumps(template, indent=4)
    with open(f'{personaDir}/{name}/config.json', 'w') as f:
        f.write(out)

    return "All good bro.", 200
    
@app.route('/chat/<name>', methods = ['POST', 'GET'])
def chat_with_friend(name):
    """
    Endpoint to chat with a buddy and retrieve a chat history.
    
    Parameters:
    name: str
        Name of the buddy you want to chat with.
    ---
    POST:
    {
        "prompt": "{MESSAGE}"
    }
    """

    name = name.lower()
    if(request.method == 'POST'):
        req = request.json
        prompt = req['prompt']
        bot = conversant.PromptChatbot.from_persona(name, client=co, persona_dir=personaDir)
        with open(f'{personaDir}/{name}/config.json') as f:
            persona = json.load(f)
        chatLogs = persona['chat_prompt_config']['examples'][-1]
        for log in chatLogs:
            bot.chat_history.append(bot.prompt.create_interaction(log["user"], log["bot"]))
            bot.prompt_history.append(log["user"])
            bot.prompt_size_history.append(
                bot.co.tokenize(
                    bot.prompt.create_interaction_string(log["user"], log["bot"])
                ).length
            )
        bot.reply(prompt)
        persona['chat_prompt_config']['examples'][-1].append(bot.chat_history[-1])
        out = json.dumps(persona, indent=4)
        with open(f'{personaDir}/{name}/config.json', "w") as f:
            f.write(out)
        return jsonify(persona['chat_prompt_config']['examples'][-1])
    elif(request.method == 'GET'):
        with open(f'{personaDir}/{name}/config.json') as f:
            persona = json.load(f)
        return jsonify(persona['chat_prompt_config']['examples'][-1])

if __name__ == '__main__':
    app.run(host="localhost", port=3001, debug=True)