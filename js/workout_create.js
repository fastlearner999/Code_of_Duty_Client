// ThiS JS FILE IS DESIGNED FOR:
// - create_workout.html

const API_URL_BASE = 'https://energize-code-of-duty.herokuapp.com';
const curPage = window.location.pathname;
if (curPage.includes('create_workout.html')) {
    
    const saveWorkoutButton = document.querySelector('#saveWorkoutButton');
    saveWorkoutButton.addEventListener('click', ()=>{
        //TODO
        alert('Saved');
        window.location.replace(`./workouts.html`);
    });
}