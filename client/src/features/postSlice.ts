import { createSlice } from '@reduxjs/toolkit';

interface postState {
    posts: any;
    loading: boolean;
    error: any;
}

const initialState: postState = {
    posts: null,
    loading: false,
    error: null,
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
});

export const {} = postSlice.actions;
export default postSlice.reducer;
