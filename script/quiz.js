window.teleport = async (number) => {

    window.location.href = `quiz_${number}.html`

}

function photoIn(){

    fetch("https://68ce57f66dc3f350777eb99b.mockapi.io/olympia")
        .then(res => res.json())
        .then(data => {

            const photo = data[5]

            document.getElementById("photo").innerHTML = `<img src="${photo.bg_url}">`

            document.getElementById("title").innerHTML = `<h1>Từ khóa: ${photo.number} chữ</h1>`

        })

}

photoIn()

let n = 0

window.loading = async () => {

    db.collection("Olympia").get()
        .then(snapshot => {

            

            snapshot.forEach(doc => {

                n++

                const data = doc.data(); // ✅ LẤY DATA ĐÚNG

                const qid = data.questionId;

                if (!qid) return;

                if (data.isCorrect === false) {
                    document.getElementById(`quest-${qid}`).style.background = "#ff7d7d";
                } else {
                    document.getElementById(`quest-${qid}`).style.background = "#7dffb3";
                    document.getElementById(`quiz-${qid}`).style.display = "none";
                }

                document.getElementById(`btn-${qid}`).style.display = "none";

            });

            if(n==4){

                document.getElementById("btn-5").classList.remove("become-none")

            }

        })
        .catch(err => {
            console.error("Firestore error:", err);
        });

}




loading()

const guessForm = document.getElementById("guess-open");
const guessBtn = document.getElementById("guess-btn");
const inputGuess = document.querySelector(".input-guess");

let text = 0

// ===== MỞ FORM =====
function openGuess(){
    guessForm.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // khóa scroll
    setTimeout(() => {
        inputGuess.focus();
    }, 200);
}

// ===== ĐÓNG FORM =====
function closeGuess(){
    guessForm.classList.add("hidden");
    document.body.style.overflow = "auto"; // mở scroll lại
    inputGuess.value = "";
}

// Click nút tròn để mở
guessBtn.addEventListener("click", openGuess);

// Click ra ngoài để đóng
document.addEventListener("click", function(e){
    if(!guessForm.contains(e.target) && 
       !guessBtn.contains(e.target) && 
       !guessForm.classList.contains("hidden")){
        closeGuess();
    }
});

// Nhấn ESC để đóng
document.addEventListener("keydown", function(e){
    if(e.key === "Escape"){
        closeGuess();
    }
});

// Nhấn Enter để submit
inputGuess.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        e.preventDefault();
        document.getElementById("guessing").click();
    }
});

const guessing = document.getElementById("guessing");

const winner = new Audio("../soundtrack/TT_đúng_O7.mp3.mp3")
const loser = new Audio("../soundtrack/TT_mở_đáp_án_left_O11.mp3")

guessing.addEventListener("click", () => {

    const userAnswer = document.getElementById("input-guess").value.trim().toLowerCase();

    fetch("https://68ce57f66dc3f350777eb99b.mockapi.io/olympia")
        .then(res => res.json())
        .then(data => {

            const accept_guess = data[5].dung.toLowerCase();

            if(userAnswer === accept_guess){

                // Mở toàn bộ ảnh
                for(let i = 1; i <= 5; i++){
                    const block = document.getElementById(`quiz-${i}`);
                    if(block){
                        block.style.display = "none";
                    }
                }

                winner.play()

                closeGuess();

            } else {

                loser.play()
                document.getElementById("input-guess").value = "";

                closeGuess();

            }

        });

});
