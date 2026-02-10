const buttons = document.querySelectorAll(".answer button");
let answered = false;

function falseAns(btn) {
    if (answered) return;
    answered = true;

    btn.classList.add("wrong");
    lockButtons(btn);

    saveAnswerToFirebase(false); // ❌ LƯU SAI

    setTimeout(showCorrectAnswer, 1000);
}


function trueAns(btn) {
    if (answered) return;
    answered = true;

    btn.classList.add("correct");
    lockButtons(btn);

    saveAnswerToFirebase(true); // ✅ LƯU ĐÚNG
}


function showCorrectAnswer() {
    const correctBtn = document.querySelector(
        '.answer button[data-correct="true"]'
    );

    if (correctBtn) {
        correctBtn.classList.add("correct");
    }
}

function lockButtons(selectedBtn) {
    buttons.forEach(button => {
        button.disabled = true;
    });
}

function backToStart(){

    window.location.href = "quiz.html"

}