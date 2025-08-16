const jwt = require('jsonwebtoken');

// Authentication middleware
module.exports = (req, res, next) => {
  // Get the Authorization header from the incoming request
  const authHeader = req.get('Authorization');
  console.log('Authorization header:', authHeader); // For debugging

  // If there's no Authorization header, mark the request as unauthenticated
  if (!authHeader) {
    req.isAuth = false;
    return next(); // Proceed to next middleware/handler
  }

  // The token is usually in the format: "Bearer <token>", so split it
  const token = authHeader.split(' ')[1];
  console.log('Extracted token:', token); // For debugging

  // If no token is found or it's an empty string, mark as unauthenticated
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }

  try {
    // Verify and decode the token using the secret key
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decodedToken); // For debugging

    // If the token doesn't decode properly, mark as unauthenticated
    if (!decodedToken) {
      req.isAuth = false;
      return next();
    }

    // Token is valid, mark as authenticated and attach user ID to the request
    req.isAuth = true;
    req.userId = decodedToken.id;
    next(); // Proceed to next middleware or route
  } catch (err) {
    // If token verification fails (e.g., invalid/expired token), log error and mark as unauthenticated
    console.log('JWT verify error:', err.message);
    req.isAuth = false;
    next();
  }
};
