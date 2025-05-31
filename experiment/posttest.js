/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
 

/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////






/////////////// Write the MCQ below in the exactly same described format ///////////////


  const myQuestions = [
    {
      question1: "1. In a BRF, the frequency where attenuation is maximum is called:",  
      answers: {
        a: "Cut-off frequency",
        b: "Resonant frequency",
        c: "Notch frequency ",
        d: "Center frequency"
        },
      "correctAnswer": "c"               
    },

    {
      question2: " If L = 2.53 mH and C = 0.01 µF, then the notch frequency is approximately:",  ///// Write the question inside double quotes
      answers: {
        a: "500 Hz",
        b: "1 KHz",
        c: "5 KHz",
        d: "10 KHz"
      },
      "correctAnswer": "b"                ///// Write the correct option inside double quotes
    },
    
    {
      question3: "In the frequency response plot of a BRF, the notch appears:",  
      answers: {
        a: "As a peak",
        b: "As a dip",
        c: "As a straight line",
        d: "As a parabola"
        },
      "correctAnswer": "b"              
    },

    {
      question4: "4. The Band Reject Filter is formed by combining:",  
      answers: {
        a: "LPF and HPF",
        b: "LPF and BPF",
        c: "BPF and differentiator",
        d: "Integrator and amplifier"
        },
      "correctAnswer": "a"               
    },

    {
      question5: "5. A real-life application of a BRF is:",  
      answers: {
        a: "Voltage regulation",
        b: "Removing 50/60 Hz power line noise ",
        c: "Amplifying RF signals",
        d: "Rectifying AC signals"
        },
      "correctAnswer": "c"               
    },

    /* To add more MCQ's, copy the below section, starting from open curly braces ( { )
        till closing curly braces comma ( }, )

        and paste it below the curly braces comma ( below correct answer }, ) of above 
        question

    Copy below section

    {
      question: "This is question n?",
      answers: {
        a: "Option 1",
        b: "Option 2",
        c: "Option 3",
        d: "Option 4"
      },
      correctAnswer: "c"
    },

    Copy above section

    */




  ];




/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////


  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();


/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////
