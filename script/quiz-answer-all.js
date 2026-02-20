// =========================
// CHỌN ĐÁP ÁN
// =========================

const musicTrue = new Audio("../soundtrack/VĐ_đúng_O7.mp3")
const musicFalse = new Audio("../soundtrack/VĐ_sai_O7.mp3")

musicTrue.volume = 1
musicFalse.volume = 1

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
        musicTrue.play()
        document.getElementById("explaination").style.display = "flex"

    } else {

        button.classList.add("wrong")
        musicFalse.play()

        setTimeout(() => {
            const correctBtn = answerBox.querySelector('[data-correct="true"]')
            if (correctBtn) {
                correctBtn.classList.add("correct")
            }
        }, 1000)
        document.getElementById("explaination").style.display = "flex"
    }
}

function backToStart(){

    window.location.href = "quiz.html"

}

let open_close = 0

window.explainationOpen = async () => {

    open_close++

    if(open_close == 1){

        document.getElementById("explain").classList.add("active")

    }

    else{

        document.getElementById("explain").classList.remove("active")
        open_close = 0

    }

}

document.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        e.preventDefault()
        document.getElementById("explain").classList.remove("active")

    }else if(e.key === "Escape"){

        e.preventDefault()
        document.getElementById("explain").classList.remove("active")

    }
    open_close = 0

})