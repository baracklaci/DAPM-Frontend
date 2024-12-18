import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiState, Organization, Repository, Resource } from "../states/apiState";
import { fetchOrganisationRepositories, fetchOrganisations, fetchRepository, fetchRepositoryResources } from "../../services/backendAPI";
import { useAppSelector } from "../../hooks";
import { getOrganizations } from "../selectors/apiSelector";

export const initialState: ApiState = {
    organizations: [],
    repositories: [{
      organizationId: "",
      name: "Repository 1",
      id: ""
  },
  {
      organizationId: "",
      name: "Repository 2",
      id: ""
  },],
    resources: [{
      id: "",
      name: "resource 1",
      organizationId: "",
      repositoryId: "",
      type: "eventLog"
  },]
  }

const apiSlice = createSlice({
    name: 'api',
    initialState: initialState,
    reducers: {},
      extraReducers(builder) {
        builder
          .addCase(organizationThunk.pending, (state, action) => {
          })
          .addCase(organizationThunk.fulfilled, (state, action) => {
            // Add any fetched posts to the array
            state.organizations = action.payload.organizations
          })
          .addCase(organizationThunk.rejected, (state, action) => {
            console.log("org thunk failed")
          })
          .addCase(repositoryThunk.pending, (state, action) => {
          })
          .addCase(repositoryThunk.fulfilled, (state, action) => {
            // Add any fetched posts to the array
            state.repositories = action.payload
          })
          .addCase(repositoryThunk.rejected, (state, action) => {
            console.log("repo thunk failed")
          })
          .addCase(resourceThunk.pending, (state, action) => {
          })
          .addCase(resourceThunk.fulfilled, (state, action) => {
            // Add any fetched posts to the array
            state.resources = action.payload
          })
          .addCase(resourceThunk.rejected, (state, action) => {
            console.log("resorce thunk failed")
          })
      }
    
})

export default apiSlice.reducer 

// Define the return type of the thunk
interface FetchOrganizationsResponse {
  organizations: Organization[]; // Update this type based on your actual organization type
}

interface FetchRepositoriesResponse {
  repositories: Repository[]; // Update this type based on your actual organization type
}

// Define the thunk action creator
export const organizationThunk = createAsyncThunk<
  FetchOrganizationsResponse
>("api/fetchOrganizations", async (_, thunkAPI) => {
  try {
    const organizations = await fetchOrganisations(); // Fetch organizations from the backend API
    return organizations.result; // Return data fetched from the API
  } catch (error) {
    return thunkAPI.rejectWithValue(error); // Handle error
  }
});

export const repositoryThunk = createAsyncThunk<
  Repository[],
  Organization[]
>("api/fetchRespositories", async (organizations: Organization[], thunkAPI) => {
  try {
    
    const repositories = [];
      for (const organization of organizations) {
        const repos = await fetchOrganisationRepositories(organization.id);
        repositories.push(...repos.result.repositories);
      }
      return repositories;
  } catch (error) {
    return thunkAPI.rejectWithValue(error); // Handle error
  }
});

export const resourceThunk = createAsyncThunk<
  Resource[],
  { organizations: Organization[]; repositories: Repository[] }
>("api/fetchResources", async ({organizations, repositories}, thunkAPI) => {
  try {
    
    const resources: Resource[] = [];
    for (const org of organizations) {
      for (const repo of repositories) {
        if (org.id === repo.organizationId) {
          const res = await fetchRepositoryResources(org.id, repo.id);
          resources.push(...res.result.resources);
        }
      }
    }
    const result = await Promise.all(resources)
      return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error); // Handle error
  }
});


