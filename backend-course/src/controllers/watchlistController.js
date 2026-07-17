import { prisma } from "../config/db.js"

const addToWatchList = async (req, res) => {
    const { movieId, status, rating, notes } = req.body

    const movie = await prisma.movie.findUnique({
        where: { id: movieId }
    })
    if (!movie) {
        return res.status(404), json({ error: "movie not found" })
    }
    const existingInWatchList = await prisma.movie.findUnique({
        where: {
            userId_movieId: {
                userId: req.user.id,
                movieId: movieId,
            },
        },
    })

    if (existingInWatchList) {
        return res.status(400), json({ error: "movie alredy in the watch list" })
    }

    const watchlistItem = await prisma.watchlistItem.create({
        date:{
            userId:req.user.id,
            movieId,
            status: status||"PLANNED",
            rating,
            notes
        }
    })
    res.status(200).json({
        status:"Succes",
        data:{
            watchlistItem
        }
    })
}       

export {addToWatchList}