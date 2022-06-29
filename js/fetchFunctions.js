const heroku_url = ''

async function fetchGetHabitsByUser(userId){
    try{
        let url = `${heroku_url}/habits/user/${userId}`
        const response = await fetch(url)
        const data = await response.json()
        return data

    }catch(err){
        return({message: err.message})
    }
}

async function fetchDeleteHabit(habitId){
    try{
        let url = `${heroku_url}/habits/${habitId}`
        const response = await fetch(url, {
            method: 'DELETE', 
        })
        const data = await response.text()
        return 'Habit was deleted'

    }catch(err){
        return({message: err.message})
    }
}

async function fetchCreateHabit(title, frequency, goal, date, userId){
    try{
        let url = `${heroku_url}/habits/new`
        const habitData = {
            "title": title,
            "frequency": frequency,
            "goal": goal,
            "startdate": date,
            "userId": userId
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(habitData) 
          })
        const data = await response.text()
        console.log(data)
        return data

    }catch(err){
        return({message: err.message})
    }
}

async function fetchPatchHabit(habitId, command){
    try{
        let url = `${heroku_url}/habits/${habitId}`
        const habitData = {
            "id": habitId,
            "command": command
        }
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(habitData) 
          })
        const data = await response.text()
        console.log(data)
        return data

    }catch(err){
        return({message: err.message})
    }
}

async function fetchCreateUser(username, password){
    try{
        let url = `${heroku_url}/auth/register`
        const habitData = {
            "username": username,
            "password": password
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(habitData) 
          })
        const data = await response.text()
        return data

    }catch(err){
        return({message: err.message})
    }
}

//Logs in and sets local storage for userid and username, changes location.hash to mainpage

async function fetchLogin(username, password){
    try{
        let url = `${heroku_url}/auth/login`
        const habitData = {
            "username": username,
            "password": password
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(habitData) 
          })
        const data = await response.json()

        console.log(data.userId)

        localStorage.setItem('userid', data.userId);
        localStorage.setItem('username', data.username);

        location.hash = '#mainpage'

        return data

    }catch(err){
        return({message: err.message})
    }
}