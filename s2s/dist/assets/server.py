import os
import json
import argparse

parser = argparse.ArgumentParser(description="Server to work with SH.")

from flask import Flask, abort, request, Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PROJECT_ROOT = os.getcwd()

parser.add_argument(
    "-p",
    "--port",
    action="store",
    dest="port",
    help="Set server port",
    default=5000,
    type=int,
)

args = parser.parse_args()

# For navigate in FS
@app.route("/list-dir/")
@app.route("/list-dir/<path:dir>")
def getListOfFiles(dir=""):
    absPath = os.path.join(PROJECT_ROOT, dir)

    if not os.path.isdir(absPath):
        return abort(404)

    listdir = os.listdir(path=absPath)
    res = [
        {"name": item, "isFile": os.path.isfile(f"{absPath}/{item}")}
        for item in listdir
    ]

    return json.dumps(res)


# For reading of a file
@app.route("/get-file/<path:filePath>")
def getFile(filePath):
    absPath = os.path.join(PROJECT_ROOT, filePath)

    if not os.path.isfile(absPath):
        return abort(404)

    with open(filePath, "r") as file:
        return file.read()


# For saving of a file
@app.route("/save-file/", methods=["POST"])
def saveFile():
    filePath = request.values.get("filePath", "")
    content = request.values.get("content", "")

    if filePath == "":
        try:
            data = json.loads(request.data.decode("utf-8"))
        except:
            print("Error with decode of request")
            return abort(404) 

        filePath = data.get("filePath", "")
        content = data.get("content", "")

    absPath = os.path.join(PROJECT_ROOT, filePath)

    if not os.path.isfile(absPath):
        return abort(404)

    with open(filePath, "w") as file:
        file.write(content)

    return Response("", 200)


if __name__ == "__main__":
    app.run(debug=True, port=args.port)

