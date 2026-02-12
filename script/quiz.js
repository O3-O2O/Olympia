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