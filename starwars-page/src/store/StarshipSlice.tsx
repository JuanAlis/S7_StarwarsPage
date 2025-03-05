import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Film {
    id: number;
    title: string;
    image: string;
}

interface Pilot {
    id: number;
    name: string;
    image: string;
}

interface Starship {
    id: number;
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
    image: string;
    pilots: Pilot[];
    films: Film[];
}

interface StarshipState {
    starships: Starship[];
    loading: boolean;
    nextPage: string | null;
}

const initialState: StarshipState = {
    starships: [],
    loading: false,
    nextPage: "https://swapi.dev/api/starships/?page=1",
};

export const fetchStarships = createAsyncThunk("starships/fetchStarships", async (_, { getState }) => {
    const state = getState() as { starships: StarshipState };

    if (!state.starships.nextPage) return null;

    const response = await fetch(state.starships.nextPage);
    const data = await response.json();

    const starships = await Promise.all(
        data.results.map(async (ship: any) => {
            const id = Number(ship.url.match(/\/starships\/(\d+)\//)[1]);

            const pilots = ship.pilots.length
                ? await Promise.all(
                    ship.pilots.map(async (url: string) => {
                        const pilotId = Number(url.match(/\/people\/(\d+)\//)[1]);
                        const res = await fetch(url);
                        const pilotData = await res.json();
                        return {
                            id: pilotId,
                            name: pilotData.name,
                            image: `https://raw.githubusercontent.com/vieraboschkova/swapi-gallery/refs/heads/main/static/assets/img/people/${pilotId}.jpg`,
                        };
                    })
                )
                : [];

            const films = ship.films.length
                ? await Promise.all(
                    ship.films.map(async (url: string) => {
                        const filmId = Number(url.match(/\/films\/(\d+)\//)[1]);
                        const res = await fetch(url);
                        const filmData = await res.json();
                        return {
                            id: filmId,
                            title: filmData.title,
                            image: `/films/films/${filmId}.jpeg`, // Imagen correcta desde public
                        };
                    })
                )
                : [];

            return {
                id,
                name: ship.name,
                model: ship.model,
                manufacturer: ship.manufacturer || "Desconocido",
                cost_in_credits: ship.cost_in_credits || "Desconocido",
                length: ship.length || "Desconocido",
                max_atmosphering_speed: ship.max_atmosphering_speed || "Desconocido",
                crew: ship.crew || "Desconocido",
                passengers: ship.passengers || "Desconocido",
                cargo_capacity: ship.cargo_capacity || "Desconocido",
                consumables: ship.consumables || "Desconocido",
                hyperdrive_rating: ship.hyperdrive_rating || "Desconocido",
                MGLT: ship.MGLT || "Desconocido",
                starship_class: ship.starship_class || "Desconocido",
                image: `/starships/${id}.jpg`,
                pilots,
                films, 
            };
        })
    );

    return {
        starships,
        nextPage: data.next || null,
    };
});

const starshipSlice = createSlice({
    name: "starships",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStarships.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStarships.fulfilled, (state, action: PayloadAction<{ starships: Starship[]; nextPage: string | null } | null>) => {
                state.loading = false;
                if (action.payload) {
                    state.starships = [...state.starships, ...action.payload.starships];
                    state.nextPage = action.payload.nextPage;
                }
            })
            .addCase(fetchStarships.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default starshipSlice.reducer;
