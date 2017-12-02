#from flask import Flask
from flask import Flask, Response, flash, redirect, render_template, request, session, abort
import os

app = Flask(__name__)


@app.route('/')
def home():
    print("AAAAAAAA")
    if not session.get('logged_in'):
        #        return render_template('login.html')
        resp = Response('{"status": "error","message": "",  "payload": []}')
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
    else:
        #       return "Hello Boss!"
        resp = Response('{"status": "success","message": "",  "payload": []}')
        resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


@app.route('/login', methods=['GET', 'POST'])
def do_admin_login():
    print("LOGIN")
    """
    if request.form['password'] == 'password' and request.form['username'] == 'admin':
        session['logged_in'] = True
    else:
        flash('wrong password!')
    return home()
    """
    print(request.data)
    print(request.args.get('username'))
    print(request.args.get('password'))
    resp = Response('{"status": "success","message": "",  "payload": []}')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp



if __name__ == "__main__":
    app.secret_key = os.urandom(12)
#    app.run(debug=True, host='0.0.0.0', port=4000)
    app.run(debug=True)