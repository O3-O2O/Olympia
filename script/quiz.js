window.teleport = async (number) => {

    window.location.href = `quiz_${number}.html`

}

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