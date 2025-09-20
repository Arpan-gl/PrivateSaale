import {createSlice} from "@reduxjs/toolkit";

interface User {
    email: string;
    username: string;
    role: 'user' | 'lawyer' | 'admin';
    _id: string;
    isActive?: boolean;
    createdAt?: string;
    lastLogin?: string;
    lawyerProfile?: {
        isVerified: boolean;
        verificationStatus: 'pending' | 'approved' | 'rejected';
        applicationDate: string;
    };
}

const initialState = {
    user: null as User | null,
    isLogin: false,
    isDemoMode: false
}

export const isLoginSlice = createSlice({
    name:"isLogin",
    initialState,
    reducers:{
        login(state, action){
            state.user = action.payload.user;
            state.isLogin = true;
            state.isDemoMode = action.payload.isDemoMode || false;
        },
        logout(state){
            state.user = null;
            state.isLogin = false;
            state.isDemoMode = false;
        },
        updateUser(state, action) {
            state.user = { ...state.user, ...action.payload };
        },
        setDemoMode(state, action) {
            state.isDemoMode = action.payload;
        }
    }
});

export const {login, logout, updateUser, setDemoMode} = isLoginSlice.actions;
export default isLoginSlice.reducer;