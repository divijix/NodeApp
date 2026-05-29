export async function errorMiddleware(err, req, res, next) {
    console.log(`Error recived---> ${err}`);
    return res.status(500).json({message: "Internal server error"});
}