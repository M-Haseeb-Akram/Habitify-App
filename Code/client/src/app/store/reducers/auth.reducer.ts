import { User } from "src/app/models/user.model";
import * as AuthActions from "../actions/auth.action";

const user:User = {
    isAuthenticated: false,
    accessToken:"",
    user: {
        user_id:"",
        name: '',
        picture:""
    },
    statusCode: 401
}

export interface AuthState{
  user: User;
}
const initialState: AuthState = {
    user: user,
}

export const AuthReducers = (state:AuthState = initialState, action: AuthActions.All) => {
    switch (action.type) {
    case AuthActions.AuthActionTypes.LOGIN: {
        return {
            state,
            user: action.payload
        };
    }
    case AuthActions.AuthActionTypes.LOGOUT: {
        return {
            state,
            user: action.payload
        }
    }
    default: {
        return state;
    }
    }
}
