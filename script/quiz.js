window.teleport = async (number) => {

    window.location.href = `quiz_${number}.html`

}

window.loading = async () => {

    db.collection("Olympia").get()
        .then(snapshot => {

            snapshot.forEach(doc => {

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

        })
        .catch(err => {
            console.error("Firestore error:", err);
        });

}


loading()