// ThiS JS FILE IS DESIGNED FOR:
// - workout_update.html

const API_URL_BASE = 'https://energize-code-of-duty.herokuapp.com';
const curPage = window.location.pathname;

// Check if no localstorage, kick user away
let userId = localStorage.getItem("uid");
if (userId === undefined || userId === null || userId === 0) {
	alert('Please login first');
	window.location.href = 'login.html';
}

if (curPage.includes('workout_update.html')) {
    let workoutId = getId();
    async function getWorkoutById(workoutId) {
        try{
            let url = `${API_URL_BASE}/workout/${workoutId}`;
            const res1 = await fetch(url)
            const data = await res1.json();
            document.querySelector('#id').value = data.id;
            document.querySelector('#sportType').value = data.sport_type;
            document.querySelector('#startTime').value = data.start_time.substring(0, 16);
            document.querySelector('#endTime').value = data.end_time.substring(0, 16);
            document.querySelector('#breakDuration').value = data.break_duration;
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
    deleteWorkoutButton.addEventListener('click', ()=>deleteWorkout());

    async function deleteWorkout() {
        let confirmToDelete = confirm("Are you sure to delete?");
        if (confirmToDelete) {
            let workoutId = getId();
            await fetch(`${API_URL_BASE}/workout/${workoutId}`, {		
                method: 'DELETE',
                headers: {
                    "authorization": localStorage.getItem('token')
                }
            }).then((res) => {
                console.log(res);
                alert('Deleted');
            });
            window.location.replace(`./workouts.html`);
        } 
    }
    
    const updateWorkoutForm = document.querySelector('#updateWorkoutForm');
    updateWorkoutForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        saveWorkout();
    });
}

async function saveWorkout() {
    let editWorkout = {
        id: parseInt(document.querySelector("#id").value),
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
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "authorization": localStorage.getItem('token')
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