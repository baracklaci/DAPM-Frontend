
export async function login(data: any) {
    try {
        // const response =  /UserAuthorization/UserInfo/Login
        return await fetch(`http://localhost:5025/UserAuthorization/UserInfo/Login`, {
            method: "POST",    
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Propagate error to the caller
    }
}


export async function register(data: any) {
    try {
        const res = await fetch(`http://localhost:5025/UserAuthorization/UserInfo/UserRegistration`, {
            method: "POST",    
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        return res.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Propagate error to the caller
    }
}

export async function queryAccount(data: any) {
     const headers = new Headers({
         token: sessionStorage.getItem('token') || ""
       });
    try {
        const res =  await fetch(`http://localhost:5025/UserAuthorization/UserInfo/GetUserList`, {
            method: "POST",    
            headers: {
                "Content-Type": "application/json",
                 token: sessionStorage.getItem('Token') || ""
            },
            body: JSON.stringify(data)
        });

        return res.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Propagate error to the caller
    }
}

// 
export async function updataPermission (data: any) {
    try {
        
        const res = await fetch(`http://localhost:5025/UserAuthorization/UserInfo/AddUserFilePermission`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                 token: sessionStorage.getItem('Token') || ""
            },
            body: JSON.stringify(data)
        })

        return res.json()

    } catch (error) {
        
    }
}


export async function UpdateUserRole (data: any) {
    try {
        
        const res = await fetch(`http://localhost:5025/UserAuthorization/UserInfo/UpdateUserRole`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                 token: sessionStorage.getItem('Token') || ""
            },
            body: JSON.stringify(data)
        })

        return res.json()

    } catch (error) {
        
    }
}