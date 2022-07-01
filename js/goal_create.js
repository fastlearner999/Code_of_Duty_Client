// ThiS JS FILE IS DESIGNED FOR:
// - goal_create.html

const API_URL_BASE = 'https://energize-code-of-duty.herokuapp.com';
const curPage = window.location.pathname;

// Check if no localstorage, kick user away
let userId = localStorage.getItem("uid");
if (userId === undefined || userId === null || userId === 0) {
    alert('Please login first');
    window.location.href = 'login.html';
}

if (curPage.includes('goal_create.html')) {
  const saveGoalButton = document.querySelector('#saveGoalButton');
  saveGoalButton.addEventListener('click', ()=>saveGoal());
}

async function saveGoal() {
  let newGoal = {
    user_id: parseInt(localStorage.getItem("uid")),
    goal_name: document.querySelector('#goal_name').value,
    sport_type: document.querySelector('#sport_type').value,
    period: parseInt( document.querySelector('#period').value),
    period_type: document.querySelector('#period_type').value,
    start_date: document.querySelector('#startDate').value,
    end_date: document.querySelector('#endDate').value,
    target_distance: parseInt( document.querySelector('#target_distance').value),
    target_distance_unit: document.querySelector('#target_distance_unit').value
  };
  const res2 = await fetch(`${API_URL_BASE}/goal`, {		
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newGoal)
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
