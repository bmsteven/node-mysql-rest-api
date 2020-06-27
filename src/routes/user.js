const bcrypt = require( "bcryptjs" )

const expressValidator = require( "express-validator" )

const db = require( "../models/db" )
const { password } = require( "../config/db.config" )

let salt = bcrypt.genSaltSync( 12 );

let hash = bcrypt.hashSync( "B4c0/\/", salt );

exports.register = async ( req, res ) => {

    let pass = req.body.password

    // let isEmail = false
    // let isTel = false

    let hashedpassword = await bcrypt.hash( pass, salt );

    let newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        tel: req.body.tel,
        password: hashedpassword
    }

    const { firstName, lastName, email, tel, password } = newUser

    let emailCheck = "SELECT email from sellers where email = '" + email + "'"
    let telCheck = "SELECT * from sellers where tel = '" + tel + "'"

    // db.query(emailCheck, (err, results) => {
    //     if (err) throw err
    //     console.log(results)
    //     if (results.length > 0) isEmail = true
    // })

    // db.query(telCheck, (err, results) => {
    //     if (err) throw err
    //     console.log(results)
    //     if (results > 0) isTel = true
    // })

    // console.log(isEmail, isTel)

    db.query( emailCheck, ( err, results ) => {
        if ( err ) throw err
        if ( results.length > 0 ) {
            res.status( 400 ).json( { error: "email address already in use" } )
        }
        else {
            db.query( telCheck, ( err, result ) => {
                if ( err ) throw err
                if ( result.length > 0 ) {
                    res.status( 400 ).json( { error: "telephone number already in use" } )
                } else {
                    let sql = "INSERT INTO `sellers` values (uuid(),?,?,?,?,?)"
                    db.query( sql, [firstName, lastName, email, tel, password], ( err, result ) => {
                        if ( err ) throw err
                        res.json( result )
                    } )
                }
            } )
        }
    } )

}

exports.login = ( req, res ) => { }