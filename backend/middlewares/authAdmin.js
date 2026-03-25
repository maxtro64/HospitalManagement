import jwt from "jsonwebtoken"



const authAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] || req.headers.atoken;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Token missing.' })
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Invalid token.' })
        }

        next();
    } catch (error) {
        console.error(error)
        res.status(401).json({ success: false, message: error.message })
    }
}

export default authAdmin