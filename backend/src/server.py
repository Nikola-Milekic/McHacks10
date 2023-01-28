from flask import Flask
from dotenv import load_dotenv
import os

load_dotenv()
COHERE_API_KEY = os.environ.get('APIKEY')

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(host="localhost", port=3001, debug=True)