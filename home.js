// Can Not Import JSON Using Following Gaves Error Only use fetch
// const data1 = require('./data.json')
// import data from './data.json';

// Getting Data From JSON (Using Top-level-await)
const response = await fetch("data.json");
const data = await response.json();

// Exaams Array
let exams = JSON.parse(localStorage.getItem("exams")) || [];

// Getting Current test deatils
const urlParams = new URL(window.location.toLocaleString()).searchParams;
const id = urlParams.get("id");
let currentTest = exams[id];
let countdownDuration = currentTest.duration;

// Header Area
document.querySelector(".header").innerHTML = `
        <h1 id="heading" class="m-0">Online Exam Management System
        <i class="fa-solid fa-school ms-2"></i>
        </h1>
        <h1 class="sub-heading">Title : ${currentTest.title}</h1>
        <h1 class="sub-heading fs-5">Description : ${currentTest.description}</h1>
        <p class="float-end fs-5 text-light me-3 bg-danger p-2 countdowm-timer">
        Time  Left : ${currentTest.duration}</p>`;

let html = "";
let html2 = "";

// Display Data Function For Quiz Questions
function displayData(data) {
  // Displays Questions
  data.map((question) => {
    html += `<div class="row q${question.id} my-4">   
    <div class="col-12 mb-2 fs-5"> (${question.id}) ${question.title} </div>
    <div class="col-12 a-box answer-box${question.id}"></div>
    </div>
   `;
  });
  document.querySelector(".box").innerHTML = html;

  // Displays Options Based On Option Type
  data.map((question) => {
    html2 = "";
    let x = 1;

    // 1.Radio Options / 2.Check Box / 3.Text
    if (question.type === "radio") {
      question.options?.map((option) => {
        html2 += `
       <div class="form-check">
        <input class="form-check-input" type="radio" name="question${question.id}" id="question${question.id}${x}" value="${option}">
        <label class="form-check-label" for="question${question.id}${x}">
            ${option}
        </label>
        </div>`;
        x++;
      });
      document.querySelector(`.answer-box${question.id}`).innerHTML = html2;
    } else if (question.type === "checkbox") {
      question.options?.map((option) => {
        html2 += `
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="${option}"
             id="question${question.id}${x}"  name="question${question.id}">
            <label class="form-check-label" for="question${question.id}${x}">
              ${option}
            </label>
          </div>
       `;
        x++;
      });
      document.querySelector(`.answer-box${question.id}`).innerHTML = html2;
    } else if (question.type === "text") {
      html2 += `
        <div>
        <input type="text" class="form-control" id="question${question.id}" placeholder="Your Answer Here">
        </div>
       `;
      document.querySelector(`.answer-box${question.id}`).innerHTML = html2;
    }
  });
}

// Calling Fetch Data Which Fetchs data from json and displays option based on that
displayData(data);

let userAnswers = [];

// Submit Functions Takes USers answer as input validates it and generaate score and redirects to result page
function submit(data) {
  // Getting Correct answers and marks from json
  let correctAnswers = data.map((e) => e.answer);
  let marks = data.map((e) => e.mark);
  let score = 0;
  userAnswers = [];
  let ans1 = document.querySelector('input[name="question1"]:checked') || "";
  let ans2 = document.querySelector('input[name="question2"]:checked') || "";
  let ans3 = document.querySelectorAll('input[name="question3"]:checked') || "";
  let ans4 = document.querySelector('input[name="question4"]:checked') || "";
  let ans5 = document.querySelector("#question5") || "";
  let ans6 = document.querySelector('input[name="question6"]:checked') || "";
  let ans7 = document.querySelector('input[name="question7"]:checked') || "";
  let ans8 = document.querySelector('input[name="question8"]:checked') || "";
  let ans9 = document.querySelector('input[name="question9"]:checked') || "";
  let ans10 = document.querySelector('input[name="question10"]:checked') || "";

  // Saving User Answers
  for (let i = 1; i < 11; i++) {
    if (i === 3) {
      let temp = eval(`ans${i}.length || ''`);
      userAnswers.push(temp);
    } else if (i === 5) {
      let temp = eval(`ans${i}.value.toLowerCase() || ''`);
      userAnswers.push(temp);
    } else {
      let temp = eval(`ans${i}.value || ''`);
      userAnswers.push(temp);
    }

    // Calculating Score
    if (userAnswers[i - 1] === correctAnswers[i - 1]) {
      console.log(i - 1, marks[i - 1]);
      score += marks[i - 1];
    }
  }

  let url = "result.html";
  let uid = id;
  let scr = score;
  url += "?id=" + encodeURIComponent(uid);
  url += "&score=" + encodeURIComponent(scr);
  window.location.href = url;
}

// Coutdown function for  countdwon
function countdown() {
  if (Number(countdownDuration) === 0) {
    submit(data);
  } else {
    countdownDuration--;
    document.querySelector(
      ".countdowm-timer"
    ).innerText = `Time Left : ${countdownDuration}`;
  }
}

// setinterrval for updating timer every sec
setInterval(countdown, 1000);

// submit btn
document
  .querySelector(".submit-btn")
  .addEventListener("click", () => submit(data));
