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
                const div = document.createElement('div')
                const title = document.createElement('h4')
                title.textContent = workout.sport_type + ' / ' + workout.start_time + ' / ' + workout.end_time + ' / ' + workout.break_duration + ' / ' + workout.total_distance + workout.total_distance_unit;
                
                // styling created elements
                div.classList = 'goal-div'
                title.classList = 'goal-title'
                
                div.appendChild(title);
                
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

            const sportType = document.querySelector('#sportType');
            sportType.textContent = "Sport Type: " + data.sport_type;

            const startTime = document.querySelector('#startTime');
            startTime.textContent = "Start Time: " + data.start_time;

            const endTime = document.querySelector('#endTime');
            endTime.textContent = "End Time: " + data.end_time;

            const breakDuration = document.querySelector('#breakDuration');
            breakDuration.textContent = "Break: " + data.break_duration + " mins";

            const workoutDetails = document.querySelector('#workoutDetails');
            workoutDetails.textContent = "Worked: " + data.total_distance + data.total_distance_unit;

            const createDate = document.querySelector('#createDate');
            createDate.textContent = "Crated Date: " + data.create_date;

            const updateDate = document.querySelector('#updateDate');
            updateDate.textContent = "Updated Date: " + replaceNull(data.update_date);

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