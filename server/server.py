import os
import sys

from bottle import route, run, static_file

PROJECT_ROOT = os.path.dirname(os.path.realpath(sys.modules['__main__'].__file__))
STATIC_DIR = os.path.join(PROJECT_ROOT, 'static')


@route('/')
@route('/<filepath:path>')
def server_static(filepath="index.html"):
    return static_file(filepath, root=STATIC_DIR)


def init():
    run(host='localhost', port=8080)
