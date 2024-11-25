function isEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isAlpha(username) {
  const nameRegex = /^[A-Za-z]+$/;
  return nameRegex.test(username);
}

function isPassword(password1) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,20}$/;
  return passwordRegex.test(password1);
}

function checkRequired(inputs) {
  inputs.forEach(input => {
    if (input.value.trim() === "") {
      errorInput(input, `${getName(input)} is required`);
    } else {
      successInput(input);
    }
  });
}

function getName(input) {
  return input.placeholder || input.id; 
}

function errorInput(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group error";
  const p = formGroup.querySelector(".error-message");
  p.innerHTML = message;
  p.style.visibility = 'visible'; 
}

function successInput(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
  const p = formGroup.querySelector(".error-message");
  p.innerHTML = "";
  p.style.visibility = 'hidden'; 
}

function checkLength(input, min, max) {
  const dataLength = input.value.trim().length;
  if (dataLength < min) {
    errorInput(input, `${getName(input)} must be at least ${min} characters`);
  } else if (dataLength > max) {
    errorInput(input, `${getName(input)} must be at most ${max} characters`);
  } else {
    successInput(input);
  }
}

function checkConfirmPassword(password1, password2) {
  if (password1.value !== password2.value) {
    errorInput(password2, `${getName(password2)} does not match`);
  } else {
    successInput(password2);
  }
}

function checkEmail(input) {
  if (!isEmail(input.value.trim())) {
    errorInput(input, `${getName(input)} is not a valid email address`);
  } else {
    successInput(input);
  }
}

function checkAlpha(input) {
  if (!isAlpha(input.value.trim())) {
    errorInput(input, `${getName(input)} is not a valid username`);
  } else {
    successInput(input);
  }
}

function checkPassword(input) {
  if (!isPassword(input.value.trim())) {
    errorInput(input, `${getName(input)} must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.`);
  } else {
    successInput(input);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('form');
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password1 = document.getElementById('password1');
  const password2 = document.getElementById('password2');

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    checkRequired([username, email, password1, password2]);
    checkLength(username, 5, 10); // Ensure username is between 5 and 10 characters long
    checkLength(password1, 8, 20); 
    checkConfirmPassword(password1, password2);
    checkEmail(email);
    checkAlpha(username);
    checkPassword(password1);
  });
});
