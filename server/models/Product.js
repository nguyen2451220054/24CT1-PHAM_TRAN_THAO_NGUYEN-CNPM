import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng nhập tên sản phẩm sữa'],
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ['fresh', 'nut', 'yogurt', 'baby'],
      default: 'fresh'
    },
    price: {
      type: Number,
      required: [true, 'Vui lòng nhập giá sản phẩm'],
      min: 0
    },
    originalPrice: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 1,
      max: 5
    },
    reviewsCount: {
      type: Number,
      default: 0
    },
    volume: {
      type: String,
      default: '900ml'
    },
    badge: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    ingredients: {
      type: String,
      default: ''
    },
    origin: {
      type: String,
      default: ''
    },
    expiry: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

export const Product = mongoose.model('Product', productSchema);
