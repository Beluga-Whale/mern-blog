import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserByLogin = createAsyncThunk(
    'user/fetchUserByLogin',
    async (
        { email, password }: { email: string; password: string },
        thunkAPI
    ) => {
        try {
            const response = await axios.post('auth/signin', {
                email,
                password,
            });
            return response.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

interface UserState {
    user: any;
    loading: boolean;
    error: any;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: state => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
        subscription: (state, action) => {
            if (state.user.followerUsers.includes(action.payload)) {
                state.user.followerUsers.splice(
                    state.user.followerUsers.findIndex(
                        (channelId: any) => channelId === action.payload
                    ),
                    1
                );
            } else {
                state.user.followerUsers.push(action.payload);
            }
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchUserByLogin.pending, state => {
            state.loading = true;
            state.error = '';
        });
        builder.addCase(
            fetchUserByLogin.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.user = action.payload;
                state.loading = false;
            }
        );
        builder.addCase(
            fetchUserByLogin.rejected,
            (state, action: PayloadAction<any>) => {
                state.error = action.payload;
            }
        );
    },
});

export const { logout, subscription } = userSlice.actions;

export default userSlice.reducer;
