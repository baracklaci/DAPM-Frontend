const KEY = "redux";
export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;

    // Parse the serialized state from local storage
    const state = JSON.parse(serializedState);

    // Ensure the pipelines array is empty
    if (state.pipelineState && state.pipelineState.pipelines) {
      console.log("LocalPipelines:", state.pipelineState.pipelines);
      state.pipelineState.pipelines = [];
    }

    return state;
  } catch (e) {
    console.error("Error loading state:", e);
    return undefined;
  }
}

export async function saveState(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    // Ignore
  }
}
