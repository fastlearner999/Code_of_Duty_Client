// ThiS JS FILE IS DESIGNED FOR:
// - workout_create.html

const API_URL_BASE = 'https://energize-code-of-duty.herokuapp.com';
const curPage = window.location.pathname;
if (curPage.includes('workout_create.html')) {
    
    const saveWorkoutButton = document.querySelector('#saveWorkoutButton');
    saveWorkoutButton.addEventListener('click', ()=>{
        //TODO
        alert('Saved');
        window.location.replace(`./workouts.html`);
    });
}