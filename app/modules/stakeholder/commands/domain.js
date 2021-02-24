// //Karena ini adalah domain yang berada pada repositories command, maka isinya hanya bisa create, update dan delete data
// const passport = require('passport');

// class administrator {
//     // buat cek udah terdaftar apa belum.

// };

// module.exports = stakeholder;
const Pool = require("pg").Pool;
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "291100",
    port: 6000,
    database: "VotingApp"
});
import Helper from '../Helper/Helper';
class Register {
    async nowRegister(show) {
        if (!req.body.email) {
            return res.status(400).send({
                status: 'false',
                message: 'No values!'

            })
          }
        if (!Helper.isValidEmail(req.body.email)) {
            return res.status(400).send({
                status: 'false',
                message: 'Please enter a valid email address'
                
            });
          }
        const createQuery = `INSERT INTO
          Stakeholder(id_stakeholder, email)
          VALUES($1, $2)
          returning *`;
        const values = [
          req.body.email
        ];
        try {
            const { rows } = await db.query(createQuery, values);
            return res.status(200).send({
                status: 'true',
                message: 'Email berhasil ditambahkan'
            })
          } catch(error) {
            if (error.routine === '_bt_check_unique') {
              return res.status(400).send({
                  status: 'false',
                  message: 'Email telah terdaftar'
              })
            }
            return res.status(400).send(error);
          }
        }
    }
module.exports = Register;