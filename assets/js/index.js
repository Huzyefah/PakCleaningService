const survey = new Survey.Model(json);
survey.applyTheme(themeJson);
survey.onComplete.add((sender, options) => {
    const data = sender.data;
    console.log(JSON.stringify(data, null, 3));

    // Make a POST request to the Google Apps Script
    fetch("https://script.google.com/macros/s/AKfycbxSb9q10iqZ5Q1oYwCgJE-SrsKJ84ETLqvtA7-_-3hZ1z47Nx4m4-pGHu-OHYtASHX00g/exec", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.error('Error:', error));
});

$("#surveyElement").Survey({ model: survey });



