import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Pilot {
    id: number;
    name: string;
}

interface PilotsState {
    pilots: Pilot[];
    loading: boolean;
    error: string | null;
}

const initialState: PilotsState = {
    pilots: [],
    loading: false,
    error: null,
};

export const fetchPilots = createAsyncThunk<Pilot[], string[]>(
    "pilots/fetchPilots",
    async (pilotUrls, { rejectWithValue }) => {
        try {
            const requests = pilotUrls.map(async (url) => {
                const id = url.split("/").filter(Boolean).pop(); // Extraer el ID de la URL
                const response = await fetch(url);
                const data = await response.json();
                return { id: Number(id), name: data.name };
            });

            return await Promise.all(requests);
        } catch (error) {
            return rejectWithValue("Error al obtener los pilotos");
        }
    }
);

const pilotsSlice = createSlice({
    name: "pilots",
    initialState,
    reducers: {
        clearPilots: (state) => {
            state.pilots = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPilots.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPilots.fulfilled, (state, action) => {
                state.loading = false;
                state.pilots = action.payload;
            })
            .addCase(fetchPilots.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearPilots } = pilotsSlice.actions;
export default pilotsSlice.reducer;
