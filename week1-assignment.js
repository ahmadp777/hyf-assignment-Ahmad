// Assignment#1 - Doubling odd numbers

let numbers= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const oddNumbers= numbers.filter(num => num % 2 !==0);
const newNumbers= oddNumbers.map(num => num * 2);
console.log(newNumbers);

// Assignment#2 - Codewars =======================================================================
//  Square root or square the number

const squareRootOrSquare = (array => {
    return array.map(number => {const root = Math.sqrt(number); return root % 1 === 0 ? root : (number * number)});
});

//  Remove every second element from the array

const removeEverySecondElement = (array => {
    return array.filter((_, index) => index % 2 === 0);
});



// Assignment#3 - Working with movies =============================================================

import { movies } from "./movies.js";

// 1: Short title movies (title length < 6 characters)
const shortTitleMovies = movies.filter(movie => movie.title.length < 6);

// 2: Long title movies (title length >= 30 characters)
const longTitleMovies = movies.filter(movie => movie.title.length >= 30);

// 3: Count movies made 1980-1989
const count1980s = movies.filter(movie => movie.year >= 1980 && movie.year <= 1989).length;

// 4: Add tag based on rating
const moviesWithTag = movies.map(movie => {
    let tag;
    if (movie.rating >= 7) tag = "Good";
    else if (movie.rating >= 4) tag = "Average";
    else tag = "Bad";
    return { ...movie, tag };
});

// 5: Chaining - filter movies rated > 6, then map to only ratings
const moviesWithRatingsOver6 = movies.filter(movie => movie.rating > 6).map(movie => movie.rating);

// 6: Count movies containing Surfer, Alien, or Benjamin (case insensitive)
const keywords = ["surfer", "alien", "benjamin"];

const keywordCount = movies.reduce((count, movie) => {
const title = movie.title.toLowerCase();
return count + keywords.filter(keyword => title.includes(keyword)).length;
}, 0);

// 7: Movies with duplicated words in title
const moviesWithDuplicateWords = movies.filter(movie => {
    const titleWords = movie.title.toLowerCase().replace(/[.,]/g, "").split(" ");
    
    const seen = new Set();
    for (let word of titleWords) {
        if (seen.has(word)) return true;
        seen.add(word);
    }
    return false;
});

// Display results in HTML
document.addEventListener("DOMContentLoaded", function() {
    // Short titles
    document.getElementById("shortTitles").innerHTML = shortTitleMovies.map(movie => movie.title).join(", ");
    
    // Long titles
    document.getElementById("longTitles").innerHTML = longTitleMovies.map(movie => movie.title).join(", ");
    
    // 1980s count
    document.getElementById("count1980s").textContent = count1980s;
    
    // Tagged movies (all)
    document.getElementById("taggedMovies").innerHTML = moviesWithTag.map(movie => 
        `<div>${movie.title} : ${movie.tag}</div>`
        ).join("");
    
    // Ratings over 6
    document.getElementById("ratingsOver6").textContent = moviesWithRatingsOver6.join(", ");
    
    // Count movies containing Surfer, Alien, or Benjamin
    document.getElementById("keywordCount").textContent = keywordCount;
    
    // Duplicate words
    document.getElementById("duplicateWords").innerHTML = moviesWithDuplicateWords.map(movie => movie.title).join(", ");



    // Toggle collapsible sections
    document.querySelectorAll(".toggle-arrow").forEach(arrow => {
        arrow.addEventListener("click", function() {
            const section = this.parentElement;
            section.classList.toggle("collapsed");
            section.classList.toggle("expanded");
        });
    });
});

