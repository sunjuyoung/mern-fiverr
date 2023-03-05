import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import createError from "../utils/createError.js";

export const getMessage = async (req, res, next) => {
  try {
    const message = await Message.find({ conversationId: req.params.id });
    res.status(200).send(message);
  } catch (error) {
    next(createError(error));
  }
};

export const createMessage = async (req, res, next) => {
  const newMessage = Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });
  try {
    const saveMessage = await newMessage.save();
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );

    res.status(201).send(saveMessage);
  } catch (error) {
    next(createError(error));
  }
};
