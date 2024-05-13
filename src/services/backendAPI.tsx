export async function fetchStatus(ticket: string) {
    try {
        const response = await fetch(`http://localhost:5000/status/${ticket}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
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
        const response = await fetch(`http://localhost:5000/Organizations`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
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



export async function fetchOrganisation(orgId:number) {
    try {
        const response = await fetch(`http://localhost:5000/Organizations/${orgId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
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

export async function fetchOrganisationRepositories(orgId:number) {
    try {
        const response = await fetch(`http://localhost:5000/Organizations/${orgId}/repositories`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
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

export async function fetchRepository(orgId:number, repId:number) {
    try {
        const response = await fetch(`http://localhost:5000/Organizations/${orgId}/repositories/${repId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
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

export async function fetchRepositoryResources(orgId:number, repId:number) {
    try {
        const response = await fetch(`http://localhost:5000/Organizations/${orgId}/repositories/${repId}/resources`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
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

export async function putResource(orgId: number, repId: number, formData: FormData) {
    try {
        const response = await fetch(`http://localhost:5000/Organizations/${orgId}/repositories/${repId}/resources`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
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