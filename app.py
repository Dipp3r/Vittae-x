from flask import g,Flask,render_template,request,redirect,url_for,sessions
import sqlite3


Database="login_info.db"

app=Flask(__name__)

con=sqlite3.connect(Database)

def connection(query):
    with sqlite3.connect(Database) as con:
        cur=con.cursor()
    cur.execute(query)
    con.commit()
    return con,cur.fetchall()

app.secret_key="arun"
@app.route("/")
@app.route("/home")
def home():
    return render_template("login.html",error="")

@app.route('/login',methods=["POST","GET"]) 
def login():
    usr=request.form["username"]
    pwd=request.form["password"]
    con,row=connection("select password from login_info where username = "+'"'+usr+'"')
    if len(row)==0:
        fetched_pwd=""
    else:
        fetched_pwd=row[0][0]
    if (fetched_pwd==pwd):
        con.close()
        return render_template("home.html",info=usr)
    else:
        con.close()
        return render_template("login.html",error="*wrong password or username")

@app.route('/new_acc',methods={"POST","GET"})
def index():
    return render_template("index.html",msg="Password must contain atleast one upper case letter, a lower case letter, a number, a Special character (@,+,$) and it shouldn't be same as the username")

@app.route('/sign_up',methods=["POST","GET"])
def signup():
    usr=request.form['username']
    pwd=request.form['password']
    constraints={"upper_case":"Password must contain atleast one upper case letter","lower_case":"Password must contain atleast one lower case letter","special_symbol":"Password must contain atleast one special character","numeric":"Password must contain atleast one number","same_as_username":"Password same as user-name"}
    substrings=[]
    str=""
    for char in list(pwd):
        if char.isalpha():
            str=str+char.lower()
        elif (char.isnumeric() or (char in ("@","$","+"))):
            if str:
                substrings.append(str)
            str=""
        else:
            return render_template('index.html',msg="Password must contain only letters, numbers and special characters ('@','$','+')")
    if (pwd in usr) or (usr in pwd):
        constraints["same_as_username"]=True
    for string in substrings:
        if len(string)>=2 and string.isalpha() and (string.lower() in usr.lower()):
            constraints["same_as_username"]=True
    if constraints["same_as_username"]==True:
        return render_template('index.html',msg="Password same as user-name")
    if len(pwd)>=8:
        for char in list(pwd):
            if char.islower():
                constraints["lower_case"]=True
            elif char.isupper():
                constraints["upper_case"]=True
            elif char.isnumeric():
                constraints["numeric"]=True
            elif char in ["+","@","$"]:
                constraints["special_symbol"]=True
        if not(pwd in usr) and not(usr in pwd):
            constraints["same_as_username"]=True
        if constraints["upper_case"]==True and constraints["lower_case"]==True and constraints["numeric"]==True and constraints["special_symbol"]==True:
            QUERY="insert into login_info values("+'"'+usr+'"'+","+'"'+pwd+'"'+")"
            con,row=connection(QUERY)
            con.close()
            return render_template("login.html")
        else:
            error=""
            index=0
            for keys in constraints:
                if constraints[keys]!=True:
                    if index==0:
                        error=error+constraints[keys]
                    else:
                        error=error+", "+constraints[keys][30:]  
                    index+=1   
            return render_template("index.html",msg=error)
         
    else:
        return render_template("index.html",msg="Password must contain atleast 8 characters")
    

if __name__=="__main__":
    app.run(debug=True)
    