const heroku_url = 'https://energize-code-of-duty.herokuapp.com'

console.log('hello')

async function fetchAllGoals(){
    try{
        let url = `${heroku_url}/goal`
        
        // habits/user/userId
        const response = await fetch('https://energize-code-of-duty.herokuapp.com/goal')
        const data = await response.json()
        console.log(data)
        
        data.forEach(element => {
            // grab div with id = goals_insert
            const goals_insert = document.querySelector('#goals_insert')

            // creating goals card
            const goal_div = document.createElement('div')
            const goal_title = document.createElement('h4')

            // set created elements attributes/text conent
            goal_title.textContent = element.goal_name
            
            // styling created elements
            goal_div.classList = 'goal-div'
            goal_title.classList = 'goal-title'
            
            
            goal_div.appendChild(goal_title)
            
            goals_insert.appendChild(goal_div)  
            
            goal_div.addEventListener('click', ()=>{
                window.location.replace(`./goal_view.html?id=${element.id}`);
            })
        });


    }catch(err){
        return({message: err.message})
    }
}

fetchAllGoals()
