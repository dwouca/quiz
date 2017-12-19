const myQuestions = [
  {
    question: "What is 63 * 48?",
    answers: {
      a: "Somewhere around 3000?",
      b: "60 * 40 + 60 * 8 + 40 * 3 + 3 * 8. Can't be bothered to do the rest.",
      c: "3026. Yeah, I know.",
      d: "Ummm...",
    },
    correctAnswer: "b",
  },
  {
    question: "Is this the best quiz ever created?",
    answers: {
      a: "Is that even a question?",
      b: "Obviously.",
      c: "Is the sky blue?",
      d: "All of the above."
    },
    correctAnswer: "d"
  },
  {
    question: "Where's wally?",
    answers: {
      a: "I could tell you, but I'd have to kill you.",
      b: "Dammit! I forgot again.",
      c: "Up a tree."
    },
    correctAnswer: "a"
  }
]

function buildQuiz(){
  const output = [];
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {
      const answers = [];
      for(letter in currentQuestion.answers){
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} : ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      output.push(
        `<div class="slide">
          <div class="question">
            ${currentQuestion.question}
          </div>
          <div class="answers">
            ${answers.join("")}
          </div>
        </div>`
      );
    }
  );
  quizContainer.innerHTML = output.join('');
  const navigation = [];
  for(var i = 0; i < myQuestions.length; i++) {
    navigation.push(
      `<button class="navbutton" id="buttonslide${i+1}" value="${i+1}">${i+1}</button>`
    );
  }
  navContainer.innerHTML = navigation.join("");
}

function showResults(){
  const answerContainers = quizContainer.querySelectorAll('.answers');
  let numCorrect = 0;
  myQuestions.forEach((currentQuestion, questionNumber) =>
    {
      const answerContainer = answerContainers[questionNumber];
      const selector = 'input[name=question'+questionNumber+']:checked';
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      if(userAnswer === currentQuestion.correctAnswer){
        numCorrect++;
        answerContainers[questionNumber].style.color = 'limegreen';
      } else {
        answerContainers[questionNumber].style.color = 'red';
      }
    }
  );
  resultsContainer.innerHTML = "<br>" + numCorrect + ' out of ' + myQuestions.length;
}

function showSlide(n) {
  slides[currentSlide].classList.remove("active-slide");
  slides[n].classList.add("active-slide");
  currentSlide = n;

  if (currentSlide === 0) {
    previousButton.style.display = "none";
  } else {
    previousButton.style.display = "inline-block";
  }

  if (currentSlide === slides.length - 1) {
    nextButton.style.display = "none";
    shbr.style.display = ""
    reviewButton.style.display = "inline-block";
    submitButton.style.display = "inline-block";
  } else {
    nextButton.style.display = "inline-block";
    shbr.style.display = "none"
    submitButton.style.display = "none";
    reviewButton.style.display = "none";
  }
}

function showPreviousSlide() {
  showSlide(currentSlide-1);
  progressBarUpdate();
}

function showNextSlide() {
  showSlide(currentSlide+1);
  progressBarUpdate();
}

function progressBarUpdate() {
  progressBar.style.width = ((currentSlide + 1) / (slides.length) * 30) + '%';
}

function review() {
  const text = [];
  const answerContainers = quizContainer.querySelectorAll('.answers');
  myQuestions.forEach((currentQuestion, questionNumber) =>
    {
      const answerContainer = answerContainers[questionNumber];
      const selector = 'input[name=question'+questionNumber+']:checked';
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      text.push("<div class='question'>"+currentQuestion.question+"</div>");
      text.push(currentQuestion.answers[userAnswer]+"<br>");
    }
  );
  reviewContainer.innerHTML = text.join("");
  setInterval(
    function(){
      if(resultsShown){
        review();
      }
    }, 100
  )
}

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const reviewContainer = document.getElementById('reviewdiv');
const navContainer = document.getElementById("nav");
const submitButton = document.getElementById('submit');
const reviewButton = document.getElementById('review');

buildQuiz();

const shbr = document.getElementById('shbr');
const progressBar = document.getElementById('progress');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const slides = document.querySelectorAll('.slide');
const buttonslides = [];
let currentSlide = 0;
let resultsShown = false;

showSlide(0);
progressBarUpdate();

reviewButton.addEventListener('click', function() {if(!resultsShown){review(); reviewButton.innerHTML="Hide Review"; }else{reviewButton.innerHTML="Review Your Answers", reviewContainer.innerHTML = ""; clearInterval()}; resultsShown = !resultsShown; console.log(resultsShown)} );
submitButton.addEventListener('click', function() {showResults()} );
previousButton.addEventListener('click', function() {showPreviousSlide()} );
nextButton.addEventListener('click', function() {showNextSlide()} );

for(var i=0; i<myQuestions.length; i++){
  buttonslides.push(document.getElementById("buttonslide"+((i+1).toString())));
  buttonslides[i].addEventListener('click', function(){showSlide(parseInt(buttonslides[i].value)-1);console.log("Slide: " + (parseInt(buttonslides[i].value)-1).toString())});
}
