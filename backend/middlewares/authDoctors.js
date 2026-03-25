import jwt from "jsonwebtoken"



const authDoctor = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] || req.headers.dtoken;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Token missing.' })
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { docId: token_decode.id }
        
        next();
    } catch (error) {
        console.error(error)
        res.status(401).json({ success: false, message: error.message })
    }
}

export default authDoctor