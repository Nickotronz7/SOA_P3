#https://vegibit.com/how-to-use-forms-in-python-flask/

#use flask for backend and requests to post
from flask import Flask
from flask import request
from datetime import date
import requests

#start flask app
app = Flask(__name__)

#open html file
text_file1 = open("refresh.html", "r")
#read whole file to a string
index_string1 = text_file1.read()

#open initial html file
text_file1 = open("form.html", "r")
#read whole file to a string
index_string2 = text_file1.read()


#main page
@app.route("/")
def index():
    #load main page from html file
    return (index_string2)

#redirected url when form is posted
@app.route('/refresh', methods=['GET', 'POST'])
def refresh():
    #url to post
    url = 'http://34.139.142.87:4000/api/bills/new'
    #get current date
    today = date.today()
    #create JSON to post
    myobj = {
        "creation_date": today.strftime("%Y-%m-%d-"),
        "amount": int(request.form['monto']),
        "description": request.form['descripcion'],
        "employee_name": request.form['responsable'],
        "department": request.form['departamento']
    }
    #post request to load balancer URL
    x = requests.post(url, json = myobj)
    print(x.text)
    #reload the page after post
    return (index_string1)

#start the app
app.run(debug=True, host='0.0.0.0', port=80)

