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
  },
  {
  question: "You’re offered a modeling gig during finals.",
  choices: [
    { text: "Accept it", money: 300, grades: -10, happiness: 15, result: "You’re trending!" },
    { text: "Decline", money: 0, grades: 10, happiness: -5, result: "You stayed focused." },
    { text: "Negotiate schedule", money: 150, grades: 5, happiness: 5, result: "Balanced fame and school!" }
  ]
},
{
  question: "You’re accused of plagiarism.",
  choices: [
    { text: "Defend yourself", money: 0, grades: -5, happiness: -10, result: "You cleared your name." },
    { text: "Admit and apologize", money: 0, grades: -15, happiness: -5, result: "You learned a lesson." },
    { text: "Blame AI", money: 0, grades: -10, happiness: -5, result: "They didn’t buy it." }
  ]
},
{
  question: "You’re invited to a national quiz bee.",
  choices: [
    { text: "Join and train", money: 0, grades: 15, energy: -10, result: "You placed top 3!" },
    { text: "Decline", money: 0, grades: 0, energy: 5, result: "Less pressure." },
    { text: "Join unprepared", money: 0, grades: -5, energy: -5, result: "You froze on stage." }
  ]
},
{
  question: "You get a part-time gig editing TikToks.",
  choices: [
    { text: "Accept it", money: 200, grades: -5, energy: -10, result: "You’re earning!" },
    { text: "Decline", money: 0, grades: 5, energy: 5, result: "More time for school." },
    { text: "Ask for collab", money: 100, grades: 0, happiness: 10, result: "You gained followers!" }
  ]
},
{
  question: "You’re offered a college scholarship.",
  choices: [
    { text: "Accept it", money: 0, grades: 20, happiness: 10, result: "Future secured!" },
    { text: "Decline", money: 0, grades: -10, happiness: -10, result: "You’ll find another path." },
    { text: "Ask for gap year", money: 0, grades: 0, happiness: 5, result: "Time to reflect." }
  ]
},
{
  question: "You’re asked to speak at graduation.",
  choices: [
    { text: "Prepare a speech", money: 0, grades: 10, happiness: 10, result: "You inspired everyone!" },
    { text: "Decline politely", money: 0, grades: 0, happiness: 5, result: "Less stress." },
    { text: "Wing it", money: 0, grades: -5, happiness: -5, result: "It was awkward." }
  ]
},
{
  question: "You’re offered a summer job abroad.",
  choices: [
    { text: "Accept it", money: 500, grades: 0, happiness: 15, result: "New adventure!" },
    { text: "Decline", money: 0, grades: 5, happiness: -5, result: "You stayed local." },
    { text: "Ask for remote work", money: 300, grades: 0, happiness: 10, result: "You balanced both!" }
  ]
},
{
  question: "You’re asked to mentor younger students.",
  choices: [
    { text: "Accept", money: 0, grades: 10, happiness: 10, result: "You made an impact!" },
    { text: "Decline", money: 0, grades: 0, happiness: 0, result: "You focused on yourself." },
    { text: "Charge a fee", money: 100, grades: 0, happiness: -5, result: "Mixed reactions." }
  ]
},
{
  question: "You’re tempted to drop out and start a business.",
  choices: [
    { text: "Drop out", money: 300, grades: -50, happiness: 20, result: "Risky but bold!" },
    { text: "Finish school first", money: 0, grades: 20, happiness: 5, result: "Smart move." },
    { text: "Try both", money: 150, grades: -10, happiness: 10, result: "You’re hustling!" }
  ]
},
{
  question: "Graduation day! What do you do?",
  choices: [
    { text: "Celebrate with family", money: -100, grades: 0, happiness: 20, result: "Joyful ending!" },
    { text: "Post on TikTok", money: 0, grades: 0, happiness: 10, result: "You went viral!" },
    { text: "Reflect quietly", money: 0, grades: 0, happiness: 5, result: "Peaceful closure." }
  ]
},
{
  question: "You’re nominated for 'Campus Crush' in a school poll.",
  choices: [
    { text: "Embrace it", money: 0, grades: 0, happiness: 15, result: "You’re trending!" },
    { text: "Reject the attention", money: 0, grades: 5, happiness: -10, result: "You stayed focused." },
    { text: "Sabotage the poll", money: -50, grades: -5, happiness: -5, result: "Drama alert!" }
  ]
},
{
  question: "You’re offered a scholarship to a private school.",
  choices: [
    { text: "Accept it", money: 0, grades: 15, happiness: 10, result: "New beginnings!" },
    { text: "Stay in public school", money: 0, grades: 5, happiness: 5, result: "You value your roots." },
    { text: "Decline and take a gap year", money: 0, grades: -10, energy: 10, result: "Time to reflect." }
  ]
},
{
  question: "You get caught cheating on a test.",
  choices: [
    { text: "Apologize", money: 0, grades: -10, happiness: -5, result: "You owned up." },
    { text: "Deny everything", money: 0, grades: -15, happiness: -10, result: "They didn’t believe you." },
    { text: "Blame your seatmate", money: 0, grades: -20, happiness: -20, result: "Friendship ruined." }
  ]
},
{
  question: "You’re invited to a debate competition.",
  choices: [
    { text: "Join and prepare", money: 0, grades: 10, energy: -10, result: "You impressed everyone!" },
    { text: "Decline", money: 0, grades: 0, energy: 5, result: "Less pressure." },
    { text: "Wing it", money: 0, grades: -5, energy: -5, result: "You froze on stage." }
  ]
},
{
  question: "You start a small business selling snacks.",
  choices: [
    { text: "Go all in", money: 200, grades: -5, energy: -10, result: "Entrepreneur vibes!" },
    { text: "Sell occasionally", money: 50, grades: 0, energy: -5, result: "Side hustle success." },
    { text: "Give away snacks", money: -50, grades: 0, happiness: 10, result: "You made friends!" }
  ]
},
{
  question: "You’re invited to a secret party.",
  choices: [
    { text: "Attend and stay late", money: -100, grades: -10, energy: -10, result: "Wild night!" },
    { text: "Go but leave early", money: -50, grades: -5, energy: -5, result: "You balanced fun and rest." },
    { text: "Decline", money: 0, grades: 5, energy: 10, result: "You stayed focused." }
  ]
},
{
  question: "You get food poisoning before a school trip.",
  choices: [
    { text: "Still go", money: -50, grades: 0, health: -20, result: "You suffered through it." },
    { text: "Stay home", money: 0, grades: 0, health: 10, result: "You recovered." },
    { text: "Fake being fine", money: 0, grades: -5, health: -10, result: "You collapsed mid-trip." }
  ]
},
{
  question: "You’re asked to tutor a struggling classmate.",
  choices: [
    { text: "Help them", money: 0, grades: 5, happiness: 10, result: "They improved!" },
    { text: "Charge a fee", money: 100, grades: 0, happiness: -5, result: "You made cash." },
    { text: "Refuse", money: 0, grades: 0, happiness: -10, result: "They’re disappointed." }
  ]
},
{
  question: "You’re caught sleeping in class.",
  choices: [
    { text: "Apologize", money: 0, grades: -5, energy: 5, result: "Teacher forgave you." },
    { text: "Make an excuse", money: 0, grades: -10, energy: 5, result: "They didn’t buy it." },
    { text: "Ignore it", money: 0, grades: -15, energy: 10, result: "You’re now infamous." }
  ]
},
{
  question: "You win a school raffle!",
  choices: [
    { text: "Take the prize", money: 200, grades: 0, happiness: 10, result: "Lucky day!" },
    { text: "Donate it", money: 0, grades: 5, happiness: 15, result: "You’re admired." },
    { text: "Sell it", money: 150, grades: 0, happiness: 5, result: "Smart move!" }
  ]
},
{
    question: "Enrollment day! You forgot your documents.",
    choices: [
      { text: "Go home and get them", money: -20, grades: 0, energy: -10, result: "You got them, but missed orientation." },
      { text: "Bribe the registrar", money: -100, grades: 0, energy: 0, result: "Risky move, but it worked." },
      { text: "Skip enrollment", money: 0, grades: -20, energy: 10, result: "You missed your first week!" }
    ]
  },
  {
    question: "Typhoon warning! Do you evacuate campus?",
    choices: [
      { text: "Stay indoors", money: 0, grades: 0, energy: 5, result: "You stayed safe." },
      { text: "Evacuate", money: -20, grades: 0, energy: -5, result: "🏆 Survivor (+50)" },
      { text: "Check if weekend", money: 0, grades: 0, energy: 0, result: "It was Saturday. No school!" }
    ]
  },
  {
    question: "Your phone breaks before a group project.",
    choices: [
      { text: "Borrow a friend’s", money: 0, grades: 5, energy: -5, result: "You managed!" },
      { text: "Buy a new one", money: -200, grades: 0, energy: -5, result: "Ouch, expensive!" },
      { text: "Ignore the project", money: 0, grades: -15, energy: 5, result: "Your group is mad." }
    ]
  },
  {
    question: "You’re invited to a student org.",
    choices: [
      { text: "Join and be active", money: -20, grades: 5, energy: -10, result: "You gained leadership skills!" },
      { text: "Join but stay quiet", money: -10, grades: 0, energy: 0, result: "You’re just a name on the list." },
      { text: "Decline", money: 0, grades: 0, energy: 5, result: "More time for yourself." }
    ]
  },
  {
    question: "Surprise quiz! You didn’t study.",
    choices: [
      { text: "Guess answers", money: 0, grades: -5, energy: -5, result: "You passed... barely." },
      { text: "Skip class", money: 0, grades: -10, energy: 10, result: "You avoided it, but lost points." },
      { text: "Ask seatmate for help", money: 0, grades: 5, energy: -5, result: "Risky but helpful!" }
    ]
  },
  {
    question: "You’re broke before midterms.",
    choices: [
      { text: "Sell old clothes", money: 50, grades: 0, energy: -5, result: "Ukay-Ukay hustle!" },
      { text: "Borrow from a friend", money: 100, grades: 0, energy: -5, result: "They helped you out." },
      { text: "Skip meals", money: 0, grades: -5, energy: -10, result: "You’re starving." }
    ]
  },
  {
    question: "Heartbreak! Your partner dumps you.",
    choices: [
      { text: "Cry and skip class", money: 0, grades: -10, energy: -10, result: "Sad and falling behind." },
      { text: "Focus on studies", money: 0, grades: 10, energy: -5, result: "You channeled the pain!" },
      { text: "Go out and party", money: -100, grades: -5, energy: 5, result: "Temporary distraction." }
    ]
  },
  {
    question: "Finals week! You’re exhausted.",
    choices: [
      { text: "Push through", money: 0, grades: 15, energy: -15, result: "You passed!" },
      { text: "Cheat", money: 0, grades: 10, energy: -5, result: "You got away with it." },
      { text: "Drop one subject", money: 0, grades: -10, energy: 10, result: "Less stress, but delayed grad." }
    ]
  },
  {
    question: "Internship offer! But it’s unpaid.",
    choices: [
      { text: "Accept it", money: 0, grades: 10, energy: -10, result: "You gained experience!" },
      { text: "Decline", money: 0, grades: -5, energy: 5, result: "You missed out." },
      { text: "Negotiate pay", money: 50, grades: 5, energy: -5, result: "You got a deal!" }
    ]
  },
  {
    question: "Graduation fees due!",
    choices: [
      { text: "Ask family", money: 0, grades: 0, energy: 0, result: "They helped!" },
      { text: "Take a loan", money: -300, grades: 0, energy: -5, result: "You’re in debt but graduated." },
      { text: "Delay graduation", money: 0, grades: -20, energy: 10, result: "You’ll try again next year." }
    ]
  },
  {
    question: "You’re invited to a beach trip during exam week.",
    choices: [
      { text: "Go anyway", money: -150, grades: -10, energy: 10, result: "Fun but risky!" },
      { text: "Study instead", money: 0, grades: 15, energy: -10, result: "You aced the exam!" },
      { text: "Ask for reschedule", money: 0, grades: 5, energy: 0, result: "They agreed!" }
    ]
  },
  {
    question: "You get nominated for class president.",
    choices: [
      { text: "Accept and campaign", money: -50, grades: 5, energy: -10, result: "You won!" },
      { text: "Decline", money: 0, grades: 0, energy: 5, result: "Less stress." },
      { text: "Sabotage opponent", money: -100, grades: -10, energy: 0, result: "You got caught!" }
    ]
  },
  {
    question: "You find a lost wallet on campus.",
    choices: [
      { text: "Return it", money: 0, grades: 5, energy: 0, result: "Good karma!" },
      { text: "Keep the cash", money: 200, grades: -10, energy: 0, result: "Guilt follows you." },
      { text: "Ignore it", money: 0, grades: 0, energy: 0, result: "Someone else took it." }
    ]
  },
  {
    question: "You’re offered a part-time job.",
    choices: [
      { text: "Accept it", money: 100, grades: -5, energy: -10, result: "Extra cash, less sleep." },
      { text: "Decline", money: 0, grades: 0, energy: 5, result: "More time to study." },
      { text: "Negotiate hours", money: 50, grades: 0, energy: -5, result: "Balanced life!" }
    ]
  },
  {
    question: "You get sick before a big exam.",
    choices: [
      { text: "Take meds and study", money: -30, grades: 10, energy: -10, health: -10, result: "You pushed through!" },
      { text: "Rest and skip exam", money: 0, grades: -15, energy: 10, health: 10, result: "You recovered." },
      { text: "Cheat", money: 0, grades: 5, energy: -5, health: -5, result: "Risky move." }
    ]
  },
  {
  question: "You’re offered a free review center slot for college entrance exams.",
  choices: [
    { text: "Accept and attend", money: 0, grades: 15, energy: -10, result: "You’re more prepared than ever!" },
    { text: "Sell your slot", money: 300, grades: -5, happiness: -5, result: "Quick cash, risky move." },
    { text: "Ignore it", money: 0, grades: -10, energy: 5, result: "You missed a big opportunity." }
  ]
},
{
  question: "Your best friend is transferring schools.",
  choices: [
    { text: "Throw a farewell party", money: -100, happiness: 15, result: "You made great memories!" },
    { text: "Write them a letter", money: 0, happiness: 10, result: "They’ll never forget you." },
    { text: "Say nothing", money: 0, happiness: -10, result: "You regret staying silent." }
  ]
},
{
  question: "You’re asked to join a student protest.",
  choices: [
    { text: "Join peacefully", money: 0, grades: 5, happiness: 10, result: "You stood for something." },
    { text: "Stay neutral", money: 0, grades: 0, happiness: 0, result: "You avoided conflict." },
    { text: "Report it", money: 0, grades: 10, happiness: -10, result: "You caused tension." }
  ]
},
{
  question: "You’re offered a free trip to Manila for a youth summit.",
  choices: [
    { text: "Go and network", money: 0, grades: 10, happiness: 15, result: "You met future leaders!" },
    { text: "Decline to focus on school", money: 0, grades: 5, happiness: -5, result: "You stayed on track." },
    { text: "Send a friend instead", money: 0, grades: 0, happiness: 5, result: "They appreciated it." }
  ]
},
{
  question: "You’re feeling burnt out and unmotivated.",
  choices: [
    { text: "Take a mental health break", money: 0, grades: -5, happiness: 15, result: "You feel refreshed." },
    { text: "Push through", money: 0, grades: 10, health: -10, result: "You’re drained but productive." },
    { text: "Talk to a counselor", money: -50, happiness: 10, result: "You feel heard." }
  ]
},
{
  question: "You’re offered a chance to study abroad.",
  choices: [
    { text: "Accept the offer", money: 0, grades: 20, happiness: 10, result: "New horizons await!" },
    { text: "Stay local", money: 0, grades: 5, happiness: 5, result: "You stayed close to home." },
    { text: "Decline and work instead", money: 200, grades: -10, happiness: 0, result: "You chose independence." }
  ]
},
{
  question: "You’re caught in a cheating scandal you didn’t cause.",
  choices: [
    { text: "Clear your name", money: 0, grades: -5, happiness: -5, result: "Justice prevailed." },
    { text: "Stay silent", money: 0, grades: -10, happiness: -10, result: "You were misunderstood." },
    { text: "Expose the real cheater", money: 0, grades: 5, happiness: -5, result: "You made enemies." }
  ]
},
{
  question: "You’re offered a TikTok collab with a local influencer.",
  choices: [
    { text: "Say yes!", money: 150, happiness: 15, grades: -5, result: "You gained followers!" },
    { text: "Decline to focus on school", money: 0, grades: 10, happiness: -5, result: "You stayed focused." },
    { text: "Ask for a paid deal", money: 300, happiness: 10, grades: -10, result: "You’re a micro-influencer now!" }
  ]
},
{
  question: "You’re offered a leadership award at graduation.",
  choices: [
    { text: "Accept with pride", money: 0, grades: 10, happiness: 15, result: "You made your family proud!" },
    { text: "Decline humbly", money: 0, grades: 5, happiness: 5, result: "You stayed grounded." },
    { text: "Ask for a group award", money: 0, grades: 5, happiness: 10, result: "You shared the spotlight." }
  ]
},
{
  question: "You’re asked: What’s next after graduation?",
  choices: [
    { text: "College life!", money: 0, grades: 10, happiness: 10, result: "A new chapter begins." },
    { text: "Start a business", money: 300, grades: -10, happiness: 15, result: "You’re your own boss!" },
    { text: "Take a break", money: 0, grades: -5, happiness: 5, result: "You earned it." }
  ]
},
{
    question: "Your crush asks for help in math.",
    choices: [
      { text: "Tutor them", money: 0, grades: 5, happiness: 10, result: "Bonding time!" },
      { text: "Ignore them", money: 0, grades: 0, happiness: -10, result: "They’re disappointed." },
      { text: "Ask for a date instead", money: -50, grades: 0, happiness: 15

      {
  question: "You’re offered a full scholarship abroad, but your family needs help at home.",
  choices: [
    { text: "Accept and leave", money: 0, grades: 20, happiness: 10, result: "You chose your future." },
    { text: "Stay and support family", money: 0, grades: -10, happiness: 5, result: "You stayed loyal." },
    { text: "Try online classes", money: 0, grades: 10, energy: -10, result: "You’re juggling both worlds." }
  ]
},
{
  question: "Your small business is booming!",
  choices: [
    { text: "Drop school and scale it", money: 500, grades: -30, happiness: 20, result: "You’re a young CEO!" },
    { text: "Hire help and stay in school", money: 200, grades: 10, energy: -10, result: "Smart delegation!" },
    { text: "Sell the business", money: 1000, grades: 0, happiness: 10, result: "You cashed out!" }
  ]
},
{
  question: "You’re offered a modeling contract with a major brand.",
  choices: [
    { text: "Sign immediately", money: 400, grades: -10, happiness: 15, result: "You’re on billboards!" },
    { text: "Negotiate terms", money: 300, grades: 0, happiness: 10, result: "You got a better deal!" },
    { text: "Decline to focus on school", money: 0, grades: 10, happiness: -5, result: "You stayed grounded." }
  ]
},
{
  question: "You’re invited to speak at a national youth summit.",
  choices: [
    { text: "Prepare and go", money: 0, grades: 10, happiness: 15, result: "You inspired thousands!" },
    { text: "Decline politely", money: 0, grades: 0, happiness: 0, result: "You stayed humble." },
    { text: "Send a video message", money: 0, grades: 5, happiness: 5, result: "You still made an impact." }
  ]
},
{
  question: "You’re offered a job in Manila after graduation.",
  choices: [
    { text: "Move to the city", money: 300, grades: 0, happiness: 10, result: "Big city life begins!" },
    { text: "Stay in Borongan", money: 100, grades: 0, happiness: 5, result: "You stayed close to home." },
    { text: "Freelance online", money: 200, grades: 0, happiness: 10, result: "You work from anywhere!" }
  ]
},
{
  question: "You’re invited to a reunion with your Grade 7 classmates.",
  choices: [
    { text: "Attend and reconnect", money: -50, happiness: 15, result: "Nostalgia hits hard!" },
    { text: "Skip it", money: 0, happiness: -5, result: "You missed out on memories." },
    { text: "Organize the event", money: -100, happiness: 20, result: "Everyone loved it!" }
  ]
},
{
  question: "You’re offered a chance to mentor incoming freshmen.",
  choices: [
    { text: "Accept and guide them", money: 0, grades: 5, happiness: 10, result: "You became a role model!" },
    { text: "Decline", money: 0, grades: 0, happiness: 0, result: "You focused on your own path." },
    { text: "Create a YouTube advice series", money: 150, grades: 0, happiness: 15, result: "You went viral!" }
  ]
},
{
  question: "You’re invited to a national art competition.",
  choices: [
    { text: "Submit your best work", money: 0, grades: 5, happiness: 15, result: "You won 2nd place!" },
    { text: "Decline to focus on studies", money: 0, grades: 10, happiness: -5, result: "You stayed focused." },
    { text: "Help a friend submit theirs", money: 0, grades: 0, happiness: 10, result: "They were grateful." }
  ]
},
{
  question: "You’re offered a full-time job before graduation.",
  choices: [
    { text: "Take it and skip college", money: 500, grades: -20, happiness: 10, result: "You’re earning early!" },
    { text: "Finish school first", money: 0, grades: 15, happiness: 5, result: "You stayed the course." },
    { text: "Ask for part-time", money: 200, grades: 5, energy: -5, result: "You balanced both!" }
  ]
},
{
  question: "You’re asked to write a letter to your younger self.",
  choices: [
    { text: "Write it honestly", money: 0, grades: 0, happiness: 15, result: "You found closure." },
    { text: "Write a funny one", money: 0, grades: 0, happiness: 10, result: "You laughed at your growth." },
    { text: "Skip it", money: 0, grades: 0, happiness: -5, result: "You missed a chance to reflect." }
  ]
}
