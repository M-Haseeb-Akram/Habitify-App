const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const loginController = (req, res) => {
    try {
        const token = jwt.sign({id: req.user._id}, process.env.PORT, {
            expiresIn: '1h',
        });
        res.cookie(
            'user',
            JSON.stringify({
                user: {
                    user_id: req.user._id,
                    name: req.user.Name,
                    picture: req.user.picture,
                },
                accessToken: `Bearer ${token}`,
                statusCode: 200,
            }),
            {maxAge: 3600000},
        );
        res.redirect(process.env.SERVER_URL+'/journal/all-habits');
    } catch (error) {
        res.status(400).json({
            message: 'Authentication failed',
            statusCode: 400,
        });
        res.cookie(
            'error',
            JSON.stringify({
                message: 'Authentication failed',
                statusCode: 400,
            }),
            {maxAge: 360000},
        );
        res.redirect(process.env.SERVER_URL);
    }
};

module.exports = {loginController};
