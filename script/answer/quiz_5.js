function answerOpen() {

    fetch("https://68ce57f66dc3f350777eb99b.mockapi.io/olympia")
        .then(res => res.json())
        .then(data => {



            const load = data[4]

            document.getElementById("quest").innerHTML = `<div>${load.quest}</div>
                                                        <button onclick="expandImage()"><img src="../image/z7557959217023_094e390bb675cad23974fce60094d82d.jpg"></button>
            
            `

            document.getElementById("explain").innerHTML = `
            
                <h2>Giải thích</h2>
                <span>${load.explain}</span>
                <p><span>${load.de_1}</span></p>
                <p><span>${load.de_2}</span></p>
                <p><span>${load.de_3}</span></p>
                <p><span>${load.de_4}</span></p>
                <p><span>${load.de_5}</span></p>
                <p><span>${load.de_6}</span></p>

            `

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

window.expandImage = () => {

    const modal = document.getElementById("imgModal")
    const modalImg = document.getElementById("modalImage")

    modalImg.src = "../image/z7557959217023_094e390bb675cad23974fce60094d82d.jpg"

    modal.classList.add("active")
}

function closeImage(){
    document.getElementById("imgModal").classList.remove("active")
}