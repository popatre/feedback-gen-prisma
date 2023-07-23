// import { addPlanet } from "../../models/planets";
// import { fetchPlanets, fetchSinglePlanet } from "../../models/planets";
// import { publicProcedure, router } from "../trpc";
// import { z } from "zod";

// export const planetRouter = router({
//     getAllPlanets: publicProcedure.query(() => fetchPlanets()),
//     getPlanetById: publicProcedure
//         .input(z.number())
//         .query(({ input }) => fetchSinglePlanet(input)),
//     postPlanet: publicProcedure
//         .input(
//             z.object({
//                 planet_name: z.string(),
//                 img: z.string().nullable(),
//                 type: z.string(),
//                 au_from_sun: z.string(),
//                 mean_diameter_miles: z.number().nullable(),
//                 fun_fact: z.string().nullable(),
//                 mean_temp_c: z.number().nullable(),
//             })
//         )
//         .mutation((req) => {
//             return addPlanet(req.input);
//         }),
// });

// export type PlanetRouter = typeof planetRouter;
