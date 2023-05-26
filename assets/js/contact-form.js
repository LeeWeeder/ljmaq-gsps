const form = document.getElementById("contact-form");

const snackbars = document.querySelectorAll(".snackbar");
const responseTexts = document.querySelectorAll(".response");

async function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      showSnackbar(true);
      form.reset()
      document.getElementById("contact-dialog").close();
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          /**
           * Remove on production:
           * console.log(data["errors"].map(error => error["message"]).join(", "));
           */
          showSnackbar(false);
        } else {
          showSnackbar(false);
        }
      })
    }
  }).catch(error => {
    showSnackbar(false);
  });
}

let timeoutID;

function showSnackbar(success, message = "") {
  /**
   * TODO: documentation
   */
  if (success) {
    responseTexts.forEach(responseText => {
      responseText.innerText = message === "" ? "message sent successfully" : message;
    });
  } else {
    snackbars.forEach(snackbar => {
      snackbar.style.setProperty("background-color", "var(--error-color)");
    });

    responseTexts.forEach(responseText => {
      responseText.style.setProperty("color", "var(--secondary-color)");
      responseText.innerText = message === "" ? "something went wrong" : message;
    });
    document.querySelectorAll(".material-symbols-sharp").forEach(closeButton => {
      closeButton.style.setProperty("color", "var(--secondary-color)");
    });
  }

  snackbars.forEach(snackbar => {
    snackbar.show();
    timeoutID = setTimeout(() => {
      snackbar.close();
    }, 4000);
  });
}

function closeSnackbar() {
  const openSnackbars = document.querySelectorAll(".snackbar[open]");
  clearTimeout(timeoutID);
  openSnackbars.forEach(openSnackbar => {
    openSnackbar.classList.add("close-snackbar");

    setTimeout(() => {
    openSnackbar.close();
    openSnackbar.classList.remove("close-snackbar");
  }, 300);
  });
}

form.addEventListener("submit", handleSubmit);