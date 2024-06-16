const vmPath = `dapm1.compute.dtu.dk:5000`
const localPath = `localhost:5000`

const path = localPath

export async function fetchStatus(ticket: string) {

    try {
        const response = await fetch(`http://` + path +`/status/${ticket}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        return jsonData;
      } catch (error) {
        console.error('Error fetching status:', error);
        return error;
      }
}


export async function fetchOrganisations() {
    try {
        const response = await fetch(`http://` + path +`/organizations`);
        if (!response.ok) {
            throw new Error('Fetching orgs, Network response was not ok');
        }
        const jsonData = await response.json();

    // Fetch additional data recursively
    const getData = async (ticketId: string): Promise<any> => {
        const maxRetries = 10;
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
        for (let retries = 0; retries < maxRetries; retries++) {
            try {
                const data = await fetchStatus(ticketId);
                if (data.status) {
                    return data;
                }
                await delay(1000); // Wait for 1 second before retrying
            } catch (error) {
                if (retries === maxRetries - 1) {
                    throw new Error('Max retries reached');
                }
            }
        }
        throw new Error('Failed to fetch data');
    };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('Fetching orgs, Error fetching data:', error);
        throw error; // Propagate error to the caller
    }
}



export async function fetchOrganisation(orgId:string) {
    try {
        const response = await fetch(`http://` + path +`/Organizations/${orgId}`);
        if (!response.ok) {
            throw new Error('Fetching org, Network response was not ok');
        }
        const jsonData = await response.json();

        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        
            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
                        throw new Error('Max retries reached');
                    }
                }
            }
            throw new Error('Failed to fetch data');
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('Fetching org, Error fetching data:', error);
        throw error; // Propagate error to the caller
    }
}

export async function fetchOrganisationRepositories(orgId:string) {
    try {
        const response = await fetch(`http://` + path +`/Organizations/${orgId}/repositories`);
        if (!response.ok) {
            throw new Error('Fecthing reps, Network response was not ok');
        }
        const jsonData = await response.json();

        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        
            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
                        throw new Error('Max retries reached');
                    }
                }
            }
            throw new Error('Failed to fetch data');
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('Fecthing reps, Error fetching data:', error);
        throw error; // Propagate error to the caller
    }
}

export async function fetchRepository(orgId:string, repId:string) {
    try {
        const response = await fetch(`http://` + path +`/Organizations/${orgId}/repositories/${repId}`);
        if (!response.ok) {
            throw new Error('Fecthing rep, Network response was not ok');
        }
        const jsonData = await response.json();

        // Fetch additional data recursively
    const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        
            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
                        throw new Error('Max retries reached');
                    }
                }
            }
            throw new Error('Failed to fetch data');
        };
        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('Fecthing rep, Error fetching data:', error);
        throw error; // Propagate error to the caller
    }
}

export async function fetchRepositoryResources(orgId:string, repId:string) {
    try {
        const response = await fetch(`http://` + path +`/Organizations/${orgId}/repositories/${repId}/resources`);
        if (!response.ok) {
            throw new Error('Fetching resources, Network response was not ok');
        }
        const jsonData = await response.json();
        console.log(jsonData)

        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        
            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    console.log(data)
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
                        throw new Error('Max retries reached');
                    }
                }
            }
            throw new Error('Failed to fetch data');
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('Fetching resources, Error fetching data:', error);
        throw error; // Propagate error to the caller
    }
}

export async function fetchResource(orgId:string, repId:string, resId:string) {
    try {
        const response = await fetch(`http://` + path +`/Organizations/${orgId}/repositories/${repId}/resources/${resId}`);
        if (!response.ok) {
            throw new Error('Fetching resource, Feching Network response was not ok');
        }
        const jsonData = await response.json();

        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        
            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
                        throw new Error('Max retries reached');
                    }
                }
            }
            throw new Error('Failed to fetch data');
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('Fetching resource, Error fetching data:', error);
        throw error; // Propagate error to the caller
    }
}

export async function fetchRepositoryPipelines(orgId:string, repId:string) {
    try {
        const response = await fetch(`http://` + path +`/Organizations/${orgId}/repositories/${repId}/pipelines`);
        if (!response.ok) {
            throw new Error('fetching pipelines, Network response was not ok');
        }
        const jsonData = await response.json();
       
        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        
            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
                        throw new Error('Max retries reached');
                    }
                }
            }
            throw new Error('Failed to fetch data');
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('fetching pipelines, Error fetching data:', error);
        throw error; // Propagate error to the caller
    }
}

export async function fetchPipeline(orgId:string, repId:string, pipId:string) {
    try {
        const response = await fetch(`http://` + path +`/Organizations/${orgId}/repositories/${repId}/pipelines/${pipId}`);
        if (!response.ok) {
            throw new Error('fetching pipeline, Network response was not ok');
        }
        const jsonData = await response.json();
        
        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        
            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
                        throw new Error('Max retries reached');
                    }
                }
            }
            throw new Error('Failed to fetch data');
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('fetching pipeline, Error fetching data:', error);
        throw error; // Propagate error to the caller
    }
}

//NOT DONE!
export async function putRepository(orgId: string, name:string) {
    const headers = new Headers()
    headers.append("accept", "text/plain")
    headers.append("Content-Type", "text/plain")

    try {
        const response = await fetch(`http://` + path +`/Organizations/${orgId}/repositories`, {
            method: "POST",
            headers: headers,
            body: name
        });

        if (!response.ok) {
            throw new Error('put rep, Network response was not ok');
        }

        const jsonData = await response.json();

        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        
            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
                        throw new Error('Max retries reached');
                    }
                }
            }
            throw new Error('Failed to fetch data');
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('put rep, Error fetching data:', error);
        throw error; // Propagate error to the caller
    }
}

export async function putResource(orgId: string, repId: string, formData: FormData) {
    try {
        const response = await fetch(`http://` + path +`/Organizations/${orgId}/repositories/${repId}/resources`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error('put res, Network response was not ok');
        }

        const jsonData = await response.json();

        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        
            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
                        throw new Error('Max retries reached');
                    }
                }
            }
            throw new Error('Failed to fetch data');
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('put res, Error fetching data:', error);
        throw error; // Propagate error to the caller
    }
}

export async function putPipeline(orgId: string, repId: string, pipeline:string) {
    console.log(pipeline)
    try {
        const response = await fetch(`http://${path}/Organizations/${orgId}/repositories/${repId}/pipelines`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "name": "test",
                "pipeline": {
                    "nodes": [
                        {
                            "type": "string",
                            "templateData": {
                                "sourceHandles": [
                                    {
                                        "handleData": {
                                            "id": "string"
                                        }
                                    }
                                ],
                                "targetHandles": [
                                    {
                                        "handleData": {
                                            "id": "string"
                                        }
                                    }
                                ]
                            },
                            "instantiationData": {
                                "resource": {
                                    "organizationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "repositoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "resourceId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "name": "string"
                                }
                            }
                        }
                    ],
                    "edges": [
                        {
                            "sourceHandle": "string",
                            "targetHandle": "string"
                        }
                    ]
                }
            })
        });

        if (!response.ok) {
            throw new Error('put pipeline, Network response was not ok');
        }

        const jsonData = await response.json();
        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        
            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
                        throw new Error('Max retries reached');
                    }
                }
            }
            throw new Error('Failed to fetch data');
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('put pipeline, Error fetching data:', error);
        throw error; // Propagate error to the caller
    }
}