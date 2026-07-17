import { z } from 'zod'

const addToWatchListSchema = z.object({

    
    movieId: z.string().uuid(),
    status: z.enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"],
        {
            error: () => {
                message: "Status must be on of PLANNED WATCHING COMPLETED DROPPED"
            }
        }
    ).optional(),
    //"8"+>8
    rating: z.coerce.number().int("Rating must be an integer").min(1, "must be 1 to 10").max(18).optional(),
    notes: z.string().optional(),

})
export { addToWatchListSchema }
//export ca parametru in  watchlist Routes