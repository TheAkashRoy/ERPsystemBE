const verifyToken = (req, res, next) => {
    //   const token = req.headers.authorization;
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);
    console.log(users);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        req.user = decoded;
        next();
    });
};

module.exports = {verifyToken}