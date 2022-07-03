// ThiS JS FILE IS DESIGNED FOR:
// - workouts.html
// - workout_view.html

const API_URL_BASE = 'https://energize-code-of-duty.herokuapp.com';
const curPage = window.location.pathname;

// Check if no localstorage, kick user away
let userId = localStorage.getItem("uid");
if (userId === undefined || userId === null || userId === 0) {
	alert('Please login first');
	window.location.href = 'login.html';
}

if (curPage.includes('workouts.html')) {
    async function getAllWorkouts() {
        try{
            let url = `${API_URL_BASE}/workout`;
            let userId = localStorage.getItem("uid");
            if (userId !== undefined && userId !== null && userId !== 0) {
                url = `${API_URL_BASE}/workout/userId/${userId}`;
            }
            const response = await fetch(url)
            const data = await response.json();
            data.forEach(workout => {
                const listTag = document.querySelector('#workout_list');
    
                // creating goals card
                const div = document.createElement('div');
                const info = document.createElement('div');
                let sportType = (workout.sport_type).charAt(0).toUpperCase() + (workout.sport_type).slice(1);
                info.innerHTML = 
                    '<h1>' + sportType + ' (' + workout.total_distance + ' ' + workout.total_distance_unit + '(s))</h1>' +
                    'Break: ' + workout.break_duration + ' min(s)<br>' +
                    'Worked: ' + workout.total_duration + ' ' + workout.total_duration_unit + '(s)<br>' +
                    'Start: ' + workout.start_time + ' End: ' + workout.end_time;
                
                // styling created elements
                div.classList = 'goal-div'
                info.classList = 'goal-title'
                
                div.appendChild(info);
                
                listTag.appendChild(div);
                
                div.addEventListener('click', ()=>{
                    window.location.replace(`./workout_view.html?id=${workout.id}`);
                })
            });
        }catch(err){
            return({message: err.message})
        }
    }
    getAllWorkouts();

    const addWorkoutButton = document.querySelector('#addWorkoutButton');
    addWorkoutButton.addEventListener('click', ()=>{
        window.location.replace(`./workout_create.html`);
    });
}

if (curPage.includes('workout_view.html')) {
    let workoutId = getId();
    async function getWorkoutById(workoutId) {
        try{
            let url = `${API_URL_BASE}/workout/${workoutId}`;
            const response = await fetch(url)
            const data = await response.json();

            const sportTypeDiv = document.querySelector('#sportType');
            let sportType = data.sport_type;
            sportTypeDiv.innerHTML = "<b>Sport Type:</b> " + sportType.charAt(0).toUpperCase() + sportType.slice(1);

            const startTimeDiv = document.querySelector('#startTime');
            startTimeDiv.innerHTML = "<b>Start Time:</b> " + data.start_time;

            const endTimeDiv = document.querySelector('#endTime');
            endTimeDiv.innerHTML = "<b>End Time:</b> " + data.end_time;

            const breakDurationDiv = document.querySelector('#breakDuration');
            breakDurationDiv.innerHTML = "<b>Break:</b> " + data.break_duration + " min(s)";

            const workoutDetailsDiv = document.querySelector('#workoutDetails');
            workoutDetailsDiv.innerHTML = "<b>Worked:</b> " + data.total_distance + ' ' + data.total_distance_unit + '(s)';

            const totalDurationDiv = document.querySelector('#totalDuration');
            totalDurationDiv.innerHTML = "<b>Duration:</b> " + data.total_duration + ' ' + data.total_duration_unit + '(s)';

            const createDateDiv = document.querySelector('#createDate');
            createDateDiv.innerHTML = "<b>Crated Date:</b> " + data.create_date;

            const updateDateDiv = document.querySelector('#updateDate');
            updateDateDiv.innerHTML = "<b>Updated Date:</b> " + replaceNull(data.update_date);

            const editWorkoutButton = document.querySelector('#editWorkoutButton');
            editWorkoutButton.addEventListener('click', ()=>{
                window.location.replace(`./workout_update.html?id=${data.id}`);
            });
        } catch(err) {
            return({message: err.message})
        }
    }
    getWorkoutById(workoutId);
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