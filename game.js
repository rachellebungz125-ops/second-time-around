let player = {
  name: "",
  avatar: "",
  trait: "",
  money: 100,
  grades: 50,
  energy: 50,
  happiness: 50,
  health: 50,
  level: 1,
  achievements: []
};

const traits = {
  Hardworking: { grades: 10 },
  Lazy: { energy: 10 },
  Popular: { happiness: 10 },
  Shy: { health: 10 }
};

const gradeLevels = ["Grade 7", "Grade 8", "Grade 9", "Grade 10"];

function startGame() {
  player.name = document.getElementById("nameInput").value || "Student";
  player.avatar = document.getElementById("genderSelect").value;
  player.trait = document.getElementById("traitSelect")?.value || "Hardworking";

  // Apply trait bonus
  for (let stat in traits[player.trait]) {
    player[stat] += traits[player.trait][stat];
  }

  document.getElementById("setup").style.display = "none";
  document.getElementById("game").style.display = "block";
  updateUI();
  loadScenario();
}

function updateUI() {
  document.getElementById("playerInfo").innerText =
    `${player.name} ${player.avatar} • ${player.trait}\n${getGradeLevel()}`;
  document.getElementById("money").innerText = player.money;
  document.getElementById("grades").innerText = player.grades;
  document.getElementById("energy").innerText = player.energy;
  document.getElementById("happiness").innerText = player.happiness;
  document.getElementById("health").innerText = player.health;
  document.getElementById("levelDisplay").innerText = player.level;
  document.getElementById("gradeLevel").innerText = getGradeLevel();
}

function getGradeLevel() {
  return gradeLevels[Math.floor((player.level - 1) / 10)];
}

function loadScenario() {
  if (player.level > 50) return endGame();

  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
  document.getElementById("question").innerText = scenario.question;
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  scenario.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.innerText = choice.text;
    btn.onclick = () => choose(choice);
    choicesDiv.appendChild(btn);
  });
}

function choose(choice) {
  player.money += choice.money;
  player.grades += choice.grades;
  player.energy += choice.energy;
  player.happiness += choice.happiness || 0;
  player.health += choice.health || 0;

  document.getElementById("result").innerText = choice.result;
  checkAchievements(choice);
  player.level++;
  updateUI();
  setTimeout(loadScenario, 1000);
}

function checkAchievements(choice) {
  if (choice.result.includes("Survivor") && !player.achievements.includes("Survivor")) {
    player.achievements.push("Survivor");
    document.getElementById("result").innerText += "\n🏆 New Achievement: Survivor (+50)";
    player.happiness += 10;
  }
}

function endGame() {
  let ending = "You graduated!";
  if (player.grades < 30) ending = "You dropped out.";
  else if (player.energy < 20 || player.health < 20) ending = "You burned out.";
  else if (player.grades > 90 && player.happiness > 80) ending = "Top Honors! 🎉";

  document.getElementById("question").innerText = ending;
  document.getElementById("choices").innerHTML = "";
  document.getElementById("result").innerText = `Final Stats:
  💰 Money: ${player.money}
  📚 Grades: ${player.grades}
  😴 Energy: ${player.energy}
  😊 Happiness: ${player.happiness}
  ❤️ Health: ${player.health}
  🏆 Achievements: ${player.achievements.join(", ") || "None"}`;
}

function restartGame() {
  location.reload();
}

// Sample scenarios (add more for full 50-level experience)
const scenarios = [
  {
    question: "Typhoon warning! Do you evacuate campus?",
    choices: [
      { text: "Stay indoors", money: 0, grades: 0, energy: 5, result: "You stayed safe." },
      { text: "Evacuate", money: -20, grades: 0, energy: -5, result: "🏆 Survivor (+50)" },
      { text: "Check if weekend", money: 0, grades: 0, energy: 0, result: "It was Saturday. No school!" }
    ]
  },
  {
    question: "Surprise quiz! You didn’t study.",
    choices: [
      { text: "Guess answers", money: 0, grades: -5, energy: -5, result: "You passed... barely." },
      { text: "Skip class", money: 0, grades: -10, energy: 10, result: "You avoided it, but lost points." },
      { text: "Ask seatmate for help", money: 0, grades: 5, energy: -5, result: "Risky but helpful!" }
    ]
  }
];