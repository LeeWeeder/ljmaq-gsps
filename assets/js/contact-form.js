const form = document.getElementById("contact-form");

const snackbars = document.querySelectorAll(".snackbar");
const responseTexts = document.querySelectorAll(".response");

const username = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");

var isNameValid = false;
var isEmailValid = false;
var isMessageValid = false;

const setError = (element) => {
  const inputControl = element.parentElement;

  inputControl.classList.add('error');
  inputControl.classList.remove('success')
}

const setSuccess = element => {
  const inputControl = element.parentElement;

  inputControl.classList.add('success');
  inputControl.classList.remove('error');
};

const isValidEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
  validateNameInput();
  validateMessageInput();
  validateEmailInput();
};

function validateNameInput() {
  const usernameValue = username.value.trim();
  if (usernameValue === '') {
    setError(username);
    isNameValid = false;
  } else {
    setSuccess(username);
    isNameValid = true;
  }
}

function validateMessageInput() {
  const messageValue = message.value.trim();
  if (messageValue === '') {
    setError(message);
    isMessageValid = false;
  } else {
    setSuccess(message);
    isMessageValid = true;
  }
}

function validateEmailInput() {
  const emailValue = email.value.trim();
  if (emailValue === '') {
    setError(email);
    isEmailValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(email);
    isEmailValid = false;
  } else {
    setSuccess(email);
    isEmailValid = true;
  }
}

async function handleSubmit(event) {
  event.preventDefault();

  validateInputs();

  if (isNameValid && isEmailValid && isMessageValid) {
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