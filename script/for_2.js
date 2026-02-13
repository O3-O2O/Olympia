function saveAnswerToFirebase(isCorrect) {
    const questionId = 2; // 👈 đổi theo từng câu

    db.collection("Olympia")
      .where("questionId", "==", questionId)
      .limit(1)
      .get()
      .then((querySnapshot) => {
          if (!querySnapshot.empty) {
              console.log("⚠️ Câu hỏi này đã được lưu rồi, không add nữa");
              return;
          }

          // ❌ chưa có → mới add
          return db.collection("Olympia").add({
              questionId: questionId,
              isCorrect: isCorrect,
              answeredAt: firebase.firestore.FieldValue.serverTimestamp()
          });
      })
      .then(() => {
          console.log("✅ Đã lưu kết quả vào Firebase");
      })
      .catch((error) => {
          console.error("❌ Lỗi khi xử lý:", error);
      });
}