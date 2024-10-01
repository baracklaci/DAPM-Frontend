// const path = `se2-e.compute.dtu.dk`
const path = `http://localhost:5000`;

const get = async (endpoint: string) => {
    try {
        const response = await fetch(`${path}${endpoint}`);
        if (!response.ok) return;

        return await response.json();
    } catch (e) {
        console.error(`Error fetching data from ${endpoint}: `, e);
    }
};

const post = async (endpoint: string, body?: any) => {
    try {
        const response = await fetch(`${path}${endpoint}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        if (!response.ok) return;

        return await response.json();
    } catch (e) {
        console.error(`Error posting data to ${endpoint}: `, e);
    }
};

export const useBackendAPI = () => {
    const PostNewPeer = async (domainName: string) => {
        return await post(`/system/collab-handshake`, { targetPeerDomain: domainName });
    };

    const fetchStatus = async (ticket: string) => {
        return await get(`/status/${ticket}`);
    };

    const fetchOrganisations = async () => {
        return await get(`/Organizations`);
    };

    const fetchOrganisation = async (orgId: string) => {
        return await get(`/Organizations/${orgId}`);
    };

    const fetchOrganisationRepositories = async (orgId: string) => {
        return await get(`/Organizations/${orgId}/repositories`);
    };

    const fetchRepository = async (orgId: string, repId: string) => {
        return await get(`/Organizations/${orgId}/repositories/${repId}`);
    };

    const fetchRepositoryResources = async (orgId: string, repId: string) => {
        return await get(`/Organizations/${orgId}/repositories/${repId}/resources`);
    };

    const fetchResource = async (orgId: string, repId: string, resId: string) => {
        return await get(`/Organizations/${orgId}/repositories/${repId}/resources/${resId}`);
    };

    const fetchRepositoryPipelines = async (orgId: string, repId: string) => {
        return await get(`/Organizations/${orgId}/repositories/${repId}/pipelines`);
    };

    const fetchPipeline = async (orgId: string, repId: string, pipId: string) => {
        return await get(`/Organizations/${orgId}/repositories/${repId}/pipelines/${pipId}`);
    };

    const createRepository = async (orgId: string, repositoryName: string) => {
        return await post(`/Organizations/${orgId}/repositories`, { name: repositoryName });
    };

    const createResource = async (orgId: string, repId: string, formData: FormData) => {
        return await post(`/Organizations/${orgId}/repositories/${repId}/resources`, formData);
    };

    const createPipeline = async (orgId: string, repId: string, pipelineData: any) => {
        return await post(`/Organizations/${orgId}/repositories/${repId}/pipelines`, pipelineData);
    };

    const createExecution = async (orgId: string, repId: string, pipeId: string) => {
        return await post(`/Organizations/${orgId}/repositories/${repId}/pipelines/${pipeId}/executions`);
    };

    const createCommandStart = async (orgId: string, repId: string, pipeId: string, exeId: string) => {
        return await post(`/Organizations/${orgId}/repositories/${repId}/pipelines/${pipeId}/executions/${exeId}/commands/start`);
    };

    const createOperator = async (orgId: string, repId: string, formData: FormData) => {
        return await post(`/Organizations/${orgId}/repositories/${repId}/resources/operators`, formData);
    };

    const downloadResource = async (orgId: string, repId: string, resId: string) => {
        return await get(`/Organizations/${orgId}/repositories/${repId}/resources/${resId}/file`);
    };

    return {
        PostNewPeer,
        fetchStatus,
        fetchOrganisations,
        fetchOrganisation,
        fetchOrganisationRepositories,
        fetchRepository,
        fetchRepositoryResources,
        fetchResource,
        fetchRepositoryPipelines,
        fetchPipeline,
        createRepository,
        createResource,
        createPipeline,
        createExecution,
        createCommandStart,
        createOperator,
        downloadResource
    };
};