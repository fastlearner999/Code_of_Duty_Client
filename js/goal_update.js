// ThiS JS FILE IS DESIGNED FOR:
// - goal_update.html

const API_URL_BASE = 'https://energize-code-of-duty.herokuapp.com';
const curPage = window.location.pathname;
if (curPage.includes('goal_update.html')) {
    let goalId = getId();
    async function getGoalById(goalId) {
        try{
            let url = `${API_URL_BASE}/goal/${goalId}`;
            const res1 = await fetch(url)
            const data = await res1.json();
            document.querySelector('#id').value = data.id;
            document.querySelector('#goalName').value = data.goal_name;
            document.querySelector('#sportType').value = data.sport_type;
            document.querySelector('#period').value = data.period;
            document.querySelector('#periodType').value = data.period_type;
            document.querySelector('#startDate').value = data.start_date;
            document.querySelector('#endDate').value = data.end_date;
            document.querySelector('#targetDistance').value = data.target_distance;
            document.querySelector('#targetDistanceUnit').value = data.target_distance_unit;
            document.querySelector('#createDate').value = data.create_date;
            document.querySelector('#updateDate').value = replaceNull(data.update_date);
        } catch(err) {
            return({message: err.message})
        }
    }
    getGoalById(goalId);

    const deleteGoalButton = document.querySelector('#deleteGoalButton');
    deleteGoalButton.addEventListener('click', ()=>{
        let confirmToDelete = confirm("Are you sure to delete?");
        if (confirmToDelete) {
            //TODO
            alert('Goal deleted');
            window.location.replace(`./goals.html`);
        } 
    });
    
    const saveGoalButton = document.querySelector('#saveGoalButton');
    saveGoalButton.addEventListener('click', ()=>saveGoal());
}

async function saveGoal() {
    let editGoal = {
        id: parseInt(document.querySelector("#id").value),
        goal_name: document.querySelector("#goalName").value,
        sport_type: document.querySelector("#sportType").value,
        period: parseInt(document.querySelector("#period").value),
        period_type: document.querySelector("#periodType").value,
        start_date: document.querySelector("#startDate").value,
        end_date: document.querySelector("#endDate").value,
        target_distance: parseInt(document.querySelector("#targetDistance").value),
        target_distance_unit: document.querySelector("#targetDistanceUnit").value
    };
    const res2 = await fetch(`${API_URL_BASE}/goal`, {		
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editGoal)
    });
    const resBody2 = await res2.json();
    console.log(resBody2)
    if (resBody2 !== undefined && 'id' in resBody2) {
        alert('Saved');
    } else {

        alert('Save fail');
    }
    window.location.replace(`./goals.html`);
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