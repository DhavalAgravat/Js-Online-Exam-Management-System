// DOM Elements
const createExamBtn = document.querySelector(".create-exam-btn");
const examTitle = document.querySelector("#exam-title");
const examDescription = document.querySelector("#exam-description");
const examDuration = document.querySelector("#exam-duration");
const registerBtn = document.querySelector(".register-btn");
const examTitleAlert = document.querySelector(".title-alert");
const examSameTitleAlert = document.querySelector(".same-title-alert");
const examDescriptionAlert = document.querySelector(".description-alert");
const examDurationAlert = document.querySelector(".duration-alert");
const examNegativeDurationAlert = document.querySelector(
  ".negative-duration-alert"
);

let exams = JSON.parse(localStorage.getItem("exams")) || [];
let html = "";

// Display Functions Shows Table Of Exams
let display = function (arr) {
  arr.map((e, i) => {
    html += `
         <tr>
         <td>${i}</td>
         <td>${e.title}</td>
         <td>${e.description}</td>
         <td>${e.duration} Seconds</td>
         <td class="text-center"><button class="start-btn">
         <i class="fa-solid fa-play me-2"></i>
         Start</button></td>
       </tr>`;
  });
  document.querySelector(".table-body").innerHTML = html;
};

display(exams);

// Function For Showcasing Validation Alerts
function createExamAlert(alert) {
  examTitleAlert.classList.add("hidden");
  examSameTitleAlert.classList.add("hidden");
  examDescriptionAlert.classList.add("hidden");
  examDurationAlert.classList.add("hidden");
  examNegativeDurationAlert.classList.add("hidden");
  alert?.classList.remove("hidden");
}

// Clearing erros and fields on new create  exam window
createExamBtn.addEventListener("click", (e) => {
  examTitle.value = "";
  examDuration.value = "";
  examDescription.value = "";
  createExamAlert();
});

// register exam btn event
registerBtn.addEventListener("click", (e) => {
  let exam = {
    title: examTitle.value,
    description: examDescription.value,
    duration: examDuration.value,
  };

  // Validating Inputs
  if (!examTitle.value) {
    createExamAlert(examTitleAlert);
  } else if (
    exams
      .map((e) => e.title.toLowerCase())
      .includes(examTitle.value.toLowerCase())
  ) {
    createExamAlert(examSameTitleAlert);
  } else if (!examDescription.value) {
    createExamAlert(examDescriptionAlert);
  } else if (!examDuration.value) {
    createExamAlert(examDurationAlert);
  } else if (examDuration.value < 5) {
    createExamAlert(examNegativeDurationAlert);
  } else {
    // pushing exam object to exams array
    exams.push(exam);
    localStorage.setItem("exams", JSON.stringify(exams));
    html = "";

    // updating UI
    display(exams);

    examTitle.value = "";
    examDuration.value = "";
    examDescription.value = "";
    createExamAlert();

    // closing model on submit
    const modal = document.querySelector("#createExamBackdrop");
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
  }
});

// Start btn redirects to quiz
document.querySelector(".table-body").addEventListener("click", (e) => {
  if (e.target.classList.contains("start-btn")) {
    let id = e.target.parentElement.parentElement.firstElementChild.innerText;
    console.log(id);

    debugger;
    var url = "home.html";
    var uid = id;
    url += "?id=" + encodeURIComponent(uid);
    window.location.href = url;
  }
});
