// Getting examsm array if and score of user
let exams = JSON.parse(localStorage.getItem("exams")) || [];

const urlParams = new URL(window.location.toLocaleString()).searchParams;
const id = urlParams.get("id");
const score = urlParams.get("score");
let currentTest = exams[id];

// Header Section
document.querySelector(".header").innerHTML = `
        <h1 id="heading" class="m-0">Online Exam Management System</h1>
        <h1 class="sub-heading">Title : ${currentTest.title}</h1>
        <h1 class="sub-heading fs-5">Result :) </h1>`;

// Result Block Based On Scores

if (score > 70) {
  document.querySelector(".result-box").innerHTML = `
       <h1 id="heading" style="color: #F4EEE0;" class="m-0"> Exellent You Rock It !</h1>
        <h1 class="sub-heading" style="color: #F4EEE0;">Your Score Is : ${score}</h1>
        <button class="btn btn-success my-2 reset-btn me-2">Try Again</button>
        <button class="btn btn-light my-2 return-btn">Return To Homepage</button>
    `;
} else if (score >= 40) {
  document.querySelector(".result-box").innerHTML = `
       <h1 id="heading" style="color: #F4EEE0;" class="m-0"> You Did Well !</h1>
        <h1 class="sub-heading" style="color: #F4EEE0;">Your Score Is : ${score}</h1>
        <button class="btn btn-primary my-2 reset-btn me-2">Try Again</button>
        <button class="btn btn-light my-2 return-btn">Return To Homepage</button>
    `;
} else {
  document.querySelector(".result-box").innerHTML = `
       <h1 id="heading" style="color: #F4EEE0;" class="m-0"> Work Hard Loser !</h1>
        <h1 class="sub-heading" style="color: #F4EEE0;">Your Score Is : ${score}</h1>
        <button class="btn btn-danger my-2 reset-btn me-2">Try Again</button>
        <button class="btn btn-light my-2 return-btn">Return To Homepage</button>
    `;
}

// Reset button redirects to quiz
document.querySelector(".reset-btn").addEventListener("click", (e) => {
  var url = "home.html";
  var uid = id;
  url += "?id=" + encodeURIComponent(uid);
  window.location.href = url;
});

// redirects to homepage
document.querySelector(".return-btn").addEventListener("click", (e) => {
  window.location.href = "index.html";
});
