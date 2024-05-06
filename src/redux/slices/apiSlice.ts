import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiState, Organization, Repository } from "../states/apiState";
import { fetchOrganisations } from "../../services/backendAPI";


export const initialState: ApiState = {
    organizations: [],
    repositories: [{
      organizationId: 1,
      name: "Repository 1",
      id: 1
  },
  {
      organizationId: 1,
      name: "Repository 2",
      id: 2
  },],
    resources: [{
      extension: ".csv",
      id: 1,
      name: "resource 1",
      organizationId: 1,
      repositoryId: 1,
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
            console.log("thunk failed")
          })
      }
    
})

export default apiSlice.reducer 

// Define the return type of the thunk
interface FetchOrganizationsResponse {
  organizations: Organization[]; // Update this type based on your actual organization type
}

// Define the thunk action creator
export const organizationThunk = createAsyncThunk<
  FetchOrganizationsResponse
>("api/fetchOrganizations", async (_, thunkAPI) => {
  try {
    const organizations = await fetchOrganisations(); // Fetch organizations from the backend API
    console.log("FROM THE THUNK")
    console.log(organizations)
    return organizations.result; // Return data fetched from the API
  } catch (error) {
    return thunkAPI.rejectWithValue(error); // Handle error
  }
});