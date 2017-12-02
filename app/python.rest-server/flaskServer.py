from flask import Flask, Response

app = Flask(__name__)

@app.route('/dmc/v1.0/schemas')
def schemas():
    resp = Response('{"status": "success","message": "",  "payload": []}')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route('/dmc/v1.0/schemas/schema_id')
def schema_id():
    resp = Response('{"status": "success","message": "",  "payload": ['
                    '{ "name": "Employees", "columns": ['
                    '{"name": "EmployeeID","type": "int","size": 11,"primaryKey": "true","required": "true"}]}]}')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route('/dmc/v1.0/schemas/denorm')
def denorm():
    resp = Response('{"status": "success","message": "",  "payload": ['
                    '{ "name": "Employees", "columns": ['
                    '{"name": "EmployeeID","type": "int","size": 11,"primaryKey": "true","required": "true"}]}]}')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

if __name__ == '__main__':
    app.run()
