const { ACCESS_DENIED, BOOL_FALSE, CODE_400, CODE_401, INVLD_TOKEN, CODE_404 } = require("../utils/translations");
const ApiError = require("../errors/ApiError");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  let token = req.header('authorization');
  token = token.replace("Bearer ", "").trim();
  console.log("token", token);

  // Next
  if (!token) return res.status(CODE_401).json(new ApiError(ACCESS_DENIED, CODE_401, BOOL_FALSE));

  try {
    console.log("jwtsecret", process.env.JWT_SECRET)
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verified", verified)
    req.user = verified;
    if (req.user === verified) {
      console.log("true");
      console.log(req.user.userId)

    } else {
      console.log("false");

    }
    next();
  } catch (error) {
    console.log("error", error)
    res.status(CODE_400).json(new ApiError(INVLD_TOKEN, CODE_400, BOOL_FALSE))
  }


}

module.exports = authenticateToken;








