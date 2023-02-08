<div align="center">
    <div id="user-content-toc">
      <ul>
          <summary><h1 style="display: inline-block; margin-bottom:0px">Build-a-Buddy</h1></summary>
      </ul>
    </div>
    <h3>Create specialized conversational chat bots with a user-friendly UI.</h3>
    <h4><i>McHacks10 - McGill University Hackathon</i></h4>
    <br>
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white"/>
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB"/>
    <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white"/>
    <img src="https://img.shields.io/badge/python-3670A0?style=flat-square&logo=python&logoColor=ffdd54"/>
    <img src="https://img.shields.io/badge/flask-%23000.svg?style=flat-square&logo=flask&logoColor=white"/>
    <br><br>
</div>

https://user-images.githubusercontent.com/47335043/217393526-e9748c6a-ff0c-4c1f-896e-dcead7ab559d.mov

<br>
<div align="center">Powered by Cohere's API for NLP.</div>

# Getting started
## Flask Backend
### Starting the server 
_(localhost:3001 by default)_
1. `cd McHacks/backend`
1. `touch .env`
1. `echo APIKEY="{COHERE_API_KEY}" > .env`
1. `python3 -m venv venv`
1. `source venv/bin/activate` (MacOS/*nix)
1. `pip install -r requirements.txt`
1. `python3 src/server.py`

### Flask Endpoints 
1. /list-personas
    Retrieves all available personas.
2. /add-persona
    (POST) Creates a new persona config.
    Expects a POST payload of the following format:
    ```
    [
        {
            "id": {ID}, 'optional'
            "question": "{UI FRIENDLY QUESTION}", 'optional'
            "realQuestion": "{QUESTION}", 'required'
            "answer": "{RESPONSE}" 'required
        },
        ...
    ]
    ```
    Returns an array of all persona names.
3. /chat/{PERSONA}
    (POST) Creates one new interaction with the {PERSONA}.
    Expects a POST payload of the following format:
    ```
    {
        "prompt": "{MESSAGE/QUESTION/ETC}"
    }
    ```
    (GET) Retrieves all interactions with {PERSONA}
    Returns an array of individual interactions in the following format:
    ```
    [  
        {    
            "user": "{MESSAGE/QUESTION/ETC}",
            "bot": "{RESPONSE}"
        },
        ...
    ]
    ```
## React Frontend
### Starting the app
_(localhost:3000 by default)_
1. `cd McHacks/frontend`
1. `npm i`
1. `npm start`
