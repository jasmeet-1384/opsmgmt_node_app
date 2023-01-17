import { UserModel } from "../models/userModel.js";
import Validator from "validatorjs";
import { failed, firstError, success } from "../utils/reply.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";
import sendMail from "../mail/sendMail.js";

// Register
async function register(req, res) {
  let request = req.body;

  let validation = new Validator(request, {
    name: "required|min:3",
    email: "required|email",
    password: "required|min:8",
  });

  if (validation.fails()) {
    return res.json(failed(firstError(validation)));
  }

  let user_exists = await UserModel.findOne({
    where: {
      email: request.email,
      name: request.name
    },
  });

  if (user_exists) {
    return res.json(failed("User Already Exists"));
  }

  let hashedPassword = await bcrypt.hashSync(request.password, 10);

  request.password = hashedPassword;

  let user = await UserModel.create(request);
  await sendMail.send(request.email, `Dear ${request.name} Your Account Created Successfully! Your Account will be Activated within 24hrs. `)

  return res.json(success("User Register Successfully", user));
}

// Login

async function login(req, res) {
  let request = req.body;

  let validation = new Validator(request, {
    email: "required|email",
    password: "required",
  });

  if (validation.fails()) {
    return res.json(failed(firstError(validation)));
  }

  let user_exists = await UserModel.findOne({
    where: {
      email: request.email,
    },
    raw: true,
  });

  if (!user_exists) {
    return res.json(failed("Invalid Credentials"));
  }

  let isPasswordVerify = await bcrypt.compareSync(
    request.password,
    user_exists.password
  );

  if (!isPasswordVerify) {
    return res.json(failed("Invalid Credentials"));
  }

  if (!user_exists.active_status) {
    return res.json(failed("Account not activated yet!"));
  }

  // gennnerate Token Here

  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 7,
    userId: user_exists.id,
  };

  const token = jwt.sign(data, jwtSecretKey);

  let response = _.omit(user_exists, [
    "password",
    "gmail_id",
    "createdAt",
    "updatedAt",
  ]);

  response["token"] = token;

  return res.json(success("user login successfully", response));
}

export default {
  register,
  login,
};
