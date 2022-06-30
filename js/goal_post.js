const API_URL_BASE = 'https://energize-code-of-duty.herokuapp.com';

const addNewGoal = async () => {
  let goalData = {
        goal_name: document.querySelector('#goal_name').value,
        sport_type: document.querySelector('#sport_type').value,
        period: document.querySelector('#period').value,
        period_type: document.querySelector('#period_type').value,
        start_date: document.querySelector('#start_date').value,
        end_date: document.querySelector('#end_date').value,
        target_distance: document.querySelector('#target_distance').value,
        target_distance_uni: document.querySelector('#target_distance_uni').value
  }
  const res = await fetch(API_URL_BASE + '/goal', {		
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(goalData)
  });
  const resBody = await res.json();
  if (resBody !== undefined && 'id' in resBody) {
    // window.location.href = 'goals.html';
    console.log(resBody)
    }
  };
