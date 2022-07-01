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
            let url = `${API_URL_BASE}/goal`;
            let userId = localStorage.getItem("uid");
            if (userId !== undefined && userId !== null && userId !== 0) {
                url = `${API_URL_BASE}/goal/userId/${userId}`;
            }
            const response = await fetch(url)
            const data = await response.json();
            data.forEach(goal => {
                const listTag = document.querySelector('#goal_list');
    
                // creating goals card
                const div = document.createElement('div')
                const title = document.createElement('h4')
                title.textContent = goal.sport_type + ' / ' + goal.goal_name + ' / ' + goal.period + ' / ' + goal.period_type + '/' + goal.start_date + '/' + goal.end_date + ' / ' + goal.target_distance + goal.target_distance_unit;
                
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
            let url = `${API_URL_BASE}/goal/${goalId}`;
            const response = await fetch(url)
            const data = await response.json();

            const goalName = document.querySelector('#goalName');
            goalName.textContent = "Goal Name: " + data.goal_name;

            const sportType = document.querySelector('#sportType');
            sportType.textContent = "Sport Type: " + data.sport_type;

            const period = document.querySelector('#period');
            period.textContent = "Period: " + data.period + ' ' + data.period_type;

            const startDate = document.querySelector('#startDate');
            startDate.textContent = "Start Date: " + data.start_date;

            const endDate = document.querySelector('#endDate');
            endDate.textContent = "End Date: " + data.end_date;

            const targetDetails = document.querySelector('#targetDetails');
            targetDetails.textContent = "Target: " + data.target_distance + ' ' + data.target_distance_unit;

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