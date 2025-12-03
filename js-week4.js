//======================Codewar==================
//==============Vowel Count=========

console.log("vowel count : ");

function vowelCount(str) {
    let vowelsArray="aeiou";
    let count=0;
    const charactersString= str.split("");
    for (let character of charactersString) {
        for (let i=0; i<5; i++) {
            if (character === vowelsArray[i]) count++;
        }
    }
    return count;
}
let sentence= "input string will only consist of commandLowerCase case letters and/or spaces";
console.log(vowelCount(sentence));

//===========Square every digit========
console.log("\n Square every digit : ");

function squareEveryDigit(num) {
    let resultArray=[];
    let numberString= num.toString();
    for (let number of numberString) 
        resultArray.push(Number(number) * Number(number));
    resultString= resultArray.join("");
    result= Number(resultString);
    console.log(result);
}
squareEveryDigit(743);

//===========Highest and Lowest========
console.log("\n Highest and Lowest :");

function highestAndLowest(numbersString) {
    let numbersArray=[];
    for (let number of numbersString.split(" ")) 
        numbersArray.push(Number(number));

    let max= numbersArray[0];
    let min= numbersArray[0];
    for (let i=1; i<numbersArray.length; i++) {
        if (numbersArray[i]> max) {
          max= numbersArray[i];  
        }
        if (numbersArray[i]< min) {
            min= numbersArray[i];
        }
    }
    return ("output : " + max + ", " + min);
}
console.log(highestAndLowest("5 2 7 6 4"));

//===================== Voice Assistant ===================

console.log("\n Voice assistant : ");


let userName = "";
let toDoList = [];


function getReply(command) {
  const commandLowerCase = command.toLowerCase();

  if (commandLowerCase.startsWith("hello my name is")) {
     userName = command.substring(17).trim();  ///??
    return `Nice to meet you ${userName}`;
  }

  if (commandLowerCase.includes("what is my name")) {
    if (!userName) return "I don't know your name yet.";
    return `Your name is ${userName}`;
  }


    if (commandLowerCase.startsWith("add ")) {
    const item = commandLowerCase.replace("add ", "").replace(" to my todo", "");
    toDoList.push(item);
    return `${item} added to your todo`;
  }

  if (commandLowerCase.startsWith("remove ")) {
    const item = commandLowerCase.replace("remove ", "").replace(" from my todo", "");
    const index = toDoList.indexOf(item);
    if (index === -1) return `${item} is not in your todo`;
    toDoList.splice(index, 1);
    return `Removed ${item} from your todo`;
  }


  if (commandLowerCase.includes("what is on my todo")) {
    if (toDoList.length === 0) return "You have no toDoList.";
    return `You have ${toDoList.length} todos - ${toDoList.join(" and ")}`;
  }

  // Date inquiry
  if (commandLowerCase.includes("what day is it today")) {
    const today = new Date();
    const day = today.getDate();
    const monthName = today.toLocaleString("en-US", { month: "long" });
    const year = today.getFullYear();
    return `${today.toLocaleDateString()} (${day}. of ${monthName} ${year})`;
  }


    // Simple Math operation
  if (commandLowerCase.startsWith("what is ")) {
    let questionArray=commandLowerCase.split(" ");
    let num1= Number(questionArray[2]);
    let num2= Number(questionArray[4]);
    let operator= questionArray[3];

    switch (operator) {
        case "+" : 
            return num1 + num2;        
        case "-" : 
            return num1 - num2;       
        case "*" : 
            return num1 * num2;       
        case "/" : if (num2 == 0) 
            return "number can not be devided by zero";
            return num1 / num2;        
        default : 
            return "Please enter a valid operator";
    }
  }


  // Timer
  if (commandLowerCase.startsWith("set a timer for")) {
    const number = Number(command.match(/\d+/));
    const milliseconds = number * 60 * 1000;
    setTimeout(() => console.log("Timer done!"), milliseconds);
    return `Timer set for ${number} minutes`;
  }

  return "I don't understand your command.";
}

console.log(getReply("Hello my name is Ahmad")); 
console.log(getReply("What is my name?")); 
console.log(getReply("Add fishing to my todo"));
console.log(getReply("Add singing in the shower to my todo"));
console.log(getReply("What is on my todo?"));
console.log(getReply("Remove fishing from my todo")); 
console.log(getReply("What is on my todo?")); 
console.log(getReply("What day is it today?")); 
console.log(getReply("What is 4 * 12")); 

//===================== js week4 exercises ===================
console.log("\n Fibonacci sequence : ");
function fib(number) {
  let fibboSequenceNthNumber;
    if (number <= 1) fibboSequenceNthNumber = number;
    if (number == 2) fibboSequenceNthNumber = 1;
    
    let a = 0;
    let b = 1;
    let sum;
    for (let i = 2; i < number; i++) {
        sum = a + b;
        a = b;
        b = sum;
    }
    fibboSequenceNthNumber = sum;
    console.log(fibboSequenceNthNumber);
}
// as the exercise said fib function logs nth number in fibonacci sequence
fib(5); // 3
fib(10); // 34


