const vmPath = `localhost:5025/platform`;
const localPath = `localhost:5000/platform`;

const path = vmPath;

export async function fetchStatus(ticket: string) {
    const headers = new Headers({
        "token": sessionStorage.getItem('Token') || ""
    });

    try {
        const response = await fetch(`http://${path}/status/${ticket}`, {
            method: "GET",
            headers: headers
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching status:', error);
        throw error;
    }
}

export async function fetchOrganisations() {
    const headers = new Headers({
        "token": sessionStorage.getItem('Token') || ""
    });

    try {
        const response = await fetch(`http://${path}/organizations`, {
            method: "GET",
            headers: headers
        });
        if (!response.ok) {
            throw new Error('Fetching orgs, Network response was not ok');
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
                    await delay(1000);
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
        console.error('Fetching orgs, Error fetching data:', error);
        throw error;
    }
}

export async function fetchOrganisation(orgId: string) {
    const headers = new Headers({
        "token": sessionStorage.getItem('Token') || ""
    });

    try {
        const response = await fetch(`http://${path}/Organizations/${orgId}`, {
            method: "GET",
            headers: headers
        });
        if (!response.ok) {
            throw new Error('Fetching org, Network response was not ok');
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
                    await delay(1000);
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
        console.error('Fetching org, Error fetching data:', error);
        throw error;
    }
}

export async function fetchOrganisationRepositories(orgId: string) {
    const headers = new Headers({
        "token": sessionStorage.getItem('Token') || ""
    });

    try {
        const response = await fetch(`http://${path}/Organizations/${orgId}/repositories`, {
            method: "GET",
            headers: headers
        });
        console.log('---->response', response);
        if (!response.ok) {
            throw new Error('Fetching reps, Network response was not ok');
        }
        const jsonData = await response.json();
        console.log('---->response----json', jsonData);

        if (jsonData.code === 500) {
            throw new Error("请登录。。。");
        }
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000);
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
        console.error('Fetching reps, Error fetching data:', error);
        throw error;
    }
}

export async function fetchRepository(orgId: string, repId: string) {
    const headers = new Headers({
        "token": sessionStorage.getItem('Token') || ""
    });

    try {
        const response = await fetch(`http://${path}/Organizations/${orgId}/repositories/${repId}`, {
            method: "GET",
            headers: headers
        });
        if (!response.ok) {
            throw new Error('Fetching rep, Network response was not ok');
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
                    await delay(1000);
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
        console.error('Fetching rep, Error fetching data:', error);
        throw error;
    }
}

export async function fetchRepositoryResources(orgId: string, repId: string) {
    const headers = new Headers({
        "token": sessionStorage.getItem('Token') || ""
    });

    try {
        const response = await fetch(`http://${path}/Organizations/${orgId}/repositories/${repId}/resources`, {
            method: "GET",
            headers: headers
        });
        if (!response.ok) {
            throw new Error('Fetching resources, Network response was not ok');
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
                    await delay(1000);
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
        console.error('Fetching resources, Error fetching data:', error);
        throw error;
    }
}

export async function fetchResource(orgId: string, repId: string, resId: string) {
    const headers = new Headers({
        "token": sessionStorage.getItem('Token') || ""
    });

    try {
        const response = await fetch(`http://${path}/Organizations/${orgId}/repositories/${repId}/resources/${resId}/GetResourceById`, {
            method: "GET",
            headers: headers
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
                    await delay(1000);
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
    const headers = new Headers({
        "token": sessionStorage.getItem('Token') || ""
    });

    try {
        const response = await fetch(`http://${path}/Organizations/${orgId}/repositories/${repId}/pipelines`, {
            method: "GET",
            headers: headers
        });
        if (!response.ok) {
            throw new Error('Fetching pipelines, Network response was not ok');
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
                    await delay(1000);
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
        console.error('Fetching pipelines, Error fetching data:', error);
        throw error;
    }
}

export async function fetchPipeline(orgId: string, repId: string, pipId: string) {
    const headers = new Headers({
        "token": sessionStorage.getItem('Token') || ""
    });

    try {
        const response = await fetch(`http://${path}/Organizations/${orgId}/repositories/${repId}/pipelines/${pipId}/GetPipelineById`, {
            method: "GET",
            headers: headers
        });
        if (!response.ok) {
            throw new Error('Fetching pipeline, Network response was not ok');
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
                    await delay(1000);
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
        console.error('Fetching pipeline, Error fetching data:', error);
        throw error;
    }
}

export async function putRepository(orgId: string, repositoryName: string) {
    const headers = new Headers({
        "Content-Type": "application/json",
        "token": sessionStorage.getItem('Token') || ""
    });

    try {
        const response = await fetch(`http://${path}/Organizations/${orgId}/repositories/PostRepositoryToOrganization`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ name: repositoryName })
        });

        console.log('接口返回信息', response)

        if (!response.ok) {
            throw new Error('Put rep, Network response was not ok');
        }

        const jsonData = await response.json();

        console.log('接口返回信息---> json', jsonData);


        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000);
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
        console.error('Put rep, Error fetching data:', error);
        throw error;
    }
}

export async function putResource(orgId: string, repId: string, formData: FormData) {
    const headers = new Headers({
        "token": sessionStorage.getItem('Token') || ""
    });

    try {
        const response = await fetch(`http://${path}/Organizations/${orgId}/repositories/${repId}/resources/PostResourceToRepository`, {
            method: "POST",
            headers: headers,
            body: formData
        });

        if (!response.ok) {
            throw new Error('Put res, Network response was not ok');
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
                    await delay(1000);
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
        console.error('Put res, Error fetching data:', error);
        throw error;
    }
}

export async function putPipeline(orgId: string, repId: string, pipelineData: any) {
    const headers = new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "token": sessionStorage.getItem('Token') || ""
    });

    try {
        const response = await fetch(`http://${path}/Organizations/${orgId}/repositories/${repId}/pipelines/PostPipelineToRepository`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(pipelineData)
        });

        if (!response.ok) {
            throw new Error('Put pipeline, Network response was not ok');
        }

        const jsonData = await response.json();

        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data.result.itemIds.pipelineId as string;
                    }
                    await delay(1000);
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
        console.error('Put pipeline, Error fetching data:', error);
        throw error;
    }
}

export async function putExecution(orgId: string, repId: string, pipeId: string) {
    const headers = new Headers({
        "token": sessionStorage.getItem('Token') || ""
    });

    try {
        const response = await fetch(`http://${path}/Organizations/${orgId}/repositories/${repId}/pipelines/${pipeId}/executions/CreatePipelineExecutionInstance`, {
            method: "POST",
            headers: headers
        });

        if (!response.ok) {
            throw new Error('Put execution, Network response was not ok');
        }

        const jsonData = await response.json();

        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data.result.itemIds.executionId as string;
                    }
                    await delay(1000);
                } catch (error) {
                    if (retries === maxRetries - 1) {
                        throw new Error('Max retries reached');
                    }
                }
            }
            throw new Error('Failed to post execution');
        };

        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('Put execution, Error fetching data:', error);
        throw error;
    }
}

