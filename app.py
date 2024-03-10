from http import HTTPStatus
import time
import random
import threading
import json
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from flask import Response as ResponseBase

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# This route intentionally fails with CORS error on frontend
@app.route('/')
@app.route('/test-cors-error')
def cors_error():
    return make_response(
        "This should throw a CORS error for frontend, " +
        "but when directly open the page it should show this string"
    )

# This route returns 200 after a random delay
@app.route('/api/succeed-with-delay')
def succeed_with_delay():
    time.sleep(random.randint(5, 10))
    return jsonify(
        route="/succeed-with-delay",
        method="GET",
        timestamp=time.time(),
        message="This operation always succeeds",
        result="succeeded"
    )

# If the method is not GET, this route throws a 405 error
@app.route('/api/test-method-not-allowed', methods=['GET'])
def method_not_allowed():
    method, route, timestamp = request.method, "/api/test-method-not-allowed", time.time()
    return jsonify(
        route=route,
        method=method,
        timestamp=timestamp,
        message="GET RETURN TRUE",
        result="succeeded"
    )  # post return true

# format 405 error response 
@app.errorhandler(405)
def error_handler_405(e):
    route, method, timestamp = request.path, request.method, time.time()
    error_data = dict(
        route=route,
        method=method,
        timestamp=timestamp,
        message=str(e),
        status='failed'
    )
    resp = ResponseBase(json.dumps(dict(error_data), ensure_ascii=False), 405, mimetype='application/json')
    return resp


# This route is for testing JSON ingestion and related errors
@app.route('/api/input-test', methods=['POST'])
def input_test():
    # If there is no json, this route is intentionally set to throw a 400 error without a response body
    posted_data = request.get_json()

    # If there is no key called 'data', this route intentionally throws a 422 error as it's precondition is missing
    try:
        print(f"Using an input of {str(posted_data['data'])}")
    except KeyError as e:
        return jsonify(
            route="/input-test",
            method="POST",
            timestamp=time.time(),
            message=str(e),
            result="failed"
            
        ), HTTPStatus.UNPROCESSABLE_ENTITY

    # If the entered data is not a number this route intentionally throws a 5xx error without a response body
    result = posted_data['data'] * posted_data['data']

    return jsonify(
        route="/input-test",
        method="POST",
        timestamp=time.time(),
        message=f"Processed input: {posted_data['data']}",
        result="succeeded"
    )


# This route is for testing JSON response processing
@app.route('/api/json-response-test', methods=['POST'])
def json_response_test():
    result = random.choice(['succeeded', 'failed'])

    return jsonify(
        route="/json-response-test",
        method="POST",
        timestamp=time.time(),
        message=f"The operation {result}",
        result=result
    )


# This route will sometimes succeed and sometimes fail with random errors
@app.route('/api/sometimes-fail', methods=['POST'])
def sometimes_fail():
    return_codes = [
        HTTPStatus.OK, HTTPStatus.BAD_REQUEST, HTTPStatus.TOO_MANY_REQUESTS, HTTPStatus.INTERNAL_SERVER_ERROR
    ]

    return jsonify(
        route="/sometimes-fail",
        method="POST",
        timestamp=time.time(),
    ), random.choice(return_codes)  # Set a random return code


# Used to save error logs (frontend generated only) for further investigation
@app.route('/api/log-ingestion', methods=["POST"])
def log_ingestion():
    # The logs would typically be written to a database, but for now are just printed to the terminal
    print(request.get_json())


errors = []  # Var for accumulating randomly generated errors


# This thread will occasionally fail and throw an error
def failing_thread():
    while True:
        time.sleep(random.randint(10, 30))  # Fail every 10 to 30 seconds
        error = random.randint(1, 500)  # Generate random error code
        # Generate a new random error
        errors.append(
            dict(
                route='/mock-path',
                method='GET',
                timestamp=time.time(),
                message=f"This is a random recurrent error {hex(error)}",
                status=f"failed"
            )
        )

thread = threading.Thread(target=failing_thread, daemon=True)
thread.start()

@app.after_request
def after_request(resp): 
    # save error into errors list
    route, method, timestamp, message = request.path, request.method, time.time(), '' # default variable
    if method == 'OPTIONS':  # filter options request
        return resp
    if str(resp.status) == "200 OK":
        status = 'succeeded'
        message = '200 OK'
    else:
        status = 'failed'
    if resp.json:
        if 'message' in resp.json: message = resp.json.get('message', '')
        if 'timestamp' in resp.json: timestamp = resp.json.get('timestamp', '')
    errors.append(
        dict(route=route, method=method, timestamp=timestamp, message=message, status=status)
    )
    return resp

@app.route('/api/errors', methods=["GET"])
def get_error():
    message = request.args.to_dict().get("message", None)
    new_errors = errors
    if message:
        new_errors = []
        for error in errors:
            if message in error['message'] or message in error['route']: new_errors.append(error)
    new_errors = sorted(new_errors, key=lambda x: x['timestamp'], reverse=True)  # timestamp sort
    for line in new_errors: line['timestamp'] = int(line['timestamp'])
    return jsonify(data=new_errors)

if __name__ == '__main__':
    app.run(port=9501)

# Feel free to add more routes below to read the error messages
