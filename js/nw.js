let OurTap = {
    balance: 2000,
    level: 0,
    LevelAvailable: ['Beginner', 'Intermediate', 'Advance', 'Professional', 'Master', 'Elite'],
    NextLevelPoint: 50000,
    booster: [],
    currentTap: 1,
    slider: 500,
    sliderMax: 500,
    progress: 100

};

if(!localStorage.getItem('OurTap')) {
    localStorage.setItem('OurTap', JSON.stringify(OurTap));
}