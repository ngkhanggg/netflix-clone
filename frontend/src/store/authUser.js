import axios from 'axios';
import toast from 'react-hot-toast';
import {create} from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isSigningOut: false,
    isSigningIn: true,

    signup: async(credentials) => {
        set({isSigningUp: true});
        try {
            const response = await axios.post("/api/v1/auth/signup", credentials);
            set({user: response.data.user, isSigningUp: false});
            toast.success("Signed up successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Sign up failed");
            set({isSigningUp: false, user: null});
        }
    },

    signin: async(credentials) => {
        set({isSigningIn: true});
        try {
            const response = await axios.post("/api/v1/auth/signin", credentials);
            set({user: response.data.user, isSigningIn: false});
        } catch (error) {
            set({isSigningIn: false, user: null});
            toast.error(error.response.data.message || "Sign in failed");
        }
    },

    signout: async () => {
		set({ isSigningOut: true });
		try {
			await axios.post("/api/v1/auth/signout");
			set({ user: null, isSigningOut: false });
			toast.success("Signed out successfully");
		} catch (error) {
            set({ isSigningOut: false });
			toast.error(error.response.data.message || "Sign out failed");
		}
	},

    authCheck: async() => {
        set({isCheckingAuth: true});
        try {
            const response = await axios.get("/api/v1/auth/authCheck");
            set({user: response.data.user, isCheckingAuth: false});
        } catch (error) {
            set({isCheckingAuth: false, user: null});
        }
    },
}));
