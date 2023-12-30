import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const tokenHeader = req.headers.authorization;
        let decodedData;

        if (tokenHeader) {
            const token = tokenHeader.split(" ")[1];
            decodedData = jwt.verify(token, process.env.SECRET_KEY || 'aos-secret-key');
            req.userId = decodedData?.id;
            next();  // Call next() only if the token is valid
        } else {
            console.error('Authorization header missing');  // Log the error for debugging purposes
            res.status(401).json({ message: 'Unauthorized: Missing Authorization header' });
        }
    } catch (error) {
        console.error(error);  // Log the error for debugging purposes
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default auth;
