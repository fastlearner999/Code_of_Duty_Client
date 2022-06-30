const API_URL_BASE = 'https://energize-code-of-duty.herokuapp.com';

const addNewGoal = async (e) => {
  e.preventDefault()
  let goalData = {
        user_id: 5,
        goal_name: document.querySelector('#goal_name').value,
        sport_type: document.querySelector('#sport_type').value,
        period: parseInt( document.querySelector('#period').value),
        period_type: document.querySelector('#period_type').value,
        start_date: null,
        end_date: null,
        target_distance: parseInt( document.querySelector('#target_distance').value),
        target_distance_unit: document.querySelector('#target_distance_unit').value
  }
  const res = await fetch(`${API_URL_BASE}/goal`, {		
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(goalData)
  });
  const resBody = await res.json();
  console.log(resBody)
  // if (resBody !== undefined && 'id' in resBody) {
  //   // window.location.href = 'goals.html';
  //   }
  };

  document.addEventListener("submit", addNewGoal);
