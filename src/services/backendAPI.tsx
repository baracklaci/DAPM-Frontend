export async function fetchStatus(ticket: string) {
    try {
        const response = await fetch('http://localhost:5000/status/' + ticket);
        if (!response.ok) {
          throw new Error('Network  status response was not ok');
        }
        const jsonData = await response.json();
        return jsonData;
      } catch (error) {
        console.error('Error fetching data:', error);
        return error;
      }
}


export async function fetchOrganisations() {
    try {
        const response = await fetch('http://localhost:5000/Organizations');
        if (!response.ok) {
            throw new Error('Network organisations response was not ok');
        }
        const jsonData = await response.json();

        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            try {
                const data = await fetchStatus(ticketId);
                if (!data.status) {
                    return await getData(ticketId); // Recursive call
                } else {
                    return data; // Return data once condition is met
                }
            } catch (error) {
                throw error; // Propagate error to the outer catch block
            }
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Propagate error to the caller
    }
}



export async function fetchOrganisation(id:number) {

    const response = await fetch(".../organisations/" + id)
    const organisation = await response.json

    return organisation
    
}