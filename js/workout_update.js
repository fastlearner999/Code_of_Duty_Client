// ThiS JS FILE IS DESIGNED FOR:
// - edit_workout.html

const API_URL_BASE = 'https://energize-code-of-duty.herokuapp.com';
const curPage = window.location.pathname;
if (curPage.includes('edit_workout.html')) {
    const deleteWorkoutButton = document.querySelector('#deleteWorkoutButton');
    deleteWorkoutButton.addEventListener('click', ()=>{
        //TODO
        alert('Workout deleted');
        window.location.replace(`./workouts.html`);
    });
    
}