# Python - Flask
from flask import Flask, session, send_file, jsonify, request

app = Flask(__name__)
app.secret_key = 'your-secret-key'

# Middleware to check CAPTCHA verification
@app.before_request
def check_captcha():
    # Skip for static files and the verify endpoint
    if request.path == '/verify_captcha' or request.path.startswith('/static/'):
        return
    
    if not session.get('captcha_verified'):
        return send_file('pycloud.html')

@app.route('/')
def index():
    return "Welcome! You have successfully passed the CAPTCHA."

@app.route('/verify_captcha', methods=['POST'])
def verify_captcha():
    session['captcha_verified'] = True
    return jsonify(success=True)

if __name__ == '__main__':
    app.run(port=5000)