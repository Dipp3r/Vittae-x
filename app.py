from flask import g,Flask,render_template,request,redirect,url_for,sessions,send_from_directory,jsonify
import sqlite3
import json

Database="login_info.db"

app=Flask(__name__, static_folder="build/static", template_folder="build")

con=sqlite3.connect(Database)

def connection(query):
    with sqlite3.connect(Database) as con:
        cur=con.cursor()
    cur.execute(query)
    con.commit()
    return con,cur.fetchall()
app.debug = True
app.secret_key="arun"

@app.route("/")
@app.route("/home")
def home():
    return render_template('index.html')


@app.route('/login',methods=["POST"]) 
def login():
    data = json.loads(request.data)
    print(data)
    #need to get login information (from client) and send responce (to client) as {status:INT}
    #INT = 0 =>  'not yet registered!!!'
    #INT = 1 =>  'successfully logged in!'
    #INT = 2 =>  'forgot password?'
    return jsonify({'status':1})

@app.route('/signUp',methods=["POST"])
def signup():
    data = json.loads(request.data)
    print(data)
    #need to get reg info. (from client) and send responce (to clint) as {status:INT}
    #INT = 3 =>  'registration completed!!!'
    #INT = 4 =>  'user name taken!'
    #INT = 5 =>  'already registered!!'
    return jsonify({'status':3})


if __name__=="__main__":
    app.run(debug=True)
    