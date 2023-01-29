import requests
import json
import sys

"""
python testendpoints.py [init] [list] [post] [get]
"""

if 'init' in sys.argv:
    print("=== ADD PERSONAS ===")
    #Add Persona
    with open('payload_setup.json') as json_file:
        data = json.load(json_file)
        resp = requests.post('http://localhost:3001/add-persona', json=data)
        print(resp.__dict__)
        print("\n==============================================================\n")

#List Persona
if 'list' in sys.argv:
    print("=== LIST PERSONAS ===")
    resp = requests.get('http://localhost:3001/list-personas')
    print(resp.__dict__)
    print("\n==============================================================\n")

#Chat (POST)
if 'post' in sys.argv:
    print("=== CHAT WITH FRED (POST) ===\n")
    with open('payload_prompt.json') as json_file:
        data = json.load(json_file)
        resp = requests.post('http://localhost:3001/chat/fred', json=data)
        print(resp.__dict__)
        print("\n==============================================================\n")

#Chat (GET)
if 'get' in sys.argv:
    print("=== CHAT WITH FRED (GET) ===\n")
    resp = requests.get('http://localhost:3001/chat/fred')
    print(resp.__dict__)
