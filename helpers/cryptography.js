import crypto from "crypto";

const SECRET = "AUTH-API";

export const authentication = (salt, password) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

export const random = () => crypto.randomBytes(128).toString("base64");
