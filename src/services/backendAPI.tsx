import { useState } from "react";
import { Stream } from "stream";
import { json } from "stream/consumers";

// TODO: Put these into .env
const vmPath = `dapm1.compute.dtu.dk:5000`;
const localPath = `localhost:5281`;

const path = localPath;
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

export async function fetchStatus(ticket: string) {
    try {
    const response = await fetch(`http://` + path + `/status/${ticket}`, {
      headers,
    });
        if (!response.ok) {
      throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        //console.log(jsonData)
        return jsonData;
    } catch (error) {
    console.error("Error fetching status:", error);
        return error;
    }
}

export async function fetchFile(ticket: string) {

    try {
    const response = await fetch(`http://` + path + `/status/${ticket}`, {
      headers,
    });
        if (!response.ok) {
      throw new Error("Network response was not ok");
        }
        //console.log(jsonData)
        return response;
    } catch (error) {
    console.error("Error fetching status:", error);
        return error;
    }
}


export async function fetchOrganisations() {
    try {
    const response = await fetch(`http://` + path + `/organizations`, {
      headers,
    });
        if (!response.ok) {
      throw new Error("Fetching orgs, Network response was not ok");
        }
        const jsonData = await response.json();

        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
            throw new Error("Max retries reached");
                    }
                }
            }
      throw new Error("Failed to fetch data");
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
    console.error("Fetching orgs, Error fetching data:", error);
        throw error; // Propagate error to the caller
    }
}



export async function fetchOrganisation(orgId: string) {
    try {
    const response = await fetch(`http://` + path + `/Organizations/${orgId}`, {
      headers,
    });
        if (!response.ok) {
      throw new Error("Fetching org, Network response was not ok");
        }
        const jsonData = await response.json();

        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
            throw new Error("Max retries reached");
                    }
                }
            }
      throw new Error("Failed to fetch data");
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
    console.error("Fetching org, Error fetching data:", error);
        throw error; // Propagate error to the caller
    }
}

export async function fetchOrganisationRepositories(orgId: string) {
    try {
    const response = await fetch(
      `http://` + path + `/Organizations/${orgId}/repositories`,
      { headers },
    );
        if (!response.ok) {
      throw new Error("Fecthing reps, Network response was not ok");
        }
        const jsonData = await response.json();

        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
            throw new Error("Max retries reached");
                    }
                }
            }
      throw new Error("Failed to fetch data");
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
    console.error("Fecthing reps, Error fetching data:", error);
        throw error; // Propagate error to the caller
    }
}

export async function fetchRepository(orgId: string, repId: string) {
    try {
    const response = await fetch(
      `http://` + path + `/Organizations/${orgId}/repositories/${repId}`,
      { headers },
    );
        if (!response.ok) {
      throw new Error("Fecthing rep, Network response was not ok");
        }
        const jsonData = await response.json();

        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
            throw new Error("Max retries reached");
                    }
                }
            }
      throw new Error("Failed to fetch data");
        };
        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
    console.error("Fecthing rep, Error fetching data:", error);
        throw error; // Propagate error to the caller
    }
}

export async function fetchRepositoryResources(orgId: string, repId: string) {
    try {
    const response = await fetch(
      `http://` +
        path +
        `/Organizations/${orgId}/repositories/${repId}/resources`,
      { headers },
    );
        if (!response.ok) {
      throw new Error("Fetching resources, Network response was not ok");
        }
        const jsonData = await response.json();

        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

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
            throw new Error("Max retries reached");
                    }
                }
            }
      throw new Error("Failed to fetch data");
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
    console.error("Fetching resources, Error fetching data:", error);
        throw error; // Propagate error to the caller
    }
}

export async function fetchResource(
  orgId: string,
  repId: string,
  resId: string,
) {
    try {
    const response = await fetch(
      `http://` +
        path +
        `/Organizations/${orgId}/repositories/${repId}/resources/${resId}`,
      { headers },
    );
        if (!response.ok) {
      throw new Error("Fetching resource, Feching Network response was not ok");
        }
        const jsonData = await response.json();

        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
            throw new Error("Max retries reached");
                    }
                }
            }
      throw new Error("Failed to fetch data");
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
    console.error("Fetching resource, Error fetching data:", error);
        throw error; // Propagate error to the caller
    }
}

