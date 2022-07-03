// ThiS JS FILE IS DESIGNED FOR:
// - goals.html
// - goal_view.html

const API_URL_BASE = 'https://energize-code-of-duty.herokuapp.com';
const curPage = window.location.pathname;

// Check if no localstorage, kick user away
let userId = localStorage.getItem("uid");
if (userId === undefined || userId === null || userId === 0) {
    alert('Please login first');
    window.location.href = 'login.html';
}

if (curPage.includes('goals.html')) {
    async function getAllGoals() {
        try{
            let listOfWorkout = await getWorkoutByUserId();

            let url = `${API_URL_BASE}/goal`;
            let userId = localStorage.getItem("uid");
            if (userId !== undefined && userId !== null && userId !== 0) {
                url = `${API_URL_BASE}/goal/userId/${userId}`;
            }
            const response = await fetch(url)
            const data = await response.json();
            data.forEach(goal => {
                let progress = getGoalProgress(goal, listOfWorkout);

                const listTag = document.querySelector('#goal_list');
    
                // creating goals card
                const div = document.createElement('div');
                const info = document.createElement('div');
                let sportType = (goal.sport_type).charAt(0).toUpperCase() + (goal.sport_type).slice(1);
                info.innerHTML = 
                    '<h1>' + goal.goal_name + ' (' + (progress*100).toFixed(2) + '%)</h1>' + 
                    sportType + ' for ' + goal.target_distance + ' ' + goal.target_distance_unit + '(s)<br>' +
                    'Within ' + goal.period + ' ' + goal.period_type + '(s)<br>' + 
                    'Start: ' + removeTime(goal.start_date) + ' End: ' + removeTime(goal.end_date);
                
                // styling created elements
                div.classList = 'goal-div'
                info.classList = 'goal-title'
                
                div.appendChild(info);
                
                listTag.appendChild(div);
                
                div.addEventListener('click', ()=>{
                    window.location.replace(`./goal_view.html?id=${goal.id}`);
                })
            });
        }catch(err){
            return({message: err.message})
        }
    }
    getAllGoals();

    const addGoalButton = document.querySelector('#addGoalButton');
    addGoalButton.addEventListener('click', ()=>{
        window.location.replace(`./goal_create.html`);
    });
}

if (curPage.includes('goal_view.html')) {
    let goalId = getId();
    async function getGoalById(goalId) {
        try{
            let listOfWorkout = await getWorkoutByUserId();

            let url = `${API_URL_BASE}/goal/${goalId}`;
            const response = await fetch(url)
            const data = await response.json();

            let progress = getGoalProgress(data, listOfWorkout);
            progress = (progress*100).toFixed(2);

            const goalNameDiv = document.querySelector('#goalName');
            let goalName = data.goal_name;
            goalNameDiv.innerHTML = "<b>Goal Name:</b> " + goalName.charAt(0).toUpperCase() + goalName.slice(1);

            const sportTypeDiv = document.querySelector('#sportType');
            let sportType = data.sport_type;
            sportTypeDiv.innerHTML = "<b>Sport Type:</b> " + sportType.charAt(0).toUpperCase() + sportType.slice(1);

            const periodDiv = document.querySelector('#period');
            periodDiv.innerHTML = "<b>Period:</b> " + data.period + ' ' + data.period_type + '(s)';

            const startDateDiv = document.querySelector('#startDate');
            startDateDiv.innerHTML = "<b>Start Date:</b> " + removeTime(data.start_date);

            const endDateDiv = document.querySelector('#endDate');
            endDateDiv.innerHTML = "<b>End Date:</b> " + removeTime(data.end_date);

            const targetDetailsDiv = document.querySelector('#targetDetails');
            targetDetailsDiv.innerHTML = "<b>Target:</b> " + data.target_distance + ' ' + data.target_distance_unit + '(s)';

            const yourProgressDiv = document.querySelector('#yourProgress');
            yourProgressDiv.innerHTML = "<b>Your Progress:</b> " + progress.toString() + "%";

            const createDateDiv = document.querySelector('#createDate');
            createDateDiv.innerHTML = "<b>Crated Date:</b> " + data.create_date;

            const updateDateDiv = document.querySelector('#updateDate');
            updateDateDiv.innerHTML = "<b>Updated Date:</b> " + replaceNull(data.update_date);

            const editGoalButton = document.querySelector('#editGoalButton');
            editGoalButton.addEventListener('click', ()=>{
                window.location.replace(`./goal_update.html?id=${data.id}`);
            });
        } catch(err) {
            return({message: err.message})
        }
    }
    getGoalById(goalId);
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

function removeTime(dateTimeString) {
    return dateTimeString.substring(0, 10);
}

async function getWorkoutByUserId() {
    try {
        let url = `${API_URL_BASE}/workout`;
        let userId = localStorage.getItem("uid");
        if (userId !== undefined && userId !== null && userId !== 0) {
            url = `${API_URL_BASE}/workout/userId/${userId}`;
        }
        const response = await fetch(url)
        const data = await response.json();
        return data;
    } catch(err) {
        return [];
    }
}

function getGoalProgress(goal, listOfWorkout) {
    let targetDistance = parseInt(convertToMile(goal.target_distance, goal.target_distance_unit));
    let achivedDistance = 0;
    listOfWorkout.forEach((curWorkout) => {
        if (curWorkout.sport_type === goal.sport_type) {
            let workourStartTime = Date.parse(curWorkout.start_time);
            let workourEndTime = Date.parse(curWorkout.end_time);
            let goalStartTime = Date.parse(goal.start_date);
            let goalEndTime = Date.parse(goal.end_date);
            if (workourStartTime > goalStartTime &&  workourEndTime < goalEndTime) {
                achivedDistance = achivedDistance + convertToMile(curWorkout.total_distance, curWorkout.total_distance_unit);
            }
        }
    });
    if (targetDistance > 0 && achivedDistance > 0) {
        return achivedDistance/targetDistance;
    }
    return 0;
}

function convertToMile(distance, unit) {
    let result = distance;
    if (unit === 'mile') {
        result = result*1.61;
    }
    return result;
}