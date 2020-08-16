import { store } from './store';

export const reducer = (state = store, action) => {
    switch (action.type) {
        case "FetchCountries":
            debugger;
            state = { ...state, countryList: action.payload }
            break;
        case "privilegeFlag":
            state = { ...state, privilege: action.payload }
            break;
        // case "currentCountriesToView":
        //     state = { ...state, noOfItems: action.payload }
        //     break;
    }
    return state;
}