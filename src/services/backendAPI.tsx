import { Stream } from "stream";
import { json } from "stream/consumers";
import { adminInfo, User, userInfo } from '../redux/slices/userSlice';

const vmPath = `se2-g.compute.dtu.dk:5000`
const localPath = `localhost:5000`
const path = vmPath

export function getPath() {
    return `http://`+path
}
function getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('token');
    if (!token) {
        console.warn('Authorization token is missing or undefined.');
        return {};
    }
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
}



export async function fetchActivityLogs(): Promise<any[]> {
    try {
        const response = await fetch(`${getPath()}/api/activitylog/getLogs`, {
            method: 'GET',
            headers: getAuthHeaders(), 
        });
        if (!response.ok) {
            throw new Error('Failed to fetch activity logs');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching activity logs:', error);
        return [];
    }
}

export async function downloadActivityLogs() {
    try {
        const response = await fetch(`${getPath()}/api/activitylog/downloadLogs`, {
            method: 'GET',
            headers: getAuthHeaders(), 
        });

        if (!response.ok) {
            throw new Error('Failed to download activity logs');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ActivityLog.txt';
        a.click();
        console.log('Download triggered');
    } catch (error) {
        console.error('Error downloading activity logs:', error);
    }
}
export async function fetchStatus(ticket: string) {

    try {
        const response = await fetch(`http://` + path + `/status/${ticket}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        //console.log(jsonData)
        return jsonData;
    } catch (error) {
        console.error('Error fetching status:', error);
        return error;
    }
}

export async function fetchMessageLoop(ticketId: string) {
    try {
        const maxRetries = 10;
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        for (let retries = 0; retries < maxRetries; retries++) {
            const data = await fetchStatus(ticketId);
            if (data.status) {
                return data.result.message;
            }
            await delay(1000); 
        }

    } catch (error) {
        return error
    }
}

export async function fetchStatusLoop(ticketId: string) {
    try {
        const maxRetries = 10;
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        for (let retries = 0; retries < maxRetries; retries++) {
            const data = await fetchStatus(ticketId);
            if (data.status) {
                return data;
            }
            await delay(1000); 
        }

    } catch (error) {
        return error
    }
}

export async function fetchFile(ticket: string) {

    try {
        const response = await fetch(`http://` + path + `/status/${ticket}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        //console.log(jsonData)
        return response;
    } catch (error) {
        console.error('Error fetching status:', error);
        return error;
    }
}


export async function fetchOrganisations() {
    try {
        // Fetching organizations with the Authorization header
        const response = await fetch(`http://` + path + `/organizations`, {
            method: 'GET',
            headers: getAuthHeaders(), // Adding the Authorization header
        });

        // Check if the response is not OK
        if (!response.ok) {
            throw new Error('Fetching organizations failed. Network response was not ok');
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

        // Call getData function with the ticketId obtained from the organizations API
        return await getData(jsonData.ticketId);
    } catch (error) {
        // Log the error and rethrow it for the caller
        console.error('Error fetching organizations:', error);
        throw error;
    }
}




export async function fetchOrganisation(orgId: string) {
    try {
        const response = await fetch(`http://` + path + `/Organizations/${orgId}`, {
            method: 'GET',
            headers: getAuthHeaders(), // Adding the Authorization header
        });

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

export async function fetchOrganisationRepositories(orgId: string) {
    try {
        const response = await fetch(`http://` + path + `/Organizations/${orgId}/repositories`, {
            method: 'GET',
            headers: getAuthHeaders(), // Adding the Authorization header
        });

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

export async function fetchRepository(orgId: string, repId: string) {
    try {
        const response = await fetch(`http://` + path + `/Organizations/${orgId}/repositories/${repId}`, {
            method: 'GET',
            headers: getAuthHeaders(), // Adding the Authorization header
        });

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

export async function fetchRepositoryResources(orgId: string, repId: string) {
    try {
        const response = await fetch(`http://` + path + `/Organizations/${orgId}/repositories/${repId}/resources`, {
            method: 'GET',
            headers: getAuthHeaders(), 
        });

        if (!response.ok) {
            throw new Error('Fetching resources, Network response was not ok');
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
                    //console.log(data)
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

export async function fetchResource(orgId: string, repId: string, resId: string) {
    try {
        const response = await fetch(`http://` + path + `/Organizations/${orgId}/repositories/${repId}/resources/${resId}`, {
            method: 'GET',
            headers: getAuthHeaders(), // Adding Authorization header
        });
        if (!response.ok) {
            throw new Error('Fetching resource, Network response was not ok');
        }
        const jsonData = await response.json();

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

        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('Fetching resource, Error fetching data:', error);
        throw error;
    }
}

export async function fetchRepositoryPipelines(orgId: string, repId: string) {
    try {
        const response = await fetch(`http://` + path + `/Organizations/${orgId}/repositories/${repId}/pipelines`, {
            method: 'GET',
            headers: getAuthHeaders(), // Adding Authorization header
        });
        if (!response.ok) {
            throw new Error('fetching pipelines, Network response was not ok');
        }
        const jsonData = await response.json();

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

        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('fetching pipelines, Error fetching data:', error);
        throw error;
    }
}
export async function fetchPipeline(orgId: string, repId: string, pipId: string) {
    try {
        const response = await fetch(`http://` + path + `/Organizations/${orgId}/repositories/${repId}/pipelines/${pipId}`, {
            method: 'GET',
            headers: getAuthHeaders(), // Adding Authorization header
        });
        if (!response.ok) {
            throw new Error('fetching pipeline, Network response was not ok');
        }
        const jsonData = await response.json();

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

        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('fetching pipeline, Error fetching data:', error);
        throw error;
    }
}
export async function putRepository(orgId: string, repositoryName: string) {
    try {
        const response = await fetch(`http://` + path + `/Organizations/${orgId}/repositories`, {
            method: 'POST',
            headers: getAuthHeaders(), // Adding Authorization header
            body: JSON.stringify({ name: repositoryName }),
        });

        if (!response.ok) {
            throw new Error('put rep, Network response was not ok');
        }

        const jsonData = await response.json();

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

        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('put rep, Error fetching data:', error);
        throw error;
    }
}
export async function putResource(orgId: string, repId: string, formData: FormData) {
    try {
        const response = await fetch(`http://` + path + `/Organizations/${orgId}/repositories/${repId}/resources`, {
            method: 'POST',
            headers: getAuthHeaders(), // Adding Authorization header
            body: formData,
        });

        if (!response.ok) {
            throw new Error('put res, Network response was not ok');
        }

        const jsonData = await response.json();

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

        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('put res, Error fetching data:', error);
        throw error;
    }
}

export async function putPipeline(orgId: string, repId: string, pipelineData:any){
    console.log(pipelineData)
    try {
        const response = await fetch(`http://${path}/Organizations/${orgId}/repositories/${repId}/pipelines`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(pipelineData)
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
                        return data.result.itemIds.pipelineId as string;
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

export async function putExecution(orgId: string, repId: string, pipeId: string) {
    try {
        const response = await fetch(`http://${path}/Organizations/${orgId}/repositories/${repId}/pipelines/${pipeId}/executions`, {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error('put execution, Network response was not ok');
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
                        return data.result.itemIds.executionId as string;;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
                        throw new Error('Max retries reached');
                    }
                }
            }
            throw new Error('Failed to post execution');
        };

        // Call getData function with the ticketId obtained from putExecution
        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('put execution, Error fetching data:', error);
        throw error; // Propagate error to the caller
    }
}

export async function putCommandStart(orgId: string, repId: string, pipeId: string, exeId:string) {
    try {
        const response = await fetch(`http://${path}/Organizations/${orgId}/repositories/${repId}/pipelines/${pipeId}/executions/${exeId}/commands/start`, {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error('put command start, Network response was not ok');
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
            throw new Error('Failed to command start');
        };

        // Call getData function with the ticketId obtained from putExecution
        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('put command start, Error fetching data:', error);
        throw error; // Propagate error to the caller
    }
}

export async function putOperator(orgId: string, repId: string, formData: FormData) {
    try {
        const response = await fetch(`http://` + path + `/Organizations/${orgId}/repositories/${repId}/resources/operators`, {
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

export async function PostNewPeer(domainName: string) {
    try {
        const formData = new FormData();
        formData.append('targetPeerDomain', domainName);

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const response = await fetch(`http://` + path +`/system/collab-handshake`, {
            method: "POST",
            body: JSON.stringify({targetPeerDomain: domainName}),
            headers: headers
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();

        // Fetch additional data recursively
        var retryNumber = 0;
        const getData = async (ticketId: string): Promise<any> => {
            try {
                const data = await fetchStatus(ticketId);
                if (!data.status && retryNumber < 10) {
                    retryNumber++;
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

export async function downloadResource(organizationId: string, repositoryId: string, resourceId: string) {
    try {
        const response = await fetch(`http://` + path + `/organizations/${organizationId}/repositories/${repositoryId}/resources/${resourceId}/file`);
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
                    const response = await fetchFile(ticketId) as any;
                    console.log(response)
                    if (response.ok) {
                        await delay(1000);
                        return response;
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
