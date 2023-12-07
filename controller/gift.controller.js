import Gift from "../model/Gift.js";
import User from "../model/User.js";

const createGift = async (req, res) => {
  const newGift = new Gift({
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price,
  });
  try {
    const gift = await newGift.save();
    res.status(201).json(gift);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getGift = async (req, res) => {
  const gifts = await Gift.find();
  return res.status(200).json(gifts);
};
const getGiftById = async (req, res) => {
  const { id } = req.params;
  try {
    const topic = await Gift.findById(id);
    if (!topic) {
      res.status(404).json("Gift not found");
    }
    res.status(200).json(topic);
  } catch (error) {
    res.json(error);
  }
};
const getGiftByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("purchasedGifts");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const gifts = user.purchasedGifts;
    res.json(gifts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateGift = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const existingGift = await Gift.findById(id);
    if (!existingGift) {
      res.status(404).json("Topic not found");
    }

    const updateGift = await Gift.updateOne({ _id: id }, updateData);
    res.status(201).json(updateGift);
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteGift = async (req, res) => {
  try {
    const gift = await Gift.findOne({ _id: req.params.id });

    if (!gift) {
      res.status(400).json("Gift not found");
    }

    const deleteGift = await Gift.deleteOne({ _id: gift._id });
    res.status(200).json("Delete Successfully");
  } catch (error) {}
};
export {
  createGift,
  getGift,
  getGiftById,
  getGiftByUser,
  updateGift,
  deleteGift,
};
