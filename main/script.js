// Adresse et ABI du contrat
const contractAddress = "0x021375386DcE7017F2A14B38e5e4E715FcCFC24c";
const contractABI = [
  {
    inputs: [
      {
        internalType: "uint8",
        name: "questionId",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "option",
        type: "uint8",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "questionId",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "option",
        type: "uint8",
      },
    ],
    name: "getVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

let web3;
let contract;
let accounts;

// Questions du jeu
const questions = [
  {
    id: 0,
    optionA: "Beyonce has won the Grammy Awards 2024?",
    optionB: "Keep Taylor Swift as the winner?",
  },
  {
    id: 1,
    optionA: "See Amy Schumer resign as a comedian?",
    optionB: "See Chris Rock get slapped again by Will Smith?",
  },
  {
    id: 2,
    optionA: "See Zendaya come again for the Next Spiderman?",
    optionB: "Yes",
    optionC: "No",
  },
  {
    id: 3,
    optionA: "Invest your money in a bank?",
    optionB: "Buy cryptocurrencies?",
  },
  {
    id: 4,
    optionA: "Watch Trump or Biden interview?",
    optionB: "Watch Star Wars 9?",
  },
];

let currentQuestion = 0;

// Initialisation de l'application et connexion à MetaMask
async function init() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      // Demande l'accès au compte MetaMask de l'utilisateur
      accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("MetaMask connected", accounts);
      // Initialise le contrat avec l'adresse et l'ABI
      contract = new web3.eth.Contract(contractABI, contractAddress);
      console.log("Contract initialized", contract);
      updateStats();
    } catch (error) {
      console.error("User denied account access", error);
    }
  } else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
}

// Fonction pour voter
async function vote(option) {
  try {
    showLoadingPopup();
    console.log("Voting for option:", option);
    await contract.methods
      .vote(currentQuestion, option)
      .send({ from: accounts[0] });
    console.log("Vote successful");
    hideLoadingPopup();
    updateStats();
  } catch (error) {
    console.error("Error voting", error);
    hideLoadingPopup();
  }
}

// Mise à jour des statistiques de vote
async function updateStats() {
  try {
    const question = questions[currentQuestion];
    const optionAVotes = await contract.methods.getVotes(question.id, 0).call();
    const optionBVotes = await contract.methods.getVotes(question.id, 1).call();

    // Conversion BigInt en nombre
    const optionAVotesNumber = Number(optionAVotes);
    const optionBVotesNumber = Number(optionBVotes);
    const totalVotes = optionAVotesNumber + optionBVotesNumber;

    const optionAPercentage =
      totalVotes === 0
        ? 0
        : ((optionAVotesNumber / totalVotes) * 100).toFixed(2);
    const optionBPercentage =
      totalVotes === 0
        ? 0
        : ((optionBVotesNumber / totalVotes) * 100).toFixed(2);

    console.log(
      "Option A votes:",
      optionAVotesNumber,
      "Option B votes:",
      optionBVotesNumber,
      "Total votes:",
      totalVotes
    );

    document.getElementById(
      "optionA-votes"
    ).textContent = `${optionAPercentage}% chose this`;
    document.getElementById(
      "optionB-votes"
    ).textContent = `${optionBPercentage}% chose this`;
  } catch (error) {
    console.error("Error updating stats", error);
  }
}

// Chargement de la question suivante
function loadNextQuestion() {
  currentQuestion = (currentQuestion + 1) % questions.length;
  document.getElementById("optionA").querySelector("p").textContent =
    questions[currentQuestion].optionA;
  document.getElementById("optionB").querySelector("p").textContent =
    questions[currentQuestion].optionB;

  if (currentQuestion === questions.length - 1) {
    document.getElementById("nextQuestion").textContent = "End of Voting";
    document
      .getElementById("nextQuestion")
      .removeEventListener("click", loadNextQuestion);
  } else {
    document.getElementById("nextQuestion").textContent = "Next Question";
    document
      .getElementById("nextQuestion")
      .addEventListener("click", loadNextQuestion);
  }

  if (currentQuestion > 0) {
    document.getElementById("previousQuestion").style.display = "inline-block";
  } else {
    document.getElementById("previousQuestion").style.display = "none";
  }

  updateStats();
}

// Chargement de la question précédente
function loadPreviousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion = (currentQuestion - 1) % questions.length;
    document.getElementById("optionA").querySelector("p").textContent =
      questions[currentQuestion].optionA;
    document.getElementById("optionB").querySelector("p").textContent =
      questions[currentQuestion].optionB;

    if (currentQuestion < questions.length - 1) {
      document.getElementById("nextQuestion").textContent = "Next Question";
      document
        .getElementById("nextQuestion")
        .addEventListener("click", loadNextQuestion);
    }

    if (currentQuestion === 0) {
      document.getElementById("previousQuestion").style.display = "none";
    }

    updateStats();
  }
}

// Affichage de la pop-up de chargement
function showLoadingPopup() {
  document.getElementById("loadingPopup").classList.add("show");
}

// Masquage de la pop-up de chargement
function hideLoadingPopup() {
  document.getElementById("loadingPopup").classList.remove("show");
}

document.getElementById("optionA").addEventListener("click", () => vote(0));
document.getElementById("optionB").addEventListener("click", () => vote(1));
document
  .getElementById("nextQuestion")
  .addEventListener("click", loadNextQuestion);
document
  .getElementById("previousQuestion")
  .addEventListener("click", loadPreviousQuestion);

window.addEventListener("load", init);
