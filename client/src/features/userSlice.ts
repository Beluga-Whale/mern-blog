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
    user: null;
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
    reducers: {},
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

export const {} = userSlice.actions;

export default userSlice.reducer;
