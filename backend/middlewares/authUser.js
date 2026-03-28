import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {
        // Better way to get token (supports "Bearer <token>" format)
        const token = req.headers.authorization?.split(' ')[1] || req.headers.token;
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Authorization token missing' 
            });
        }

        
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // SAFER: Attach user info to req.user instead of req.body
        req.user = { 
            userId: token_decode.id 
        };
        
        next();
    } catch (error) {
        
        // More specific error messages
        let message = 'Authentication failed';
        if (error.name === 'JsonWebTokenError') {
            message = 'Invalid token';
        } else if (error.name === 'TokenExpiredError') {
            message = 'Token expired';
        }
        
        res.status(401).json({ 
            success: false, 
            message 
        });
    }
};

export default authUser;