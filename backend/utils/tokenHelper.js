import jwt from "jsonwebtoken";

const tokenHelper = (() => {
  const createToken = (id, email) => {
    const token = jwt.sign({ id, email }, process.env.TOKEN_KEY, {
      // expiresIn: "24h",
    });
    return token;
  };

  return {
    createToken: createToken,
  };
})();

export default tokenHelper;
