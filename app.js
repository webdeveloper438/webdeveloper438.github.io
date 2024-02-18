document.addEventListener("DOMContentLoaded", () => {
  const vocabForm = document.getElementById("vocab-form");
  const vocabInput = document.getElementById("vocab-input");
  const translationInput = document.getElementById("translation-input");
  const submitAnswerButton = document.getElementById("submit-answer");
  const nextQuestionButton = document.getElementById("next-question");
  const questionElement = document.getElementById("question");
  const answerInput = document.getElementById("answer-input");

  let vocabulary = [];
  let currentQuestion = 0;

  function storeVocabulary() {
    localStorage.setItem("vocabulary", JSON.stringify(vocabulary));
  }

  function loadVocabulary() {
    vocabulary = JSON.parse(localStorage.getItem("vocabulary")) || [];
  }
    
  const vocabList = document.getElementById("vocab-list");
  
  loadVocabulary();
  function displayVocabulary() {
    
    vocabList.innerHTML = "";

    vocabulary.forEach((vocab, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${vocab.word} - ${vocab.translation}`;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        vocabulary.splice(index, 1);
        storeVocabulary();
        displayVocabulary();
      });

      listItem.appendChild(deleteButton);
      vocabList.appendChild(listItem);
    });
  }

  displayVocabulary();

  vocabForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const word = vocabInput.value.trim();
    const translation = translationInput.value.trim();

    if (word && translation) {
      vocabulary.push({ word, translation });
      storeVocabulary();
      vocabInput.value = "";
      translationInput.value = "";
      location.reload(true);
    }
  });

  submitAnswerButton.addEventListener("click", () => {
    const correctTranslation = vocabulary[currentQuestion].translation;
    const givenAnswer = answerInput.value.trim();

    if (givenAnswer.toLowerCase() === correctTranslation.toLowerCase()) {
      alert("Correct!");
    } else {
      alert(`Wrong! The correct translation is: ${correctTranslation}`);
    }

    answerInput.value = "";
  });

  nextQuestionButton.addEventListener("click", () => {
    currentQuestion = (currentQuestion + 1) % vocabulary.length;
    updateQuestion();
  });

  function updateQuestion() {
    const currentVocab = vocabulary[currentQuestion];
    questionElement.textContent = `Question: ${currentVocab.word}`;
  }

  updateQuestion();
  const startTestButton = document.getElementById("start-test");

  startTestButton.addEventListener("click", () => {
    const testArea = document.getElementById("test-area");
    testArea.style.display = "block";
    startTestButton.style.display = "none";
    vocabList.style.display = "none";
  });

  const endTestButton = document.createElement("button");
  endTestButton.textContent = "End Test";

  endTestButton.addEventListener("click", () => {
    const testArea = document.getElementById("test-area");
    testArea.style.display = "block";
    startTestButton.style.display = "block";
    vocabList.style.display = "block";
    startTestButton.style.display = "block";
  });

  questionElement.appendChild(endTestButton);
});
