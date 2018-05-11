import {Hero} from "../commons/hero";


export function heroesReducer(state: Hero[] = [], action: any) {
    switch (action.type) {
        case 'ADD_ALL':
            state = action.payload;
           return state;
        case 'ADD_ONE':
            state.push(action.payload);
           return state;
        default:
            return state;
    }
}