export async function fetchRepositoryPipelines(orgId: string, repId: string) {
    try {
    const response = await fetch(
      `http://` +
        path +
        `/Organizations/${orgId}/repositories/${repId}/pipelines`,
      { headers },
    );
        if (!response.ok) {
      throw new Error("fetching pipelines, Network response was not ok");
        }
        const jsonData = await response.json();

        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
            throw new Error("Max retries reached");
                    }
                }
            }
      throw new Error("Failed to fetch data");
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
    console.error("fetching pipelines, Error fetching data:", error);
        throw error; // Propagate error to the caller
    }
}

/**
 * Author:
 * - Raihanullah Mehran
 *
 * Description:
 * This method fetches the pipelines from the database.
 */
export async function fetchRepositoryPipelineList(orgId: string, repId: string) {
    try {
      const response = await fetch(`http://` + path + `/Organizations/${orgId}/repositories/${repId}/pipeline`, { headers });
      if (!response.ok) {
        throw new Error("fetching pipelines, Network response was not ok");
      }
      const jsonData = await response.json();
  
      return jsonData.result?.pipelines;
    } catch (error) {
      console.error("fetching pipelines, Error fetching data:", error);
      throw error;
    }
  }

export async function fetchPipeline(orgId: string, repId: string, pipId: string) {
    try {
        const response = await fetch(`http://` + path + `/Organizations/${orgId}/repositories/${repId}/pipelines/${pipId}`, { headers });
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


export async function putRepository(orgId: string, repositoryName: string) {
  const headers = new Headers();
  headers.append("accept", "application/json");
  headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
    

    try {
    const response = await fetch(
      `http://` + path + `/Organizations/${orgId}/repositories`,
      {
            method: "POST",
            headers: headers,
        body: JSON.stringify({ name: repositoryName }),
      },
    );

        if (!response.ok) {
      throw new Error("put rep, Network response was not ok");
        }

        const jsonData = await response.json();

        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
            throw new Error("Max retries reached");
                    }
                }
            }
      throw new Error("Failed to fetch data");
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
    console.error("put rep, Error fetching data:", error);
        throw error; // Propagate error to the caller
    }
}

export async function putResource(
  orgId: string,
  repId: string,
  formData: FormData,
) {
  const headers = new Headers();
  headers.append("accept", "application/json");
  // headers.append("Content-Type", "application/json")
    headers.append("Authorization", `Bearer ${token}`);
    try {
    const response = await fetch(
      `http://` +
        path +
        `/Organizations/${orgId}/repositories/${repId}/resources`,
      {
            method: "POST",
            headers,
        body: formData,
      },
    );

        if (!response.ok) {
      throw new Error("put res, Network response was not ok");
        }

        const jsonData = await response.json();

        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
            throw new Error("Max retries reached");
                    }
                }
            }
      throw new Error("Failed to fetch data");
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
    console.error("put res, Error fetching data:", error);
        throw error; // Propagate error to the caller
    }
}

export async function putPipeline(
  orgId: string,
  repId: string,
  pipelineData: any,
) {
  console.log(pipelineData);
    try {
    const response = await fetch(
      `http://${path}/Organizations/${orgId}/repositories/${repId}/pipelines`,
      {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
            },
        body: JSON.stringify(pipelineData),
      },
    );
          
        if (!response.ok) {
      throw new Error("put pipeline, Network response was not ok");
        }

        const jsonData = await response.json();
        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data.result.itemIds.pipelineId as string;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
            throw new Error("Max retries reached");
                    }
                }
            }
      throw new Error("Failed to fetch data");
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
    console.error("put pipeline, Error fetching data:", error);
        throw error; // Propagate error to the caller
    }
}

export async function putExecution(
  orgId: string,
  repId: string,
  pipeId: string,
) {
  const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    try {
    const response = await fetch(
      `http://${path}/Organizations/${orgId}/repositories/${repId}/pipelines/${pipeId}/executions`,
      {
            method: "POST",
        headers,
      },
    );

        if (!response.ok) {
      throw new Error("put execution, Network response was not ok");
        }

        const jsonData = await response.json();

        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
            return data.result.itemIds.executionId as string;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
            throw new Error("Max retries reached");
                    }
                }
            }
      throw new Error("Failed to post execution");
        };

        // Call getData function with the ticketId obtained from putExecution
        return await getData(jsonData.ticketId);
    } catch (error) {
    console.error("put execution, Error fetching data:", error);
        throw error; // Propagate error to the caller
    }
}

