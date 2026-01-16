// assignment2: Hogwarts House generator
//UI styling
const div= document.getElementById("container");
div.style.textAlign= "center";
div.style.margin= "50px auto";
div.style.fontFamily= "Arial, sans-serif";
div.style.width= "500px";
div.style.height= "300px";
div.style.border= "2px solid #000";
div.style.padding= "20px";  
div.style.borderRadius= "10px";

const button = document.querySelector("button");
button.style.display= "block";
button.style.margin= "30px auto";

const HogwartsHouses= ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
function getHouse() {
    let result= document.getElementById("demo");
    const name= document.getElementById("name-enter").value;
    if (name === "") {
        result.innerHTML= "Please enter your name";
        return;
    }
    let randomIndex= Math.floor(Math.random() * HogwartsHouses.length);    
    const house= HogwartsHouses[randomIndex];
    result.innerHTML= `${name} belongs in ${house}`;
}