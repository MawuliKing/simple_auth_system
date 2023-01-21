const bcrypt = require('bcrypt')
const dbconn = require('./dbcon')
const jwt = require('jsonwebtoken')

exports.registerNewUser = async (req, res) => {
  const hashed_pwd = await bcrypt.hash(req.body.password, 10)
  let req_body = req.body

  dbconn.query(
    'SELECT * FROM test_user WHERE email = ?',
    [req_body.email],
    (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          return res.status(403).json({
            message: `There is an account associated with ${req_body.email}, please sign in`
          })
        } else {
          dbconn.query(
            'INSERT INTO `test_user`(`email`, `name`, `pwd`) VALUES (?,?,?)',
            [req_body.email, req_body.name, hashed_pwd],
            (error, row, field) => {
              if (!error) {
                return res.status(200).json({
                  message: 'user account created successfully',
                  payload: row
                })
              } else {
                return res.status(502).json({
                  message: `There was an error registering user account, please try again`,
                  error: error
                })
              }
            }
          )
        }
      } else {
        return res.status(502).json({
          message: `Internal server error`,
          error: err
        })
      }
    }
  )
}

exports.signin = (req, res) => {
  const req_body = req.body
  dbconn.query(
    'SELECT * FROM test_user WHERE email = ?',
    [req_body.email],
    async (err, rows) => {
      if (err) {
        return res.status(502).json({
          message: `Internal server error`,
          error: err
        })
      } else {
        if (rows.length === 1) {
          const token = jwt.sign(
            { email: rows[0].email, admin_id: rows[0].id },
            'secrete_Key',
            { expiresIn: '8760hr' }
          )
          const pwd_check = await bcrypt.compare(req_body.password, rows[0].pwd)
          if (pwd_check) {
            return res.status(200).json({
              message: 'login successfull',
              token: token,
              admin: rows[0]
            })
          } else {
            return res.status(401).json({
              message: `You entered an invalid password!!`
            })
          }
        } else {
          return res.status(404).json({
            message: `There is no account associated with ${req_body.email}, please register an account with us now for free!`
          })
        }
      }
    }
  )
}