export async function putCommandStart(
  orgId: string,
  repId: string,
  pipeId: string,
  exeId: string,
) {
  const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    try {
    const response = await fetch(
      `http://${path}/Organizations/${orgId}/repositories/${repId}/pipelines/${pipeId}/executions/${exeId}/commands/start`,
      {
            method: "POST",
        headers,
      },
    );

        if (!response.ok) {
      throw new Error("put command start, Network response was not ok");
        }

        const jsonData = await response.json();

        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
            throw new Error("Max retries reached");
                    }
                }
            }
      throw new Error("Failed to command start");
        };

        // Call getData function with the ticketId obtained from putExecution
        return await getData(jsonData.ticketId);
    } catch (error) {
    console.error("put command start, Error fetching data:", error);
        throw error; // Propagate error to the caller
    }
}

export async function putOperator(
  orgId: string,
  repId: string,
  formData: FormData,
) {
  const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    try {
    const response = await fetch(
      `http://` +
        path +
        `/Organizations/${orgId}/repositories/${repId}/resources/operators`,
      {
            method: "POST",
            headers,
        body: formData,
      },
    );

        if (!response.ok) {
      throw new Error("put res, Network response was not ok");
        }

        const jsonData = await response.json();

        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

            for (let retries = 0; retries < maxRetries; retries++) {
                try {
                    const data = await fetchStatus(ticketId);
                    if (data.status) {
                        return data;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
            throw new Error("Max retries reached");
                    }
                }
            }
      throw new Error("Failed to fetch data");
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
    console.error("put res, Error fetching data:", error);
        throw error; // Propagate error to the caller
    }
}

export async function PostNewPeer(domainName: string) {
    try {
        const formData = new FormData();
    formData.append("targetPeerDomain", domainName);

        const headers = new Headers();
    headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);

    const response = await fetch(
      `http://` + path + `/system/collab-handshake`,
      {
            method: "POST",
            body: JSON.stringify({ targetPeerDomain: domainName }),
        headers: headers,
      },
    );

        if (!response.ok) {
      throw new Error("Network response was not ok");
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
    console.error("Error fetching data:", error);
        throw error; // Propagate error to the caller
    }
}

export async function downloadResource(
  organizationId: string,
  repositoryId: string,
  resourceId: string,
) {
    try {
    const response = await fetch(
      `http://` +
        path +
        `/organizations/${organizationId}/repositories/${repositoryId}/resources/${resourceId}/file`,
      { headers },
    );
        if (!response.ok) {
      throw new Error("Fetching orgs, Network response was not ok");
        }
        const jsonData = await response.json();

        // Fetch additional data recursively
        const getData = async (ticketId: string): Promise<any> => {
            const maxRetries = 10;
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

            for (let retries = 0; retries < maxRetries; retries++) {
                try {
          const response = (await fetchFile(ticketId)) as any;
          console.log(response);
                    if (response.ok) {
                        await delay(1000);
                        return response;
                    }
                    await delay(1000); // Wait for 1 second before retrying
                } catch (error) {
                    if (retries === maxRetries - 1) {
            throw new Error("Max retries reached");
                    }
                }
            }
      throw new Error("Failed to fetch data");
        };

        // Call getData function with the ticketId obtained from fetchOrganisations
        return await getData(jsonData.ticketId);
    } catch (error) {
    console.error("Fetching orgs, Error fetching data:", error);
        throw error; // Propagate error to the caller
    }
}
// Define the API function to "delete" (update) a resource with a PUT request
//Ayat Al Rifai
export async function deleteResource(orgId: string, repositoryId: string, resourceId: string): Promise<Response> {
   // const headers = new Headers()
   // headers.append("Authorization", `Bearer ${token}`);
    const response01 = (`http://` + path + `/organizations/${orgId}/repositories/${repositoryId}/resources/${resourceId}`);
    try {
        const response = await fetch(response01, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
         /*   body: JSON.stringify({
                isDeleted: true,  
            }),*/
        });

        if (!response.ok) {
            throw new Error(`Failed to mark resource as deleted with id: ${resourceId}`);
        }

        return response; // Returns the response, could also return response.json() if you expect a JSON response
    } catch (error) {
        console.error('Error updating (deleting) resource:', error);
        throw error;
    }
}




