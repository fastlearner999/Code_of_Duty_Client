// ThiS JS FILE IS DESIGNED FOR:
// - edit_workout.html

const API_URL_BASE = 'https://energize-code-of-duty.herokuapp.com';
const curPage = window.location.pathname;
if (curPage.includes('edit_workout.html')) {

    const deleteWorkoutButton = document.querySelector('#deleteWorkoutButton');
    deleteWorkoutButton.addEventListener('click', ()=>{
        let confirmToDelete = confirm("Are you sure to delete?");
        if (confirmToDelete) {
            //TODO
            alert('Workout deleted');
            window.location.replace(`./workouts.html`);
        } 
    });
    
    const saveWorkoutButton = document.querySelector('#saveWorkoutButton');
    saveWorkoutButton.addEventListener('click', ()=>{
        //TODO
        alert('Saved');
        window.location.replace(`./workouts.html`);
    });
}