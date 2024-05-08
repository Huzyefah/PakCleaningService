const survey = new Survey.Model(json);
survey.applyTheme(themeJson);

function sendDataToServer(survey) {
    // Extract data from the survey
    const data = {
        "City": survey.data.City,
        "State": survey.data.State,
        "Country": survey.data.Country,
        "Name": survey.data.Name,
        "Email": survey.data.Email,
        "Phone Number": survey.data["Phone Number"],
        "Address": survey.data.Address,
        "Apt": survey.data.Apt,
        "Service": survey.data.Service,
        "Time": survey.data.Time
        // Add other form fields as needed
    };

    // Send the data to your server
    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbx0ec7cxIIASQeuXLbnh1Ocb2PvxjBZ-EEZMbcI1lnwYJ22l5eP2tNGtTrYP4nG5-hHxw/exec',
        type: 'post',
        contentType: 'application/json', // Specify content type as JSON
        data: JSON.stringify(data), // Stringify the data object
        success: function(response) {
            console.log('Data sent successfully:', response);
            // Optionally, handle the success response
        },
        error: function(xhr, status, error) {
            console.error('Error sending data:', error);
            // Optionally, handle the error
        }
    });
}


survey.onComplete.add((sender, options) => {
    sendDataToServer(sender); // Call sendDataToServer when the survey is completed
});

$("#surveyElement").Survey({ model: survey });
