// generate a random RGB color
function randomRGBColor() {
    const r = Math.floor(255 * Math.random());
    const g = Math.floor(255 * Math.random());
    const b = Math.floor(255 * Math.random());
    return `rgb(${r}, ${g}, ${b})`;
}

function changeBackgroundColor() {
    const container = document.querySelector('.container');
    if (!container) return;            
            
    container.style.transition = 'background-color 1s ease';
    container.style.backgroundColor = randomRGBColor();
}

// Attach event listener when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('bg-color-btn');
    if (btn) {
        btn.addEventListener('click', changeBackgroundColor);
    }
});