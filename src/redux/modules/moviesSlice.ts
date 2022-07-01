import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVideo } from "../../interfaces/Movies";

// Define a type for the slice state
interface ItemState {
  keySearch: string;
  page: number;
  data: IVideo[];
}

interface MoviesState {
  [type: string]: ItemState;
}

// Define the initial state using that type
const initialState: MoviesState = {};

export const moviesSlice = createSlice({
  name: "movies",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateData: (state: MoviesState, action: PayloadAction<{ type: string; data: ItemState }>) => {
      state[action.payload.type] = action.payload.data;
    },
  },
});

export const { updateData } = moviesSlice.actions;

export default moviesSlice.reducer;
