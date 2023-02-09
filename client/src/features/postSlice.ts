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
    reducers: {
        like: (state, action) => {
            if (!state.posts?.likes?.includes(action.payload)) {
                state.posts?.likes?.push(action.payload);
                state.posts?.dislikes?.splice(
                    state.posts?.dislikes?.findIndex(
                        (userId: any) => userId === action.payload
                    ),
                    1
                );
            }
        },
    },
});

export const { like } = postSlice.actions;
export default postSlice.reducer;
