from flask import Flask, request, jsonify, render_template
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSONB

app = Flask(__name__)
CORS(app)  # Allow requests from all origins

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'
db = SQLAlchemy(app)

# Configure SendGrid
app.config['SENDGRID_API_KEY'] = 'dummy'

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
    Frequency = db.Column(JSONB)
    Options = db.Column(JSONB)  # Use JSONB for PostgreSQL, or JSON for other databases
    Time = db.Column(db.String(50))

# Handle route for survey submission
@app.route('/submit-survey', methods=['POST'])
def submit_survey():
    try:
        survey_data = request.json
        print('Processing survey data:', survey_data)

        # Set 'Frequency' to empty string if not available
        frequency = survey_data.get('Frequency', '')

        # Set 'Frequency' to empty string if not available
        apt = survey_data.get('Apt', '')

        # Set 'Options' to empty list if not available
        options = survey_data.get('Options', [])

        # Update survey data with the modified 'Frequency' and 'Options'
        survey_data['Frequency'] = frequency
        survey_data['Options'] = options
        survey_data['Apt'] = apt

        # Create Survey object with transformed data
        survey = Survey(**survey_data)

        # Save to database
        db.session.add(survey)
        db.session.commit()

        # send_confirmation_emails(survey_data)
        return jsonify(message='Survey submitted successfully!'), 201
    except Exception as e:
        print('Error submitting survey:', e)
        return jsonify(error='Internal server error'), 500

# Function to send confirmation emails
def send_confirmation_emails(data):
    try:
        # Create SendGrid message for user
        message_user = Mail(
            from_email='huzyefahsaqib13@gmail.com',
            to_emails=data['Email'],
            subject='Booking Confirmation',
            html_content=f"""
            <p>Dear {data['Name']},</p>
            <p>Thank you for booking with Paak Cleaning Service! Your booking details are confirmed as follows:</p>
            <table>
              <tr>
                <th>Name</th>
                <td>{data['Name']}</td>
              </tr>
              <tr>
                <th>Service</th>
                <td>{data['Service']}</td>
              </tr>
              <tr>
                <th>Date & Time</th>
                <td>{data['Time']}</td>
              </tr>
            </table>
            <p>We will be contacting you shortly to confirm any additional details.</p>
            <p>If you have any questions, please don't hesitate to contact us.</p>
            <p>Best regards,</p>
            <p>Paak Cleaning Service</p>
            """
        )

        # Initialize SendGrid client
        sg = SendGridAPIClient(app.config['SENDGRID_API_KEY'])

        # Send emails
        response_user = sg.send(message_user)

        print("User email sent with status code:", response_user.status_code)
    except Exception as e:
        print('Error sending confirmation emails:', e)

@app.route('/survey-data')
def survey_data():
    surveys = Survey.query.all()
    print(surveys)
    return render_template('db.html', surveys=surveys)

# Start the server
if __name__ == '__main__':
    print('Starting server...')
    with app.app_context():
        # Create all database tables
        db.create_all()
    app.run(port=5000, debug=True)
