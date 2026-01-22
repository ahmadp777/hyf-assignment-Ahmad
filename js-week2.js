// Assignment 1 
console.log("Assignment1: : flight booking function");


function getFullName(firstName, surName) {
    let fullName= firstName +" "+ surName;
    return fullName;
}

const fullName1= getFullName("John","Larsen");
const fullName2= getFullName("Joe","Hansen");
console.log(fullName1);
console.log(fullName2);
console.log("\n");

//Assignment 2  
console.log("Assignment2: Formal fullname function");
//determine gender here
let gender="male";
function getFullname(firstName, surName, useFormalName) {
    let fullName="";
    if (!useFormalName) {
        fullName= firstName +" "+ surName;        
    }
    else {
        if (gender==="male") {
           fullName= "Lord" + " " + firstName + " " + surName;}
        else {
           fullName= "Lady" + " " + firstName + " " + surName;}         
        }   
        return fullName;
    }

    console.log("Passenger name: "+getFullname("John","Larsen", true));
    console.log("\n");

    //Assignment 3
    console.log("Assignment3: Event application");

    const today= new Date();
    function getWeekDay(date) {
        const weekDays= [
            "Sunday", 
            "Monday", 
            "Tuesday", 
            "Wednesday", 
            "Thursday", 
            "Friday", 
            "Saturday"
        ];
        return weekDays[date.getDay()];
    }
    
    function addDaysToDate(givenDate, daysPlusToDate) {
        const result= new Date(givenDate);
        result.setDate(result.getDate() + daysPlusToDate);
        return result;
    }

    function getEventWeekday(leftDays) {
        const eventDate = addDaysToDate(today, leftDays);
        return getWeekDay(eventDate);
    }

    console.log("Today is: "+ getWeekDay(today)); 
    console.log("Event will be at: " + getEventWeekday(10));
    console.log("\n");

    //Assignment 4
    console.log("Assignment4: Weather wear");

    function suitableClothes(temperature) {
        if (temperature < 5) {
            return "Wear heavy winter clothes";
        }   
        else if (temperature < 15) {
            return "Wear light winter clothes";
        }
        else if (temperature < 25) {
            return "Wear a t-shirt";
        }
        else {
            return "Wear shorts and a tank top";
        }
    }

    console.log(suitableClothes(-5));
    console.log("\n");
    

    //Assignment 5
    console.log("Assignment5: Student manager");
    
    let class07Students= ["Ahmad", "Bob", "Sam", "Henna", "Albert"];
    function addStudentToClass(studentName) {
        if (studentName ==="") {
            console.log("You cannot add an empty name string to the class");
            
        }
        else if (studentName === "Queen") {             
            if (!class07Students.includes("Queen")) {
            class07Students.push(studentName);
            console.log("Queen has been added to the class");           
            } else {
            console.log("Queen is already in the class"); 
            }
                         
        }
        
        else if (class07Students.length <6) {
           
            if (class07Students.includes(studentName))
            {console.log(`student ${studentName} is already in the class`);                    
            } else {
            class07Students.push(studentName); 
            console.log(`student ${studentName} has been added to the class`);                
            }                
        } else {
        console.log("Cannot add more students to class07.");
        }    
    }

    function getNumberOfStudents() {
        return class07Students.length;
    }
    
    addStudentToClass("");
    addStudentToClass("Ahmad");
    addStudentToClass("Helen");
    addStudentToClass("Juta");
    addStudentToClass("Queen");
    addStudentToClass("Queen");
        
    console.log(`There are ${getNumberOfStudents()} students in class07:  ${class07Students}`); 

