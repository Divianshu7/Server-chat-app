import Message from "../model/Message"

export const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body
        const data = await Message.create({
            message: {
                text: message
            },
            users: [from, to],
            sender: from
        })
        if (data) return res.json({ msg: 'Message added' })
        return res.json({ msg: "Failed to add message" })
    } catch (err) {
        console.log(err)
        next(err)
    }
}
export const getMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body
        const messages = await Message.find({
            users: { $all: [from, to] }
        }).sort({ updatedAt: 1 })
        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            }
        })
        res.json(projectMessages)
    } catch (err) {
        console.log(err)
        next(err)
    }
}
