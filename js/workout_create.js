// ThiS JS FILE IS DESIGNED FOR:
// - workout_create.html

const API_URL_BASE = 'https://energize-code-of-duty.herokuapp.com';
const curPage = window.location.pathname;
if (curPage.includes('workout_create.html')) {
    const saveWorkoutButton = document.querySelector('#saveWorkoutButton');
    saveWorkoutButton.addEventListener('click', ()=>saveWorkout());
}

async function saveWorkout() {
    let newWorkout = {
        user_id: parseInt(localStorage.getItem("uid")),
        sport_type: document.querySelector("#sportType").value,
        start_time: document.querySelector("#startTime").value,
        end_time: document.querySelector("#endTime").value,
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
            'Content-Type': 'application/json'
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