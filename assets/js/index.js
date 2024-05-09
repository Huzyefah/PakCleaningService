const survey = new Survey.Model(json);
survey.applyTheme(themeJson);
survey.onComplete.add((sender, options) => {
    const data = sender.data;
    console.log('Survey data:', data); // Debugging statement
    submitSurvey(data);
});

const submitSurvey = async (data) => {
    try {
        console.log('Submitting survey data:', data); // Debugging statement
        const response = await fetch('/submit-survey', { // <-- Ensure the URL is correct here
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            console.log('Survey submitted successfully!');
        } else {
            console.error('Failed to submit survey:', response.statusText);
        }
    } catch (error) {
        console.error('Error submitting survey:', error);
    }
};

$("#surveyElement").Survey({ model: survey });
