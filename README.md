# McHacks10

## Flask Backend
### Starting the server 
_(localhost:3001 by default)_
1. `cd McHacks/backend`
1. `touch .env`
1. `echo APIKEY="{COHERE_API_KEY" > .env`
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