const form = document.getElementById("contact-form");

const snackbar = document.getElementById("snackbar");
const responseText = document.getElementById("response");

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
    showSnackbar();
  });
}

function showSnackbar(success, message = "") {
  /**
   * TODO: documentation
   */
  if (success) {
    responseText.innerText = message === "" ? "message sent successfully" : message;
  } else {
    snackbar.style.setProperty("background-color", "var(--error-color)");
    responseText.style.setProperty("color", "var(--secondary-color)");
    document.querySelector(".material-symbols-sharp").style.setProperty("color", "var(--secondary-color)");
    responseText.innerText = message === "" ? "something went wrong" : message;
  }

  snackbar.show();
  setTimeout(() => {
    snackbar.close();
  }, 4000);
}

function closeSnackbar() {
  const openSnackbar = document.querySelector("#snackbar[open]");
  openSnackbar.classList.add("close-snackbar");
  setTimeout(() => {
    snackbar.close();
    openSnackbar.classList.remove("close-snackbar");
  }, 300);
}

form.addEventListener("submit", handleSubmit)