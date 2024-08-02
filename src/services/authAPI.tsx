
export async function getAuth() {

    const headers = new Headers({
        token: sessionStorage.getItem('token') || ""
      });
      
    try {
        return await fetch(`http://localhost:5025/configuration`, {
            headers
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Propagate error to the caller
    }
}