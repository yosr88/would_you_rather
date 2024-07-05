const contractAddress = '0x7629Bc9a43Ca35C2022F1D81B519288cc755B040'; 
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "option",
        "type": "uint8"
      }
    ],
    "name": "getVotes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "hasVoted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "option",
        "type": "uint8"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "votes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]; 

let web3;
let contract;
let accounts;

const questions = [
  {
    optionA: "Beyonce has won the Grammy Awards 2024?",
    optionB: "Keep Taylor Swift as the winner?"
  },
  {
    optionA: "See Amy Schumer resign as a comedian?",
    optionB: "See Chris Rock get slapped again by Will Smith?"
  },
  {
    optionA: "See Zendaya come again for the Next Spiderman?",
    optionB: "Yes",
    optionC: "No"
  },
  {
    optionA: "Invest your money in a bank?",
    optionB: "Buy cryptocurrencies?"
  },
  {
    optionA: "Watch Trump or Biden interview?",
    optionB: "Watch Star Wars 9?"
  }
];

let currentQuestion = 0;

async function init() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('MetaMask connected', accounts);
      contract = new web3.eth.Contract(contractABI, contractAddress);
      console.log('Contract initialized', contract);
      updateStats();
    } catch (error) {
      console.error('User denied account access', error);
    }
  } else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
}

async function vote(option) {
  try {
    console.log('Voting for option:', option);
    await contract.methods.vote(option).send({ from: accounts[0] });
    console.log('Vote successful');
    updateStats();
  } catch (error) {
    console.error('Error voting', error);
  }
}

async function updateStats() {
  try {
    const optionAVotes = await contract.methods.getVotes(0).call();
    const optionBVotes = await contract.methods.getVotes(1).call();
    
    const optionAVotesNumber = Number(optionAVotes);
    const optionBVotesNumber = Number(optionBVotes);
    const totalVotes = optionAVotesNumber + optionBVotesNumber;

    const optionAPercentage = (totalVotes === 0) ? 0 : (optionAVotesNumber / totalVotes * 100).toFixed(2);
    const optionBPercentage = (totalVotes === 0) ? 0 : (optionBVotesNumber / totalVotes * 100).toFixed(2);

    console.log('Option A votes:', optionAVotesNumber, 'Option B votes:', optionBVotesNumber, 'Total votes:', totalVotes);

    document.getElementById('optionA-votes').textContent = `${optionAPercentage}% chose this`;
    document.getElementById('optionB-votes').textContent = `${optionBPercentage}% chose this`;
  } catch (error) {
    console.error('Error updating stats', error);
  }
}

function loadNextQuestion() {
  currentQuestion = (currentQuestion + 1) % questions.length;
  document.getElementById('optionA').querySelector('p').textContent = questions[currentQuestion].optionA;
  document.getElementById('optionB').querySelector('p').textContent = questions[currentQuestion].optionB;

  if (currentQuestion === questions.length - 1) {
    document.getElementById('nextQuestion').textContent = "End of Voting";
    document.getElementById('nextQuestion').removeEventListener('click', loadNextQuestion);
  } else {
    document.getElementById('nextQuestion').textContent = "Next Question";
    document.getElementById('nextQuestion').addEventListener('click', loadNextQuestion);
  }

  if (currentQuestion > 0) {
    document.getElementById('previousQuestion').style.display = 'inline-block';
  } else {
    document.getElementById('previousQuestion').style.display = 'none';
  }

  updateStats();
}

function loadPreviousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion = (currentQuestion - 1) % questions.length;
    document.getElementById('optionA').querySelector('p').textContent = questions[currentQuestion].optionA;
    document.getElementById('optionB').querySelector('p').textContent = questions[currentQuestion].optionB;

    if (currentQuestion < questions.length - 1) {
      document.getElementById('nextQuestion').textContent = "Next Question";
      document.getElementById('nextQuestion').addEventListener('click', loadNextQuestion);
    }

    if (currentQuestion === 0) {
      document.getElementById('previousQuestion').style.display = 'none';
    }

    updateStats();
  }
}

document.getElementById('optionA').addEventListener('click', () => vote(0));
document.getElementById('optionB').addEventListener('click', () => vote(1));
document.getElementById('nextQuestion').addEventListener('click', loadNextQuestion);
document.getElementById('previousQuestion').addEventListener('click', loadPreviousQuestion);

window.addEventListener('load', init);
