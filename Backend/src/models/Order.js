import mongoose, { Schema } from "mongoose";

const OrderSchema = new mongoose.Schema({
  items: [{
    type: [Schema.Types.Mixed],
    required: true,
  }],
  
  totalAmount: {
    type: Number
  },
  paymentIntentClientSecret: {
    type: String,
  },
  totalItems: {
    type: Number
  },
  user: {
    type: Schema.Types.ObjectId,
    ref:'User',
    required: true,
  },
  
  paymentMethod: {
    type: String,
    enum : ['cash','card'] ,
    default: 'cash',
    required: true,
  },
  status: {
    type: String,
    enum:[
        'pending',
        'confirmed',
        'delivered',
        'cancelled'
    ],
    default: 'pending',
    
  },
  selectedAdress: {
    type: Schema.Types.Mixed,
    required: true,
  }
});

const virtual = OrderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
OrderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
const Order = mongoose.model("Order", OrderSchema);

export default Order;
