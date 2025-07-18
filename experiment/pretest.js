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
      question: "1. What is the main function of a Band Reject Filter?",  ///// Write the question inside double quotes
      answers: {
        a: "To pass a certain band of frequencies",                  ///// Write the option 1 inside double quotes
        b: " To amplify low frequencies",                  ///// Write the option 2 inside double quotes
        c: "To reject a specific band of frequencies",                  ///// Write the option 3 inside double quotes
        d: "To convert AC to DC"                   ///// Write the option 4 inside double quotes
      },
      correctAnswer: "c"                ///// Write the correct option inside double quotes
    },

    {
     question: "2. What is the other name for a Band Reject Filter?",  ///// Write the question inside double quotes
      answers: {
        a: "Low Pass Filter",                  ///// Write the option 1 inside double quotes
        b: " Band Pass Filter",                  ///// Write the option 2 inside double quotes
        c: "Notch Filter",                  ///// Write the option 3 inside double quotes
        d: "High Pass Filter"                   ///// Write the option 4 inside double quotes
      },
      correctAnswer: "c"                ///// Write the correct option inside double quotes
    },     
    {
      question: "3. The notch frequency  of a passive BRF using L and C is given by:",  ///// Write the question inside double quotes
       answers: {
         a: "f<sub>0</sub> = 1/(LC)",                  ///// Write the option 1 inside double quotes
         b: "f<sub>0</sub> = 2π√(LC)",                  ///// Write the option 2 inside double quotes
         c: "f<sub>0</sub> = 1/2π√(LC)",                  ///// Write the option 3 inside double quotes
         d: "f<sub>0</sub> = √(LC)"                   ///// Write the option 4 inside double quotes
       },
       correctAnswer: "c"                ///// Write the correct option inside double quotes
     }, 
     {
      question: "4. Which components are used in a passive band reject filter?",  ///// Write the question inside double quotes
       answers: {
         a: "Only op-amps",                  ///// Write the option 1 inside double quotes
         b: "Only capacitors",                  ///// Write the option 2 inside double quotes
         c: "Resistors, capacitors, and inductors ",                  ///// Write the option 3 inside double quotes
         d: "Transistors"                   ///// Write the option 4 inside double quotes
       },
       correctAnswer: "c"                ///// Write the correct option inside double quotes
     }, 

    {
      question: "5. The output of a BRF is minimum at:",
      answers: {
        a: "High frequency",
        b: " Low frequency",
        c: "Notch frequency",
        d: "Zero frequency"
      },
      correctAnswer: "c"
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
