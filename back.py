#https://vegibit.com/how-to-use-forms-in-python-flask/

from flask import Flask
from flask import request
from flask import redirect
from flask import render_template
from datetime import datetime


app = Flask(__name__)

#open html file
text_file1 = open("form.html", "r")
#read whole file to a string
index_string1 = text_file1.read()


#main page
@app.route("/")
def index():
    return (index_string1)

@app.route('/shortenurl', methods=['GET', 'POST'])
def shortenurl():
    return (index_string1)

app.run(debug=True, host='0.0.0.0')

