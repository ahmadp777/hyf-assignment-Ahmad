
console.log("Javascript week2 exercise - send email to multiple recipients");

function sendEmailTo(recipient) {
    console.log("Email sent to "+recipient);
}
    const emailList= "benjamin@gmail.com|peter@gmail.com|hans@gmail.com|ahmad@gmail.com|sana@gmail.com|virgeen@gmail.com|mohammed@gmail.com";
    const recipientsList= emailList.split("|");
    console.log(recipientsList);
    for (let i=0; i<recipientsList.length; i++) {
        recipient=recipientsList[i];  
        sendEmailTo(recipient);         
    }
