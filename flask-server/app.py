from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Allow requests from all origins

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'
db = SQLAlchemy(app)

# Configure email
app.config['MAIL_SERVER'] = 'smtp.ethereal.email'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'naomi.funk60@ethereal.email'
app.config['MAIL_PASSWORD'] = 'Z6NU6e8GWJWysaZncY'
app.config['MAIL_USE_TLS'] = True
mail = Mail(app)

# Define schema for survey submissions
class Survey(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100))
    Email = db.Column(db.String(100))
    Phone = db.Column(db.String(20))
    Address = db.Column(db.String(200))
    Apt = db.Column(db.String(50))
    City = db.Column(db.String(50))
    State = db.Column(db.String(50))
    Country = db.Column(db.String(50))
    Service = db.Column(db.String(100))
    Frequency = db.Column(db.String(20))
    Options = db.Column(db.String(200))
    Time = db.Column(db.DateTime)


# Handle route for survey submission

@app.route('/submit-survey', methods=['POST'])
def submit_survey():
    try:
        survey_data = request.json
        print('Processing survey data:', survey_data)

        # Transform keys to match model schema and handle date format
        survey_data['Time'] = datetime.strptime(survey_data['Time'], '%Y-%m-%dT%H:%M')
        survey_data.pop('Time')

        # Create Survey object with transformed data
        survey = Survey(**survey_data)

        # Save to database
        db.session.add(survey)
        db.session.commit()

        send_confirmation_emails(survey_data)
        return jsonify(message='Survey submitted successfully!'), 201
    except Exception as e:
        print('Error submitting survey:', e)
        return jsonify(error='Internal server error'), 500


# Function to send confirmation emails
def send_confirmation_emails(data):
    # Send confirmation email to client
    msg1 = Message('Survey Submission Confirmation',
                   sender='your_business@example.com',
                   recipients=[data['Email']])
    msg1.html = f"""
        <p>Dear {data['Name']},</p>
        <p>Thank you for submitting the booking form. Your booking has been received.</p>
        <p>We will contact you shortly to confirm the details.</p>
        <p>Best regards,</p>
        <p>Paak Cleaning Service</p>
    """
    mail.send(msg1)

    # Send confirmation email to business
    msg2 = Message('New Survey Submission',
                   sender='your_business@example.com',
                   recipients=['business_email@example.com'])
    msg2.html = f"""
        <p>New survey submission:</p>
        <pre>{data}</pre>
    """
    mail.send(msg2)

# Start the server
if __name__ == '__main__':
    with app.app_context():
        # Create all database tables
        db.create_all()
    app.run(port=5000, debug=True)