export async function putCommandStart(orgId: string, repId: string, pipeId: string, exeId: string) {
    const headers = new Headers({
        "token": sessionStorage.getItem('Token') || ""
    });

    try {
        const response = await fetch(`http://${path}/Organizations/${orgId}/repositories/${repId}/pipelines/${pipeId}/executions/${exeId}/commands/start/PostStartCommand`, {
            method: "POST",
            headers: headers
        });

        if (!response.ok) {
            throw new Error('Put command start, Network response was not ok');
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
                    await delay(1000);
                } catch (error) {
                    if (retries === maxRetries - 1) {
                        throw new Error('Max retries reached');
                    }
                }
            }
            throw new Error('Failed to command start');
        };

        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('Put command start, Error fetching data:', error);
        throw error;
    }
}

export async function putOperator(orgId: string, repId: string, formData: FormData) {
    const headers = new Headers({
        "token": sessionStorage.getItem('Token') || ""
    });

    try {
        const response = await fetch(`http://${path}/Organizations/${orgId}/repositories/${repId}/resources/operators/PostOperatorToRepository`, {
            method: "POST",
            headers: headers,
            body: formData
        });

        if (!response.ok) {
            throw new Error('Put res, Network response was not ok');
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
                    await delay(1000);
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
        console.error('Put res, Error fetching data:', error);
        throw error;
    }
}

export async function PostNewPeer(domainName: string) {
    const headers = new Headers({
        "Content-Type": "application/json",
        "token": sessionStorage.getItem('Token') || ""
    });

    try {
        const response = await fetch(`http://${path}/system/collab-handshake`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ targetPeerDomain: domainName })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();

        var retryNumber = 0;
        const getData = async (ticketId: string): Promise<any> => {
            try {
                const data = await fetchStatus(ticketId);
                if (!data.status && retryNumber < 10) {
                    retryNumber++;
                    return await getData(ticketId);
                } else {
                    return data;
                }
            } catch (error) {
                throw error;
            }
        };

        return await getData(jsonData.ticketId);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}