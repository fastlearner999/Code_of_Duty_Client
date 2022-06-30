// ThiS JS FILE IS DESIGNED FOR:
// - workout_update.html

const API_URL_BASE = 'https://energize-code-of-duty.herokuapp.com';
const curPage = window.location.pathname;
if (curPage.includes('workout_update.html')) {
    let workoutId = getId();
    async function getWorkoutById(workoutId) {
        try{
            let url = `${API_URL_BASE}/workout/${workoutId}`;
            const res1 = await fetch(url)
            const data = await res1.json();
            document.querySelector('#id').value = data.id;
            document.querySelector('#sportType').value = data.sport_type;
            document.querySelector('#startTime').value = data.start_time;
            document.querySelector('#endTime').value = data.end_time;
            document.querySelector('#breakTime').value = data.break_time;
            document.querySelector('#totalDistance').value = data.total_distance;
            document.querySelector('#totalDistanceUnit').value = data.total_distance_unit;
            document.querySelector('#totalDuration').value = data.total_duration;
            document.querySelector('#totalDurationUnit').value = data.total_duration_unit;
            document.querySelector('#createDate').value = data.create_date;
            document.querySelector('#updateDate').value = replaceNull(data.update_date);
        } catch(err) {
            return({message: err.message})
        }
    }
    getWorkoutById(workoutId);

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
    saveWorkoutButton.addEventListener('click', ()=>saveWorkout());
}

async function saveWorkout() {
    let editWorkout = {
        id: parseInt(document.querySelector("#id").value),
        sport_type: document.querySelector("#sportType").value,
        start_time: document.querySelector("#startTime").value,
        end_time: document.querySelector("#endTime").value,
        break_duration: parseInt(document.querySelector("#breakDuration").value),
        total_distance: parseInt(document.querySelector("#totalDistance").value),
        total_distance_unit: document.querySelector("#totalDistanceUnit").value,
        target_duration: parseInt(document.querySelector("#targetDuration").value),
        target_duration_unit: document.querySelector("#targetDurationUnit").value
    };
    const res2 = await fetch(`${API_URL_BASE}/workout`, {		
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editWorkout)
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

function getId() {
    let id = 0;
    let uri = window.location.search;
    let parameters = uri.split("?");
    let tokens = parameters[1].split("&");
    tokens.forEach((curToken) => {
        let pairs = curToken.split("=");
        if (pairs[0] === 'id') {
            id = pairs[1];
        }
    });
    return id;
}

function replaceNull(val) {
    if (val === null) {
        return "";
    } 
    return val;
}