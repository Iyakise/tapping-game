let obj = JSON.parse(localStorage.getItem('OurTap')) ?? [];

// console.log(obj) coleace
// main.js
let tapImage = document.querySelector('.clickable');
let clickableContainer = document.querySelector('.clickable');
let balance = document.querySelector('.balance');
let gameLevel = document.querySelector('.level');
let sliderVal = document.querySelector('.currentTapping');
let sliderMax = document.querySelector('.sliderMax');
let sliderRange = document.querySelector('.range');

// highlight active tags
let activeTags = document.querySelectorAll('.tapTools');
activeTags.forEach(tag => { 
    tag.addEventListener('click', function() {
        activeTags.forEach(t => t.classList.remove('active-tap'));
        this.classList.add('active-tap');
        
        let secArea = document.querySelector('.middelSection');

        if(this.getAttribute('tp') === 'Tap') {
            // If 'Tap' is clicked, remove the generated content
            document.querySelector('#generatedContent')?.remove();
            return;
        }

        if(this.getAttribute('tp') === 'Boost') {
            // If 'Tap2' is clicked, remove the generated content  
            updateSectionContent(this.getAttribute('tp'), 
            secArea, 
            `
            <div class="boostContent">
                <h4>Boost Your Taps</h4>
                <div class="boostOptions">
                    <div class="boostOption">
                        <span class="boostIcon">
                            <i class="fas fa-fire fa-2x"></i>
                        </span>
                        <div class="boostDetails">
                            <h5>Tap Speed</h5>
                            <span class="Gru">3/3</span>
                        </div>
                    </div>

                    <div class="boostOption">
                        <span class="boostIcon">
                            <i class="fas fa-bolt fa-2x"></i>
                        </span>
                        <div class="boostDetails">
                            <h5>Full Tank</h5>
                            <span class="Gru">3/3</span>
                        </div>
                    </div>

                </div>
                <h4>Boosters <i class="fas fa-tachometer-alt"></i>:</h4>

                <div class="boosters">
                    <div class="booster">
                        <span class="boosterIcon">
                            <i class="fas fa-hands fa-2x"></i>
                        </span>
                        <div class="boosterDetails">
                            <h5>Multi-tap</h5>
                            <div class="to-column">
                                <span class="boosterCount">
                                    <i class="fas fa-coins"></i>
                                </span>
                        
                                <span class="boosterCount">500</span>
                                 &ndash;
                                <span class="Level">3 Level</span>
                            </div>
                        </div>

                        <span class="boosterPrice boosterIcon">
                            <i class="fas fa-angle-right"></i>
                        </span>
                    </div>
                </div>

                <div class="boosters">
                    <div class="booster">
                        <span class="boosterIcon">
                            <i class="fas fa-battery-half fa-2x"></i>
                        </span>
                        <div class="boosterDetails">
                            <h5>Multi-tap</h5>
                            <div class="to-column">
                                <span class="boosterCount">
                                    <i class="fas fa-coins"></i>
                                </span>
                        
                                <span class="boosterCount">500</span>
                                 &ndash;
                                <span class="Level">3 Level</span>
                            </div>
                        </div>

                        <span class="boosterPrice boosterIcon">
                            <i class="fas fa-angle-right"></i>
                        </span>
                    </div>
                </div>

                <div class="boosters">
                    <div class="booster">
                        <span class="boosterIcon">
                            <i class="fas fa-bolt fa-2x"></i>
                        </span>
                        <div class="boosterDetails">
                            <h5>Multi-tap</h5>
                            <div class="to-column">
                                <span class="boosterCount">
                                    <i class="fas fa-coins"></i>
                                </span>
                        
                                <span class="boosterCount">500</span>
                                 &ndash;
                                <span class="Level">3 Level</span>
                            </div>
                        </div>

                        <span class="boosterPrice boosterIcon">
                            <i class="fas fa-angle-right"></i>
                        </span>
                    </div>
                </div>

            </div>
            `);

        }
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
            spanGenerate.textContent = obj.currentTap; //show tap numbers
        let cx = clickableContainer.getBoundingClientRect();
        // const rect = container.getBoundingClientRect();
        const x = event.clientX - cx.left;
        const y = event.clientY - cx.top;

        //check if slider value is zero
        if(obj.slider <= 0){
            
            refill(1000);
            return;
        }


        //update current balance in storage
        obj.balance += obj.currentTap;
        balance.innerHTML = obj.balance;
     //   console.log(typeof obj.balance);

        let reduceVal = obj.slider -= 5;
        obj.sliderVal = reduceVal;
         sliderVal.innerHTML = reduceVal;
            // console.log('x:', x, 'y:', y);
        //settimout to remove the span after 2 seconds
        setTimeout(() => {
            spanGenerate.remove();
        }, 990);
        spanGenerate.style.left = `${x}px`;
        spanGenerate.style.top = `${y}px`;
        clickableContainer.appendChild(spanGenerate);

        let currentSLiderPosition = obj.progress - 1;
        obj.progress = currentSLiderPosition;
        sliderRange.style.width = currentSLiderPosition + '%';
        // You can add more functionality here, like changing the image or triggering an animation.
        
        //update balance
        localStorage.setItem('OurTap', JSON.stringify(obj));
    })
}

// console.log(obj)
// console.log(1000 / 100)
function refill(speed = 1000){

let timing = setInterval(() => {
    if(obj.slider >= obj.sliderMax){
        clearInterval(timing);
    }

    let f500Incr = obj.slider += 5;
    let currSlide = obj.progress += 1;


    obj.progress = currSlide;
    obj.slider = f500Incr;

    sliderRange.style.width = `${currSlide}%`;
    sliderVal.innerHTML = `${f500Incr}`;
    localStorage.setItem('OurTap', JSON.stringify(obj));


}, speed)
    

}

//use dom content loaded event to initialize tap
document.addEventListener('DOMContentLoaded', function() {
    InitializeTap();


        //update balance
        balance.innerHTML = obj.balance;
        gameLevel.innerHTML = obj.LevelAvailable[obj.level];

        sliderVal.innerHTML = obj.slider;
        sliderMax.innerHTML = `/${obj.sliderMax}`;
        sliderRange.style.setProperty('width', `${obj.progress}%`);

})