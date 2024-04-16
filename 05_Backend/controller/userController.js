const User = require('../models/user');
const TokenBlacklist = require('../models/tokenBlacklist');
const auth = require('../auth');
const { authCookie } = require('../config');
const Product = require('../models/product');
const Bid = require('../models/bid');

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('invalid username or password');
    }

    const match = await user.matchPassword(password);

    if (!match) {
      throw new Error('invalid username or password');
    }

    res.cookie('auth-cookie', auth.generateAuthToken(user._id));
    res.json({ _id: user._id, email: user.email });
  } catch (error) {
    next(error);
  }
}

async function register(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.create({ email, password });

    res.json({ _id: user._id, email: user.email });
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(422).send({ errors: ['User already exists'] });
    }
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    const token = req.cookies[authCookie];
    await TokenBlacklist.create({ token });

    res.clearCookie('auth-cookie').json({ logout: true });
  } catch (error) {
    next(error);
  }
}

async function profile(req, res, next) {
  try {
    const { userId = null } = req.params;
    const result = { user: {} };

    const creator = { creator: userId || req.user._id };
    const userPromise = userId ? User.findById(userId) : Promise.resolve(req.user);

    const [bids, products, user] = await Promise.all([
      Bid.find(creator).populate('product').sort({ priceValue: -1 }),
      Product.find(creator),
      userPromise
    ]);

    result.products = await Promise.all(products.map(async (product) => {
      const latestBid = await Bid.findOne({ product: product.id }).sort({ priceValue: -1 });
      const priceValue = latestBid ? latestBid.priceValue : product.startPrice;
      return { ...product._doc, priceValue };
    }));

    result.bids = bids;
    result.user.email = user.email;
    result.user._id = user._id;
    result.isUserProfile = userId === null;

    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  register,
  logout,
  profile
};
