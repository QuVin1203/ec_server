import Gift from "../model/Gift.js";
import User from "../model/User.js";

const getAllUser = async (req, res) => {
  const users = await User.find();
  return res.status(200).send(users);
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json("User not found");
    }
    const deleteUser = await User.deleteOne({ _id: user._id });
    res.status(200).json("Delete Successfully");
  } catch (error) {}
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const existingUser = await User.findById(id);
    if (!existingUser) {
      res.status(404).json("User not found");
    }
    const updateUser = await User.updateOne({ _id: id }, updateData);
    res.status(201).json(existingUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
const exchangeGift = async (req, res) => {
  const { userId, giftId } = req.query;
  try {
    const user = await User.findById(userId);
    const gift = await Gift.findById(giftId);

    if (!user || !gift) {
      return res.status(404).json("User or Gift not found");
    }
    if (user.point < gift.price) {
      return res.status(404).json("Không đủ điểm để đổi quà");
    }
    user.point -= gift.price;
    user.spent += gift.price;
    user.purchasedGifts.push(gift);

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getAllUser, deleteUser, updateUser, exchangeGift };
