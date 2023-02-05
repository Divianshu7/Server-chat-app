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