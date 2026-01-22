// Assignment 1
console.log("Assignment 1:");
const yearOfBirth = 1983; 
const yearFuture = 2045;  
let age = yearFuture - yearOfBirth;
console.log("You will be " + age + " years old in " + yearFuture);

// Assignment 2
console.log("Assignment 2:");
const dogYearOfBirth = 2018;
const dogYearFuture = 2030;
let dogYear = dogYearFuture - dogYearOfBirth;
let shouldShowResultInDogYears = true;
// Calculating dog age according to human years, using the formula I found on net!
let dogAge= Math.round(16 * Math.log(dogYear+1) + 31);
console.log("Your dog will be " + dogYear + " human years old in " + dogYearFuture + 
            ". Or your dog will be " + dogAge + " dog years old in " + dogYearFuture + ".");
        
// Assignment 3
console.log("Assignment 3:");
const PeterHouseWidth = 8;
const PeterHouseDepth = 10;
const PeterHouseHeight = 10;
const PeterGardenSizeInM2 = 100;

const JuliaHouseWidth = 5;
const JuliaHouseDepth = 11;
const JuliaHouseHeight = 8;
const JuliaGardenSizeInM2 = 70;

let PeterHouseVolume = PeterHouseWidth * PeterHouseDepth * PeterHouseHeight;
let JuliaHouseVolume = JuliaHouseWidth * JuliaHouseDepth * JuliaHouseHeight;
let PeterHousePrice = PeterHouseVolume * 2.5 * 1000 + PeterGardenSizeInM2 * 300;
let JuliaHousePrice = JuliaHouseVolume * 2.5 * 1000 + JuliaGardenSizeInM2 * 300;

if (PeterHousePrice>2500000){
    console.log("Peter has Paid less than the real value for his house.");
} else {
    console.log("Peter has Paid more than the real value for his house.");
}    
if  (JuliaHousePrice>1000000){
    console.log("Julia has Paid less than the real value for her house.");
} else {
    console.log("Julia has Paid more than the real value for her house.");
}   

// Assignment 4
console.log("Assignment 4:");
const firstWords = ["Easy", "Awesome", "Fantastic", "Incredible", "Amazing", "Impressive", "Astonishing", "Astounding", "Fabulous", "Magnificent"];
const secondWords = ["StartUp", "Developer", "Project", "Course", "Journey", "Experience", "Knowledge", "Skill", "Future", "Opportunity"];
let randomFirstWord = firstWords[Math.floor(Math.random()*10)];
let randomSecondWord = secondWords[Math.floor(Math.random()*10)];

console.log(`StartUp name: ${randomFirstWord} ${randomSecondWord}`);