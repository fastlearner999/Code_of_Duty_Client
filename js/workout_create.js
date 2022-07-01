// ThiS JS FILE IS DESIGNED FOR:
// - workout_create.html

const API_URL_BASE = 'https://energize-code-of-duty.herokuapp.com';
const curPage = window.location.pathname;

// Check if no localstorage, kick user away
let userId = localStorage.getItem("uid");
if (userId === undefined || userId === null || userId === 0) {
	alert('Please login first');
	window.location.href = 'login.html';
}

if (curPage.includes('workout_create.html')) {
    const createWorkoutForm = document.querySelector('#createWorkoutForm');
    createWorkoutForm.addEventListener('submit', (e)=> {
        e.preventDefault();
        saveWorkout();
    });
}

async function saveWorkout() {
    let newWorkout = {
        user_id: parseInt(localStorage.getItem("uid")),
        sport_type: document.querySelector("#sportType").value,
        start_time: document.querySelector("#startTime").value.replace('T', ' ') + ':00',
        end_time: document.querySelector("#endTime").value.replace('T', ' ') + ':00',
        break_duration: parseInt(document.querySelector("#breakDuration").value),
        total_distance: parseInt(document.querySelector("#totalDistance").value),
        total_distance_unit: document.querySelector("#totalDistanceUnit").value,
        total_duration: parseInt(document.querySelector("#totalDuration").value),
        total_duration_unit: document.querySelector("#totalDurationUnit").value
    };
    const res2 = await fetch(`${API_URL_BASE}/workout`, {		
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "authorization": localStorage.getItem('token')
        },
        body: JSON.stringify(newWorkout)
    });
    const resBody2 = await res2.json();
    console.log(resBody2)
    if (resBody2 !== undefined && 'id' in resBody2) {
        alert('Saved');
    } else {

        alert('Save fail');
    }
    window.location.replace(`./workouts.html`);
}