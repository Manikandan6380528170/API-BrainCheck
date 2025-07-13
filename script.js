const questions = [
  {
        question: "Web services were widely used in which environment?",
        options: ["Mobile Computing", "Digital Computing", "Distributed computing", "All these"],
        answer: "Distributed computing"
      },
      {
        question: "Web service is used for which service?",
        options: ["Host", "Run", "Compile", "Debug"],
        answer: "Host"
      },
      {
        question: "Rely on xml based messaging and operate through?",
        options: ["WSDL", "VCCI", "XML", "ERP"],
        answer: "WSDL"
      },
{
        question: "Which type of webservice used the HTTP method?",
        options: ["SOAP", "REST", "UDP", "FTP"],
        answer: "REST"
      },
{
        question: "What are the emergence of web service?",
        options: ["Interoperability", "High reliability", "Resource sharing", "Service request"],
        answer: "Interoperability"
      },
{
        question: "Which architecture were client can communicate with server?",
        options: ["Client-server", "Dumb terminals", "Thick client", "Thin client"],
        answer: "Client-server"
      },
{
        question: "Which client is a leight weight computer as software application?",
        options: ["Thin", "Thick", "Dumb", "Server"],
        answer: "Thin"
      },
{
        question: "Which can be interact with server primarily for data storage and communication?",
        options: ["Thin", "Thick", "Dumb", "Server"],
        answer: "Thick"
      },
{
        question: "An Software application that runs within web browser?",
        options: ["Browserbased client", "Native Client", "Thick client", "Thin client"],
        answer: "Browserbased client"
      },
{
        question: "An Application which run an smartphone with their own code and UI?",
        options: ["Browserbased client", "Mobile Client", "Thick client", "Thin client"],
        answer: "Mobile Client"
      },
{
        question: "The standardized ways for application to communicate over the internet?",
        options: ["XML", "XSD", "WSDL", "UDDI"],
        answer: "XML"
      },
{
        question: "What is the primary purpose of XML?",
        options: ["To style HTML documents","To store and transport data","To create hyperlinks","To generate videos"],
        answer: "To store and transport data"
      },
{
        question: "Which of the following is true about XML tags?",
        options: ["Tags are optional","Tags must be properly nested","Tags can comtain spaces","Tags are case-insensitive"],
        answer: "Tags must be properly nested"
      },
{
        question: "What is a root element in XML?",
        options: ["The first element of a document", "A special attribute", "The main container for all other element", "An optional features in xml"],
        answer: "The main container for all other element"
      },
{
        question: "Which character must be escaped in XML?",
        options: ["@", "$", "&", "%"],
        answer: "&"
      },
{
        question: "Which syntax is correct for an empty elements in XML?",
        options: ["<empty>", "<empty></empty>", "<empty/>", "</empty>"],
        answer: "<empty/>"
      },
{
        question: "What is the role of CDATA in XML?",
        options: ["Store comments", "Include raw data without parsing", "Define attributes'", "Create namespaces"],
        answer: "Include raw data without parsing"
      },
{
        question: "What is the advantage of XML over JSON?",
        options: ["Conciseness", "Built-in data types", "Strong scheme support", "Faster processing"],
        answer: "Strong scheme support"
      },
{
        question: "What does a well-formed XML document means?",
        options: ["JSON Schema", "XML Schema(XSD)", "CSV", "YAML"],
        answer: "XML Schema(XSD)"
      },
{
        question: "What is a significant limitation of XML compared to JSON?",
        options: ["Lack of schema support", "Verbose syntax", "No support for hierarchical structures", "Cannot be validated"],
        answer: "Verbose syntax"
      },
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const nextBtn = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz');
const scoreCard = document.getElementById('score-card');
const scoreMessage = document.getElementById('score-message');
const finalScore = document.getElementById('final-score');

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  choicesEl.innerHTML = "";
  q.choices.forEach((choice, index) => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.classList.add("choice");
    li.onclick = () => selectAnswer(index);
    choicesEl.appendChild(li);
  });
}

function selectAnswer(index) {
  if (index === questions[currentQuestion].answer) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  quizContainer.classList.add("hidden");
  scoreCard.classList.remove("hidden");
  finalScore.textContent = score;

  if (score >= 3) {
    scoreMessage.textContent = "🎉 Congratulations!";
    launchConfetti();
  } else {
    scoreMessage.textContent = "😢 Better Luck Next Time!";
  }
}

// Add Confetti
function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const confetti = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let pieces = [];
  for (let i = 0; i < 100; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 10 + 5,
      d: Math.random() * 2 + 1,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`
    });
  }

  function draw() {
    confetti.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of pieces) {
      confetti.beginPath();
      confetti.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      confetti.fillStyle = p.color;
      confetti.fill();
    }
    update();
  }

  function update() {
    for (let p of pieces) {
      p.y += p.d;
      if (p.y > canvas.height) {
        p.y = -p.r;
      }
    }
  }

  setInterval(draw, 30);
}

nextBtn.addEventListener('click', () => {
  showQuestion();
  nextBtn.style.display = "none";
});

window.onload = () => {
  nextBtn.style.display = "none";
  showQuestion();
};
