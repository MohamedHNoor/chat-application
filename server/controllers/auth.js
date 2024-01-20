const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');

require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (req, res) => {
  try {
    // data from frontend
    const { fullName, username, password, phoneNumber } = req.body;

    // create userID
    const userId = crypto.randomBytes(16).toString('hex');

    // connect to client
    const serverClient = connect(api_key, api_secret, app_id);

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user token
    const token = serverClient.createUserToken(userId);

    // send data to frontend
    res
      .status(200)
      .json({ token, fullName, username, userId, hashedPassword, phoneNumber });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  try {
    // data from frontend
    const { username, password } = req.body;

    // connect to client
    const serverClient = connect(api_key, api_secret, app_id);
    const client = StreamChat.getInstance(api_key, api_secret);

    const response = await client.queryUsers({ name: username });
    const users = response.users || [];

    if (!Array.isArray(users) || users.length === 0)
      return res.status(400).json({ message: 'User not found' });

    const success = await bcrypt.compare(password, users[0].hashedPassword);
    const token = serverClient.createUserToken(users[0].id);

    if (success) {
      res.status(200).json({
        token,
        fullName: users[0].fullName,
        username,
        userId: users[0].id,
      });
    } else {
      res.status(500).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login };
