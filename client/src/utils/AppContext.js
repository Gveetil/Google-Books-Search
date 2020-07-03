import React, { useReducer, useContext } from "react";

// Enum of Action keys supported by this context  
const AppContextAction = {
    SHOW_DIALOG: "SHOW_DIALOG", // show / close the dialog
    LOADING: "LOADING",         // set the loading message
    LOADING_COMPLETED: "LOADING_COMPLETED",    // turn off the loading message
    UPDATE_SEARCH_QUERY: "UPDATE_SEARCH_QUERY", // Update search query
    SUCCESS_TOAST: "SUCCESS_TOAST",             // Set / unset the success toast message
}
const AppContext = React.createContext();
const { Provider } = AppContext;

// Reducer to make changes to the application context state
const reducer = (state, action) => {
    switch (action.type) {
        case AppContextAction.SHOW_DIALOG: {
            const message = action.show ? action.message : "";
            return {
                ...state,
                loading: false,
                dialog: {
                    show: action.show,
                    message
                }
            }
        }
        case AppContextAction.LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        case AppContextAction.LOADING_COMPLETED: {
            return {
                ...state,
                loading: false,
            }
        }
        case AppContextAction.UPDATE_SEARCH_QUERY: {
            return {
                ...state,
                searchQuery: action.query,
            }
        }
        case AppContextAction.SUCCESS_TOAST: {
            return {
                ...state,
                successMessage: action.toast,
            }
        }
        default:
            return state;
    }
};

// Returns the Provider to be used when using the application context 
const AppProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
        dialog: {
            show: false,
            message: "",
        },
        searchQuery: "",
        loading: false,
    });
    return <Provider value={[state, dispatch]} {...props} />;
};

// Returns the application context 
const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useAppContext, AppContextAction };
