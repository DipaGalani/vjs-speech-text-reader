const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

// Create speech box
const createBox = (item) => {
  const box = document.createElement("div");
  const { image, text } = item;

  box.classList.add("box");
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  // @todo - speak event
  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    // Add an active effect
    box.classList.add("active");
    setTimeout(() => {
      box.classList.remove("active");
    }, 800);
  });

  main.appendChild(box);
};

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

const getVoices = () => {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.setAttribute("value", voice.name);
    option.textContent = `${voice.name} - ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
};

// Set text
const setTextMessage = (text) => {
  message.text = text;
};

// speak text
const speakText = () => {
  speechSynthesis.speak(message);
};

// change voice
const setVoice = (e) => {
  message.voice = voices.find((voice) => voice.name === e.target.value);
};

// Voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

data.forEach(createBox);

// Event Listeners
toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

voicesSelect.addEventListener("change", setVoice);

readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
