// codewars - Product of Array Except Self

function productArray(numbers)
{
  let multipled = numbers.reduce((x, y) => x * y);
  return numbers.map(num => multipled / num);
}

// ===================================== 2. Functions! ====================================

// Called after 2.5 seconds

setTimeout(
    () => {
    document.getElementById("delayDisplay").textContent = "Called after 2.5 seconds";
    }, 2500
);


// Display stringToLog after delay seconds

function displayAfterDelay(delay, stringToLog) {
    setTimeout( () => {
        document.getElementById("delayCallText").textContent= stringToLog;
 }, delay*1000);
}

// Create button to call function

delayButton= document.getElementById("delayCallButton");
delayButton.addEventListener("click", () => displayAfterDelay(5, "Called after 5 seconds"));

// planet log function

function earthLogger() {
    console.log("Earth");
}

function saturnLogger() {
    console.log("Saturn");
}

function planetLogFunction(planetLogger) {
    return planetLogger();
}

planetLogFunction(earthLogger);
planetLogFunction(saturnLogger);


//Log user location

locationButton = document.getElementById("logLocationButton");
locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude= position.coords.latitude;
                const longitude= position.coords.longitude;

                document.getElementById("userLocation").innerHTML= `Latitude: ${latitude}, Longitude: ${longitude}`;
            }, 
            (error) => {
                console.error("Error getting location: ", error);
                
                let errorMessage;
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "User denied the request for Geolocation.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable (no GPS/location service).";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "The request to get user location timed out.";
                        break;
                    default:
                        errorMessage = "An unknown error occurred.";
                        break;
                }

                document.getElementById("userLocation").innerHTML= "Error getting location: " + errorMessage;
            }
        );
    } else {
        document.getElementById("userLocation").innerHTML="Geolocation is not supported by this browser.";
    }
});


// Run callback function after delay seconds

const callbackButton = document.getElementById("callbackButton");
const delayInput = document.getElementById("delayInput");

callbackButton.addEventListener("click", () => {
    const inputValue = delayInput.value.trim();
    if (inputValue === "") {
        document.getElementById("callbackOutput").textContent = "Please enter a delay value";
        return;
    }
    const delay = Number(inputValue);
    if (!isNaN(delay) && delay >= 0) {
        setTimeout( helloWorld , delay * 1000);
    } else {
        document.getElementById("callbackOutput").textContent = "Invalid delay value";
    }
}); 

function helloWorld() {
   document.getElementById("callbackOutput").textContent = "Hello World!!!"; 
}

// check double click
let dblClickTxt="";
document.addEventListener("dblclick", () => {    
    dblClickTxt += "Double Clicked! ";
    document.getElementById("doubleClick").textContent = dblClickTxt;
});

// Joke Creator

function jokeCreator(shouldTellFunnyJoke, logFunnyJoke, logBadJoke) {
    if (shouldTellFunnyJoke) {
        logFunnyJoke();
    } else {
        logBadJoke();
    }
}

function logFunnyJoke() {
    document.getElementById("jokeDisplay").textContent = "This is a funny joke. You should laugh! 😂";
}

function logBadJoke() {
    document.getElementById("jokeDisplay").textContent = "This is not a funny joke. But you have to laugh! 🤣";
}

jokeCreator(true, logFunnyJoke, logBadJoke);  // displays funny joke


//=============================== 3. Function as a variable ===============================

// 3 functions array
const doneLogger = () => console.log("All functions have been called!");
const funcArray = [earthLogger, saturnLogger, doneLogger];

funcArray.forEach(func => func());

// Expression function and declaration function

const expressionFunc = () => {
    console.log("This is an expression function");
};
function declarationFunc() {
    console.log("This is a declaration function");
}

expressionFunc();
declarationFunc();

// Function object

const funcObject= {item: logFuncObject};
funcObject.item();

function logFuncObject() {
    console.log("Function inside object called successfully!");
}

