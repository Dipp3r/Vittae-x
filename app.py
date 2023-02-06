from flask import g,Flask,render_template,request,redirect,url_for,sessions,send_from_directory,jsonify
import sqlite3
import json
import random,math

Database="login_info.db"

app=Flask(__name__, static_folder="build/static", template_folder="build")

con=sqlite3.connect(Database)

def connection(query,values):
    with sqlite3.connect(Database) as con:
        cur=con.cursor()
    cur.execute(query,values)
    con.commit()
    return con,cur.fetchall()
app.debug = True
app.secret_key="arun"


# con.execute('CREATE TABLE users (name TEXT, email TEXT, password TEXT,userID TEXT primary key)')
# con.execute('CREATE TABLE customers (name TEXT, email TEXT, password TEXT,dataOfReg DATE,stage INT,customerID primary key)')
def genRandomID(len):
    return "".join([f'{math.floor(random.random()*10)}' for i in range(len) ])

@app.route("/")
def home():
    return render_template('index.html')


@app.route('/login',methods=["POST"]) 
def login():
    data = json.loads(request.data)
    print(data)
    status = 0
    result = connection("SELECT userID from users where name = ?",(data['name'],))
    if len(result[1]) == 0:
        status = 1
    else:
        result = connection("SELECT userID from users where name = ? and password = ?",(data['name'],data['password']))
        if len(result[1]) == 0:
            status = 3
        else:
            userID = result[1][0]
            print(userID)
            status = 2
    #need to get login information (from client) and send responce (to client) as {status:INT}
    #INT = 1 =>  'not yet registered!!!'
    #INT = 2 =>  'successfully logged in!'
    #INT = 3 =>  'forgot password?'
    return jsonify({'status':status})

@app.route('/signUp',methods=["POST"])
def signup():
    data = json.loads(request.data)
    print(data)
    userID = genRandomID(4)
    status = 0

    result = connection("SELECT userID from users where name = ?",(data['name'],))
    if len(result[1]) > 0:
        status = 5
        result = connection("SELECT userID from users where name = ? and password = ?",(data['name'],data['password']))
        if len(result[1]) == 1:
            status = 6
    else:
        connection("INSERT INTO users (userID,name,password,email) VALUES (?,?,?,?)",(userID,data['name'],data['password'],data['email']))
        status = 4
    print('reg END',status)
    #need to get reg info. (from client) and send responce (to clint) as {status:INT}
    #INT = 4 =>  'registration completed!!!'
    #INT = 5 =>  'user name taken!'
    #INT = 6 =>  'already registered!!'
    return jsonify({'status':status})


if __name__=="__main__":
    app.run(debug=True)
    