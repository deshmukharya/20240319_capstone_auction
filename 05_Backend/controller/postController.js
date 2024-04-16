const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const Product = require('../models/product');
const Bid = require('../models/bid');
const Comment = require('../models/comment');
const { getUserId } = require('../auth');
const { latestProductCount } = require('../config');

async function createProduct(req, res, next) {
  try {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        throw new Error(err.message);
      }

      const { image } = files;

      const product = {
        title: fields.title,
        description: fields.description,
        endTime: fields.endTime,
        startPrice: fields.startPrice,
        creator: getUserId(req)
      };

      const newProduct = await Product.create(product);

      const newPath = path.resolve('public/images', `${newProduct._id.toString()}.png`);
      fs.rename(image.path, newPath, (err) => {
        if (err) {
          throw new Error(err.message);
        }
      });

      res.json(newProduct);
    });
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const id = req.productId;
    await Product.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}

async function editProduct(req, res, next) {
  try {
    const id = req.productId;
    const { title = '', description = '' } = req.body;
    const product = await Product.findByIdAndUpdate(id, { $set: { title, description } }, { new: true });
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function latest(req, res, next) {
  try {
    const products = await Product.find().sort({ createTime: -1 }).limit(latestProductCount);
    res.json(products);
  } catch (error) {
    next(error);
  }
}

async function allProducts(req, res, next) {
  try {
    const { skip, take, sort = 0 } = req.query;
    const sortMapping = [{ likes: -1 }, { createTime: -1 }];
    const products = await Product.find({}).sort(sortMapping[sort]).skip(Number(skip)).limit(Number(take));
    res.json(products);
  } catch (error) {
    next(error);
  }
}

async function details(req, res, next) {
  try {
    const product = req.product.toObject();
    const isOwner = product.creator._id.toString() === getUserId(req);
    product.isOwner = isOwner;
    product.bids = [];
    const bids = await Bid.find({ product: product._id.toString() }).sort({ priceValue: -1 }).populate('creator', ['-password', '-__v']);
    product.priceValue = (bids[0] || {}).priceValue;
    if (isOwner) {
      product.bids = bids;
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function addBid(req, res, next) {
  try {
    const productId = req.productId;
    const bid = await Bid.findOne({ product: productId.toString() }).sort({ priceValue: -1 });
    const latestPriceValue = bid ? bid.priceValue : req.product.startPrice;
    if (req.body.priceValue <= latestPriceValue) {
      throw new Error('bid priceValue must be larger than current product price');
    }
    const newBid = await Bid.create({
      priceValue: Number(req.body.priceValue),
      creator: getUserId(req),
      product: productId
    });
    res.json(newBid);
  } catch (error) {
    next(error);
  }
}

async function getProductsCount(req, res, next) {
  try {
    const count = await Product.countDocuments({});
    res.json({ count });
  } catch (error) {
    next(error);
  }
}

async function createComment(req, res, next) {
  try {
    const { product } = req;
    const { comment } = req.body;
    const newComment = await Comment.create({ body: comment, creator: getUserId(req) });
    product.comments.push(newComment._id);
    await product.save();
    res.json(newComment);
  } catch (error) {
    next(error);
  }
}

async function like(req, res, next) {
  try {
    const { product } = req;
    if (product.likes.includes(getUserId(req))) {
      throw new Error('user already liked');
    }
    product.likes.push(getUserId(req));
    await product.save();
    res.json(product);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  editProduct,
  latest,
  allProducts,
  details,
  addBid,
  getProductsCount,
  createComment,
  like
};


