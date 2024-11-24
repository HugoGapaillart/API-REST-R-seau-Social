export const errMiddle = async (error, req, res, next) => {
    if (error) {
        res.status(error.status ?? 500).json({ mess: error.message ?? "erreur inconnue" })
    } else {
        next()
    }
}