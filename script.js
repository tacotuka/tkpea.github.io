function checkAnswers(event) {
    event.preventDefault();

    let score = 0;
    let feedback = "";

    const answers = {
        q1: "ai pair programmer",
        q2: "b",
        q3: "c",
        q4: "b",
        q5: ["a", "b", "d"]
    };

    // Question 1
    const q1Input = document.getElementById("q1");
    if (q1Input) {
        const userAnswer = q1Input.value.trim().toLowerCase();
        if (userAnswer.includes("ai pair programmer")) {
            score++;
            feedback += "<p>1. ✅ Correct! Copilot is designed as an AI pair programmer.</p>";
        } else if (userAnswer.length === 0) {
            feedback += "<p>1. ❌ Not answered.</p>";
        } else {
            feedback += "<p>1. ❌ Incorrect. Copilot’s primary role is serving as an AI pair programmer.</p>";
        }
    }

    // Questions 2–4
    for (let i = 2; i <= 4; i++) {
        const name = "q" + i;
        const correct = answers[name];
        const selected = document.querySelector(`input[name="${name}"]:checked`);

        if (!selected) {
            feedback += `<p>${i}. ❌ Not answered.</p>`;
            continue;
        }

        if (selected.value === correct) {
            score++;
            feedback += `<p>${i}. ✅ Correct.</p>`;
        } else {
            feedback += `<p>${i}. ❌ Incorrect.</p>`;
        }
    }

      // Question 5
      const selectedCheckboxes = [...document.querySelectorAll('input[name="q5"]:checked')].map(cb => cb.value);
      const correctAnswers = answers.q5;
      const isCorrect =
        selectedCheckboxes.length === correctAnswers.length &&
        selectedCheckboxes.every(v => correctAnswers.includes(v));

      if (isCorrect) {
        score++;
        feedback += "<p>5. ✅ Correct</p>";
      } else {
        feedback += "<p>5. ❌ Incorrect. Correct answers: Machine Learning, Neural Networks, NLP.</p>";
      }

      // Quiz Results
      const total = 5;
      const percent = (score / total) * 100;
      const pass = percent >= 60 ? "✅ Pass" : "❌ Fail";

      document.getElementById("results").innerHTML = `
        <h3>Your Score: ${score}/${total} (${percent.toFixed(0)}%) – ${pass}</h3>
        <div class="feedback">${feedback}</div>
      `;

      document.getElementById("results").style.background = pass.includes("Pass") ? "#d9fcd9" : "#fdd9d9";
      document.getElementById("results").style.padding = "15px";
      document.getElementById("results").style.borderRadius = "10px";
    }
