import { configureStore } from '@reduxjs/toolkit';
import starshipReducer from './StarshipSlice';


export const store = configureStore({
    reducer: {
        starships: starshipReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
