// =========================
// CHỌN ĐÁP ÁN
// =========================
function selectAnswer(button) {

    const answerBox = document.getElementById("answer")
    const buttons = answerBox.querySelectorAll(".answer-btn")
    const isCorrect = button.dataset.correct === "true"

    // ✅ LƯU FIREBASE
    saveAnswerToFirebase(isCorrect)

    // KHÓA tất cả ngay khi chọn
    buttons.forEach(btn => {
        btn.disabled = true
        btn.style.cursor = "not-allowed"
    })

    if (isCorrect) {

        button.classList.add("correct")

    } else {

        button.classList.add("wrong")

        setTimeout(() => {
            const correctBtn = answerBox.querySelector('[data-correct="true"]')
            if (correctBtn) {
                correctBtn.classList.add("correct")
            }
        }, 1000)
    }
}

function backToStart(){

    window.location.href = "quiz.html"

}