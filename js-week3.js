console.log("Javascript Week 3 Assignments");
console.log("Assignment 2");
const names = [
  "Peter",
  "Ahmad",
  "Yana",
  "kristina",
  "Rasmus",
  "Samuel",
  "Katrine",
  "Tala",
];
const nameToRemove = "Ahmad";
for (let name in names) {
    if (names[name]=== nameToRemove) {
        names.splice(name,1);
        break;
    }
}
console.log(names);

console.log("\n");
console.log("Assignment 2");

const travelInformation = {
  speed: 50,
  destinationDistance: 432,
};

function giveDuration(obj) {
   let s= obj.speed;
   let d= obj.destinationDistance;
   let hour= Math.floor(d/s);
   let min= Math.floor((d%s)*60/s);
   return `${hour} hours and ${min} minutes.`;
}

const travelTime = giveDuration(travelInformation);
console.log(travelTime); // 8 hours and 38 minutes

console.log("\n");
console.log("Assignment 3");

const seriesDurations = [
  {
    title: "Game of thrones",
    days: 3,
    hours: 1,
    minutes: 0,
  },
  {
    title: "Sopranos",
    days: 3,
    hours: 14,
    minutes: 0,
  },
  {
    title: "The Wire",
    days: 2,
    hours: 12,
    minutes: 0,
  },
  {
    title: "Lost",
    days: 3,
    hours: 16,
    minutes: 30,
  },
];
function percent(a,b) {
    return (100*a/b).toFixed(3);    
}
function logOutSeriesText() {
    const myAge= 42;
  const myLifeMinutes= myAge*365*24*60;
  let sum=0;
  for (let i=0; i<seriesDurations.length; i++){
  let  sDuration= (seriesDurations[i].days *24*60)+(seriesDurations[i].hours *60 + seriesDurations[i].minutes);
  sum += sDuration;

  console.log(`"${seriesDurations[i].title}" took ${percent(sDuration,myLifeMinutes)}% of my life.`);  

  }
  console.log(`in total that is ${percent(sum,myLifeMinutes)}% of my life.`);
}

logOutSeriesText();

//////////////////////
console.log("\n");
console.log("Assignment 4");

const notes = [];

function saveNote(content, id) {
  // condition for fixing Codepen code, that adds empty notes
   if (content !== ""){
    notes.push({ content, id });
   }
}

saveNote("Pick up groceries", 1);
saveNote("Do laundry", 2);

console.log(notes);

function getNote(id) {
    if (isNaN(id)) {
        console.log("Enter a valid number !");
        return null;
    } else {    
    for (let i in notes) {
        if (notes[i].id === id){
            return notes[i].content;
        }
      
    } 
    }
    console.log("Content matched with this id not found.");
    return null;
  
}

const firstNote = getNote(1);
console.log(firstNote);

function logOutNotesFormatted() {
 for (q of notes) {
  console.log(`Note with id ${q.id} is: ${q.content}`)
 }
}
logOutNotesFormatted();

function deleteNote(id) {
    for (let i in notes) {
        if (notes[i].id === id){
            notes.splice(i,1);
            return;
        }
    }
    console.log("Note with this id not found.");
}
deleteNote(2);
console.log(notes);
///////////////////////////////
console.log("\n");
console.log("Assignment 5");

const activities= [];
function addActivity(date, activity, duration) {
  if (notReachLimit(activities)) {
activities.push({date: date, activity:activity, duration: duration});
  } else {
console.log("You have reached your limit, no more smartphoning for you!");
  }
}
function notReachLimit(activities) {
  const limit= 200;
  let totalTime=0;
  for (let act in activities) {
  totalTime += activities[act].duration;
  }
  if (totalTime<limit) {
    return true;
  }else {
    return false;
  }
}
addActivity("20th November", "Instagram", 40);
addActivity("21th November", "Youtube", 80);
addActivity("22th November", "Youtube", 100);
addActivity("23th November", "Tiktok", 30);
console.log(activities);

function showStatus(activities) {
let totalActivities= 0;
let totalTime= 0;
for (let act in activities) {
  totalActivities += 1;
  totalTime += activities[act].duration;
}
console.log(`Yoy have added ${totalActivities} activities: They amount to ${totalTime} minutes of usage`);
}
showStatus(activities);
console.log("\n");
// improved addActivities function so that automatically figures the date
let todayActivities= [];
let today= new Date();
let date= today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear();
function addActivitiesToday(activity, duration) {  
  if (notReachLimit(todayActivities)) {
todayActivities.push({date: date, activity:activity, duration: duration});
  } else {
console.log("You have reached your daily limit, no more smartphoning for you!");
  } 
}
addActivitiesToday("Instagram", 40);
addActivitiesToday("Youtube", 80);
addActivitiesToday("Youtube", 100);
addActivitiesToday("Tiktok", 30);
console.log(todayActivities);