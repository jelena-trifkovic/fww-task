import argparse
from subprocess import Popen, PIPE
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent

def perform_action(command_list, cwd=ROOT_DIR):
    process = Popen(command_list, stdout=PIPE, stderr=PIPE, shell=True, cwd=cwd)
    stdout, stderr = process.communicate()
    if stderr:
        print('Errors encountered while performing action:')
        print(stderr)

parser = argparse.ArgumentParser(description='Project setup / runner')
parser.add_argument('action', type=str,
                    help='What action to perform. Possible actions: setup, run')

args = parser.parse_args()

if args.action == 'setup':
    print('Setting up backend.')
    print('Setting up a virtual environment.')
    perform_action(['python', '-m', 'venv', 'env'])
    perform_action([ROOT_DIR / 'env' / 'Scripts' / 'activate'])
    print('Installing Django.')
    perform_action(['pip', 'install', 'django'])
    print('Installing Django REST.')
    perform_action(['pip', 'install', 'djangorestframework'])
    print('Installing Django CORS headers.')
    perform_action(['pip', 'install', 'django-cors-headers'])
    print('Installing SimpleJWT.')
    perform_action(['pip', 'install', 'djangorestframework_simplejwt'])
    print('Migrating DB.')
    perform_action(['python', ROOT_DIR / 'backend' / 'manage.py', 'migrate'])
    print('Backend setup complete. Setting up frontend.')
    print('Installing npm dependecies.')
    perform_action(['npm', 'install'], cwd=ROOT_DIR / 'frontend')

elif args.action == 'run':
    py_server = Popen(['python', 'manage.py', 'runserver'],
	                  stdout=PIPE, stderr=PIPE,
					  cwd=ROOT_DIR / 'backend',
					  shell=True)
    npm_server = Popen(['npm', 'start'],
					   stdout=PIPE, stderr=PIPE,
	                   cwd=ROOT_DIR / 'frontend',
					   shell=True)
    stdout_py, stderr_py = py_server.communicate()
    stdout_npm, stderr_npm = npm_server.communicate()

else:
    parser.error(f'Unknown action: {args.action}')
    