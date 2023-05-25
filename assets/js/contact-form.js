var form = document.getElementById("contact-form");

async function handleSubmit(event) {
  event.preventDefault();
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      console.log("Thanks for your submission!");
      form.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          console.log(data["errors"].map(error => error["message"]).join(", "));
        } else {
          console.log("Oops! There was a problem submitting your form");
        }
      })
    }
  }).catch(error => {
    console.log("Oops! There was a problem submitting your form");
  });
}
form.addEventListener("submit", handleSubmit)