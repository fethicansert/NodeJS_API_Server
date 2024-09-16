import allowedOrigins from '../config/allowedOrigins.js';

//We should allow browser to send cookies
//We doing this before coming to cors middleware
//if we don't cors middleware will throw cors error
const credentials = (req, res, next) => {

    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", true);
    };

    next();
}


export default credentials;