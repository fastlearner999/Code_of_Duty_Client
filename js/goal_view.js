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
                const div = document.createElement('div')
                const title = document.createElement('h4')
                title.textContent = goal.sport_type + ' / ' + goal.goal_name + ' / ' + goal.period + ' / ' + goal.period_type + '/' + removeTime(goal.start_date) + '/' + removeTime(goal.end_date) + ' / ' + goal.target_distance + goal.target_distance_unit + '/ progress: ' + progress*100 + '%' ;
                
                // styling created elements
                div.classList = 'goal-div'
                title.classList = 'goal-title'
                
                div.appendChild(title);
                
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

            const goalName = document.querySelector('#goalName');
            goalName.textContent = "Goal Name: " + data.goal_name;

            const sportType = document.querySelector('#sportType');
            sportType.textContent = "Sport Type: " + data.sport_type;

            const period = document.querySelector('#period');
            period.textContent = "Period: " + data.period + ' ' + data.period_type;

            const startDate = document.querySelector('#startDate');
            startDate.textContent = "Start Date: " + removeTime(data.start_date);

            const endDate = document.querySelector('#endDate');
            endDate.textContent = "End Date: " + removeTime(data.end_date);

            const targetDetails = document.querySelector('#targetDetails');
            targetDetails.textContent = "Target: " + data.target_distance + ' ' + data.target_distance_unit;

            const yourProgress = document.querySelector('#yourProgress');
            yourProgress.textContent = "Your Progress: " + (progress*100).toString() + "%";

            const createDate = document.querySelector('#createDate');
            createDate.textContent = "Crated Date: " + data.create_date;

            const updateDate = document.querySelector('#updateDate');
            updateDate.textContent = "Updated Date: " + replaceNull(data.update_date);

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