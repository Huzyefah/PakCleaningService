const json = {
    "title": "Paak Cleaning Service",
    "description": "Edmonton, AB     (647)-206-5523",
    "logo": "./assets/images/logo-white .png",
    "logoWidth": "auto",
    "logoHeight": "100",
    "logoFit": "fill",
    "completedHtml": "<div style=\"max-width:564px;text-align:center;margin:16px auto;\">\n\n<div style=\"padding:0 24px;\">\n<h4>Booking Form Successfully Saved.</h4>\n<br>\n<p>You've successfully completed the Paak Cleaning Services Booking Form. You will receive a confirmation email shortly.</p>\n</div>\n</div><a href=\"index.html\" class=\"btn btn-primary\">Back to Home</a>",
    "pages": [
      {
        "name": "page1",
        "elements": [
          {
            "type": "text",
            "name": "Name",
            "title": "Name",
            "isRequired": true,
            "autocomplete": "name"
          },
          {
            "type": "text",
            "name": "Email",
            "title": "Email Address",
            "isRequired": true,
            "inputType": "email",
            "autocomplete": "email"
          },
          {
            "type": "text",
            "name": "Phone",
            "title": "Phone Number",
            "isRequired": true,
            "inputType": "tel",
            "autocomplete": "tel"
          }
        ],
        "title": "STEP 1: Who You Are"
      },
      {
        "name": "page2",
        "elements": [
          {
            "type": "text",
            "name": "Address",
            "title": "Address",
            "isRequired": true,
            "autocomplete": "street-address"
          },
          {
            "type": "text",
            "name": "Apt",
            "title": "Apt./ Suite #"
          },
          {
            "type": "text",
            "name": "City",
            "title": "City",
            "defaultValueExpression": "Edmonton",
            "readOnly": true
          },
          {
            "type": "text",
            "name": "State",
            "title": "State",
            "defaultValueExpression": "AB",
            "readOnly": true
          },
          {
            "type": "text",
            "name": "Country",
            "title": "Country",
            "defaultValueExpression": "Canada",
            "readOnly": true
          }
        ],
        "title": "STEP 2: Your Home"
      },
      {
        "name": "page3",
        "elements": [
          {
            "type": "dropdown",
            "name": "Service",
            "title": "Service",
            "description": "(+$30 fixed charges)",
            "isRequired": true,
            "choices": [
              {
                "value": "House Cleaning",
                "text": "House Cleaning (Regular, Bi-Weekly, Monthly)"
              },
              {
                "value": "Apartment Cleaning",
                "text": "Apartment Cleaning ($25 per hour)"
              },
              {
                "value": "Move In/ Move Out Cleaning",
                "text": "Move In/ Move Out Cleaning ($35 per hour)"
              },
              {
                "value": "Party / Wedding Kitchen Helper",
                "text": "Party / Wedding Kitchen Helper ($30 per hour)"
              },
              {
                "value": "Party/ Wedding Cleaning",
                "text": "Party/ Wedding Cleaning ($35 per hour)"
              },
              {
                "value": "Airbnb Cleaning",
                "text": "Airbnb Cleaning ($30 per hour)"
              },
              {
                "value": "Deep Cleaning",
                "text": "Deep Cleaning ($30)"
              },
              {
                "value": "Pressure Washing Driveways / Sidewalks",
                "text": "Pressure Washing Driveways / Sidewalks ($35)"
              },
              {
                "value": "Carpet Cleaning",
                "text": "Carpet Cleaning ($35)"
              },
              {
                "value": "Iron Service ",
                "text": "Iron Service (More Options)"
              }
            ],
            "showOtherItem": true
          },
          {
            "type": "checkbox",
            "name": "Frequency",
            "visibleIf": "{Service} = 'House Cleaning'",
            "title": "Frequency",
            "isRequired": true,
            "choices": [
              {
                "value": "Regular",
                "text": "Regular ($25 per hour)"
              },
              {
                "value": "Bi-Weekly",
                "text": "Bi-Weekly ($25)"
              },
              {
                "value": "Monthly",
                "text": "Monthly ($30)"
              }
            ],
            "maxSelectedChoices": 1,
            "minSelectedChoices": 1
          },
          {
            "type": "checkbox",
            "name": "Options",
            "visibleIf": "{Service} = 'Iron Service '",
            "isRequired": true,
            "choices": [
              "Full 3 Piece Lady ($18)",
              "Female 2 piece ($12)",
              "Man Cotton ($15)",
              "Bedsheet ($20)",
              "Pillow Cover ($10)",
              "Kids Clothes ($8)"
            ],
            "showOtherItem": true,
            "minSelectedChoices": 1
          }
        ],
        "title": "STEP 3: Choose Your Service"
      },
      {
        "name": "page4",
        "elements": [
            {
                "type": "text",
                "name": "Time",
                "title": "Preferred Date & Time",
                "isRequired": true,
                "inputType": "datetime-local"
              }
              
        ],
        "title": "STEP 4: When Do We Arrive?"
      }
    ],
    "showCompletedPage": true,
    "showQuestionNumbers": "off",
    "questionErrorLocation": "bottom",
    "showProgressBar": "auto",
    "progressBarInheritWidthFrom": "survey",
    "allowCompleteSurveyAutomatic": false,
    "completeText": "Confirm",
    "widthMode": "static",
    "width": "904",
    "headerView": "advanced"
  }
  