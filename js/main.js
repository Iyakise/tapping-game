// main.js
let tapImage = document.querySelector('.clickable');
let clickableContainer = document.querySelector('.clickable');


// highlight active tags
let activeTags = document.querySelectorAll('.tapTools');
activeTags.forEach(tag => { 
    tag.addEventListener('click', function() {
        activeTags.forEach(t => t.classList.remove('active-tap'));
        this.classList.add('active-tap');
        
        let secArea = document.querySelector('.middelSection');

        updateSectionContent(this.getAttribute('tp'), secArea, `<h1>Content for ${this.textContent}</h1><p>This is dynamically generated content for the section.</p>`);
    });
});


//update section content
function updateSectionContent(tapid, sectionId, content, callback) {
    let element = document.createElement('div');
    element.id = 'generatedContent';
    element.className = 'generatedContent';
    element.innerHTML = '';
    element.innerHTML = `
        ${content}
    `;
    console.log('tapid', tapid);
    //check if tapid eqauls tap, then remove element
    if (tapid == 'Tap') {
        document.querySelector('#generatedContent')?.remove();
        return;
    }
    // Clear previous content
    
    sectionId.appendChild(element);

    if (callback && typeof callback === 'function') {
        callback();
    }
}



function InitializeTap(){
     tapImage.addEventListener('click', function(event) {
       let spanGenerate = document.createElement('span');
            spanGenerate.className = 'slideGenerate';
            spanGenerate.textContent = '2';
        let cx = clickableContainer.getBoundingClientRect();
        // const rect = container.getBoundingClientRect();
        const x = event.clientX - cx.left;
        const y = event.clientY - cx.top;

            // console.log('x:', x, 'y:', y);
        //settimout to remove the span after 2 seconds
        setTimeout(() => {
            spanGenerate.remove();
        }, 990);
        spanGenerate.style.left = `${x}px`;
        spanGenerate.style.top = `${y}px`;
        clickableContainer.appendChild(spanGenerate);
        // You can add more functionality here, like changing the image or triggering an animation.
    })
}




//use dom content loaded event to initialize tap
document.addEventListener('DOMContentLoaded', function() {
    InitializeTap();

})