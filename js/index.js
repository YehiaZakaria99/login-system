let userName = document.getElementById("userName");
let userMail = document.getElementById("userMail");
let userPass = document.getElementById("userPass");
let signUpBtn = document.getElementById("signUpBtn");
let signInBtn = document.getElementById("signInBtn");
let sayWelcome = document.getElementById("sayWelcome");
let logOutBtn = document.getElementById("logOutBtn");
let mailFeedBack = document.getElementById("mailFeedBack");
let passFeedBack = document.getElementById("passFeedBack");
let homeUserName = document.querySelector(".user-name");
let userNameTmp = ``;
// let forms = document.forms;

console.log(location);
let url = new URL(document.baseURI);
console.log(url);

let dataList = [];

if (localStorage.getItem("users")) {
  dataList = JSON.parse(localStorage.getItem("users"));
}
function clearInputs() {
  userName.value = null;
  userMail.value = null;
  userPass.value = null;
  userName.classList.remove("is-valid");
  userMail.classList.remove("is-valid");
  userPass.classList.remove("is-valid");
}
// ############################################## Sign Up
function signUp() {
  if (
    inputValidation(userName) &&
    inputValidation(userMail) &&
    inputValidation(userPass) &&
    !sameEmails(userMail)
  ) {
    let user = {
      userName: userName.value,
      userMail: userMail.value,
      userPass: userPass.value,
    };
    dataList.push(user);
    localStorage.setItem("users", JSON.stringify(dataList));
    clearInputs();
  } else {
    console.log("Please correct the invalid fields before submitting.");
    signUpErrMsg();
  }
}
function signUpErrMsg() {
  if (!inputValidation(userName)) {
    alert(userName);
  } else if (!inputValidation(userMail)) {
    alert(userMail);
  } else if (!inputValidation(userPass)) {
    alert(userPass);
  }
}
function alert(input) {
  input.nextElementSibling.classList.add("d-block");
}
function sameEmails(mail) {
  let sameEmail = false;
  for (let i = 0; i < dataList.length; i++) {
    if (dataList[i].userMail == mail.value) {
      sameEmail = true;
    }
  }
  if (sameEmail) {
    document.getElementById("errMsg").innerHTML = `This Email is alredy exists`;
    return true;
  } else {
    document.getElementById("errMsg").innerHTML = null;
    return false;
  }
}
if (/signUp\.html/.test(location.pathname)) {
  document.addEventListener("input", function (e) {
    inputValidation(e.target);
    document.getElementById("errMsg").innerHTML = null;
  });
}
// ############################################## Sign In
function signIn(e) {
  if (userMail.value && userPass.value) {
    let isValid = false;
    let userName = "";
    for (let i = 0; i < dataList.length; i++) {
      if (
        userMail.value == dataList[i].userMail &&
        userPass.value == dataList[i].userPass
      ) {
        isValid = true;
        userName = dataList[i].userName;
        localStorage.setItem("currentUser", userName);
      }
    }
    if (isValid) {
      location = "./homePage.html";
    } else {
      document.getElementById("errMsg").innerHTML = `Invalid email or password`;
      // console.log("Invalid email or password");
    }
  } else {
    console.log("All Fields are required");
    signInErrMsg();
  }
}
function signInErrMsg() {
  if (!userPass.value) {
    passFeedBack.classList.add("d-block");
    userPass.classList.add("is-invalid");
  }
  if (!userMail.value) {
    mailFeedBack.classList.add("d-block");
    userMail.classList.add("is-invalid");
  }
}
if (/index\.html|\//.test(location.pathname)) {
  document.addEventListener("input", function (e) {
    if (e.target.value) {
      e.target.nextElementSibling.classList.remove("d-block");
      e.target.classList.remove("is-invalid");
    } else {
      e.target.nextElementSibling.classList.add("d-block");
      e.target.classList.add("is-invalid");
    }
  });
}
// ############################################## Submit
document.addEventListener("click", function (e) {
  if (e.target.type == "submit") {
    e.preventDefault();
    e.target.id == "signUpBtn" ? (signUp() && sameEmails(userMail)) : signIn(e);
  }
});
// ############################################## Home Page
if (/homePage\.html/.test(location.pathname)) {
  const userName = localStorage.getItem("currentUser");
  if (userName) {
    sayWelcome.innerHTML = `Welcome <span class="text-danger"> ${userName} </span>`;
    homeUserName.innerHTML = `${userName}`;
  }
  logOutBtn.addEventListener("click", function () {
    logOut();
  });
}
function logOut() {
  localStorage.removeItem("currentUser");
  location = "./";
}

// ############################################## Validation
function inputValidation(el) {
  let reg = {
    userName: /^[A-Za-z]\w{5,29}$/,
    userMail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    userPass:
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  };
  if (reg[el.id].test(el.value)) {
    el.classList.add("is-valid");
    el.classList.remove("is-invalid");
    el.nextElementSibling.classList.remove("d-block");
    return true;
  } else {
    el.classList.add("is-invalid");
    el.classList.remove("is-valid");
    el.nextElementSibling.classList.add("d-block");
    return false;
  }
}
