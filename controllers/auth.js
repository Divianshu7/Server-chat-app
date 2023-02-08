import User from "../model/User"

export const register = async (req, res, next) => {
    // console.log(req.body)
    try {
        const { username, password, email } = req.body
        const usernameCheck = await User.findOne({ username }).exec()
        if (usernameCheck) {
            return res.json({ msg: 'username already exists', status: false })
        } else {
            const emailCheck = await User.findOne({ email }).exec()
            if (emailCheck) {
                return res.json({ msg: 'email already used', status: false })
            } else {
                const user = await User.create({
                    email, username, password
                })
                delete user.password
                return res.json({ status: true, user })
            }
        }
    } catch (err) {
        console.log('registeration error ', err)
        next(err)
    }
}
export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username }).exec()
        if (!user) {
            return res.json({ msg: 'Incorrect Username', status: false })
        } else {
            user.comparePasswords(password, (err, result) => {
                if (!result || err) return res.json({ msg: 'Incorrect Password', status: false })
                else {
                    user.password = ""
                    return res.json({ status: true, user })
                }

            })

        }
    } catch (err) {
        console.log('registeration error==> ', err)
        next(err)
    }
}
export const setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const avatarImage = req.body.image
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage
        }, { new: true }).exec()
        // console.log(userData)
        return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage })

    } catch (err) {
        console.log('saving avatar error ', err)
        next(err)
    }
}
export const allUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.userId } }).select([
            'email', 'username', 'avatarImage', '_id'
        ])
        return res.json(users)
    } catch (err) {
        console.log('getting contacts error ', err)
        next(err)
    }
}