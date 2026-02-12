function answerOpen() {

    fetch("https://68ce57f66dc3f350777eb99b.mockapi.io/olympia")
        .then(res => res.json())
        .then(data => {

            const load = data[1]

            document.getElementById("quest").innerHTML = `<div>${load.quest}</div>`

            let answers = [
                { text: load.dung, correct: true },
                { text: load.sai_1, correct: false },
                { text: load.sai_2, correct: false },
                { text: load.sai_3, correct: false }
            ]

            shuffle(answers)

            const answerBox = document.getElementById("answer")

            answerBox.innerHTML = answers.map((ans, index) => `
                <button 
                    class="answer-btn"
                    ${ans.correct ? 'data-correct="true"' : ''}
                    onclick="selectAnswer(this)">
                    ${String.fromCharCode(65 + index)}. ${ans.text}
                </button>
            `).join("")

        })
}


// =========================
// SHUFFLE
// =========================
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}





// =========================
// AUTO LOAD
// =========================
document.addEventListener("DOMContentLoaded", answerOpen)