//////////
console.log("\n FizzBuzz : ");
function fizzBuzz(a,b) {
    for (let i=a; i<=b; i++) {
        console.log(i%15==0 ? "fizzBuzz" : i%3==0 ? "Fizz" : i%5==0 ? "Buzz" : i);
    }
}
fizzBuzz(4,17);

/////////////
console.log("\n Sentiment Analysis : ");
function getSentimentScore(text) {
    const positiveWordsList = ['happy', 'good', 'fantastic', 'great', 'excellent', 'love', 'like', 'awesome', 'nice', 'amazing'];
    const negativeWordsList = ['sad', 'bad', 'terrible', 'awful', 'hate', 'dislike', 'horrible', 'worst', 'angry', 'upset'];
    let score = 0;
    let positiveWordsUsed = [];
    let negativeWordsUsed = [];

    const words = text.toLowerCase().split(" ");  
    for (let word of words) {
        if (positiveWordsList.includes(word)) {
            score++;
            positiveWordsUsed.push(word);
        } else if (negativeWordsList.includes(word)) {
            score--;
            negativeWordsUsed.push(word);
        }
    }
    console.log(`Score: ${score}`);
    console.log(`Positive words: ${positiveWordsUsed}`);
    console.log(`Negative words: ${negativeWordsUsed}`);
}   

getSentimentScore("I am mega super awesome happy");

///////////
console.log("\n Credit Card Number Formatter : ");
function formatCreditCardNumber(number) {
    if (isNaN(number)) return "Please enter a valid card number";
        else {
            let original= number.toString();
    let result=[];
    let digits= original.split("");
    for (i=0; i<digits.length; i++) {
        if (i%4 !==0) result.push(digits[i]);
        else result.push(` ${digits[i]}`);
     }
     let formatted = result.join("");
     return ("Original: "+ original + "\n" + "Formatted: " + formatted);
    }
}
console.log(formatCreditCardNumber(6037697472638349));

//////////
console.log("\n Character Frequency Counter : ");
function getCharacterFrequencies(word) {
    let result=[];
    for (let i=0; i<word.length; i++) {
    let found= false;
    for (let j=0; j<result.length; j++) {        
        if (result[j].character === word[i]) {
            result[j].count++;
            found= true;
            break;
        }
    } 
    if (!found)  result.push({character:word[i], count: 1});
}
return result;
}
console.log(getCharacterFrequencies("bananabread"));

///////// card type 
console.log("\n getCardInfo : ");
function getCardInfo(cardNumber) {
  const cardDigits= cardNumber.replace(/\D/g, '');
  let firstTwoDigits= Number(cardDigits.substring(0, 2));
  let firstFourDigits= Number(cardDigits.substring(0, 4));
  if (cardDigits.startsWith("4")) 
    return "Visa Card";
  if ((firstTwoDigits>=51 && firstTwoDigits <= 55) || (firstFourDigits >= 2221 && firstFourDigits<= 2720))
    return "MasterCard";
  if (firstTwoDigits == 34 || firstTwoDigits == 37) 
    return "American Express";
  if ((firstFourDigits>=6221 && firstFourDigits<=6229) || firstTwoDigits == 64 || firstTwoDigits == 65 || firstFourDigits == 6011)
    return "discover";
  return "Unknown card type";
}


////////// Tic Tac Toe
console.log("\n Tic Tac Toe : ");

let position= [
    ["X", "O", "O"],
    ["O", "X", "X"],
    ["X", "O", "O"],
];

function getRenderedGame(position) {
    console.log(position[0] + "\n" + position[1] + "\n" + position[2]);
}
getRenderedGame(position);

const playerMark=["X","O"];
function isWinner(playerMark) {
    for (let row=0; row<3; row++) {
        if (position[row][0]== playerMark &&
            position[row][1]== playerMark &&
            position[row][2]== playerMark
        ) 
        return true;
    }
    for (let column=0; column<3; column++) {
        if (position[0][column]== playerMark &&
            position[1][column]== playerMark &&
            position[2][column]== playerMark 
        )
        return true;
    }
    if (
      position[0][0] === playerMark &&
      position[1][1] === playerMark &&
      position[2][2] === playerMark
    ) return true;

    if (
      position[0][2] === playerMark &&
      position[1][1] === playerMark &&
      position[2][0] === playerMark
    ) return true;

    return false;
}


function getGameInfo(position) {
    const gameInformation= {winner: undefined, loser: undefined, hasEnded: false} ;
    for (let player of playerMark) {
        if (isWinner(player)) {
            gameInformation.winner= player;
            gameInformation.loser= player==="X" ? "O" : "X";
            gameInformation.hasEnded= true;            
        }   
      }
    if (!position.flat().includes("-")) gameInformation.hasEnded= true;
        
      return gameInformation; 
}
console.log(getGameInfo(position));


