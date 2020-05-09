import express from 'express';
import mysql from 'mysql';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors'
import {
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    PORT
} from './config/'

const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'keiron'
})

const app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.post('/login', function (req, res) {
    const { username, password } = req.body;

    if (username && password) {
        db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function (err, rows) {
            if (err) {
                req.flash('error', err);
                res.json({ error: err });
            }
            else if (rows.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.json({ user: rows[0] });
            } else {
                res.status(401)
                res.json({ error: 'Incorrect Username and/or Password' });
            }
            res.end();
        });
    } else {
        res.status(401)
        res.json({ error: 'Please enter Username and Password' });
        res.end();
    }
});

app.post('/signup', function (req, res) {
    const { username, password, email } = req.body

    if (username && password && email) {
        const user = { user_type_id: 3, username, password, email }
        db.query('INSERT INTO users SET ?', user, function (err) {
            if (err) {
                res.status(400)
                req.flash('error', err)
            } else {
                res.status(201)
                res.json({ success: 'User added successfully' });
            }
        })
    } else {
        res.status(400)
        res.json({ error: 'Please enter Username, Password and Email' });
        res.end();
    }
})

app.get('/user/:userId/tickets', function (req, res) {
    const { userId } = req.params
    if (userId) {
        db.query('SELECT * FROM tickets WHERE user_id = ? ORDER BY tickets.id DESC', userId, function (err, rows) {
            if (err) throw err
            if (rows.length > 0) {
                res.json({ tickets: rows })
            } else {
                res.status(400)
                res.json({ error: 'Not found tickets' });
            }
        })
    }
    else {
        res.status(400)
        res.json({ error: 'Please send a correct userId' });
        res.end();
    }
})

app.patch('/tickets/:id/selected', function (req, res) {
    const { id } = req.params
    const { selected } = req.body

    if (id && (selected === 1 || selected === 0)) {
        db.query('UPDATE tickets SET selected = ? WHERE id = ?', [selected, id], function (err, rows) {
            if (err) throw err
            if (rows.affectedRows > 0) {
                res.json({ success: 'Ticked updated' })
            } else {
                res.status(400)
                res.json({ error: 'Ticket not updated' });
            }
        })
    } else {
        res.status(400)
        res.json({ error: 'Please send a correct Ticket' });
        res.end();
    }
})

app.get('/users', function (req, res) {
    db.query('SELECT * FROM users WHERE user_type_id = 3 ORDER BY id desc ', function (err, rows) {

        if (err) {
            res.status(400)
            res.json({ error: 'Users cant show' });
        } else {
            res.json({ users: rows });
        }

    });
})

app.post('/tickets', function (req, res) {
    const { user_id } = req.body

    if (user_id) {
        const ticket = { user_id, selected: 1 }
        db.query('INSERT INTO tickets SET ?', ticket, function (err) {
            if (err) {
                res.status(400)
                req.flash('error', err)
            } else {
                res.status(201)
                res.json({ success: 'Ticket added successfully' });
            }
        })
    } else {
        res.status(400)
        res.json({ error: 'Please enter User and selected field' });
        res.end();
    }
})

app.get('/ticketsbyuser', function (req, res) {
    db.query('SELECT tickets.id, users.username, tickets.selected FROM users JOIN tickets ON users.id = tickets.user_id order by tickets.id desc; ', function (err, rows) {
        if (err) {
            res.status(400)
            res.json({ error: 'Users cant show' });
        } else {
            res.json({ tickets: rows });
        }

    });
})

app.delete('/tickets/:id', function (req, res) {
    const { id } = req.params

    if (id) {
        db.query('DELETE FROM tickets WHERE id = ?', id, function (err, rows) {
            if (err) throw err
            if (rows.affectedRows > 0) {
                res.json({ success: 'Ticked deleted' })
            } else {
                res.status(400)
                res.json({ error: 'Ticket not deleted' });
            }
        })
    } else {
        res.status(400)
        res.json({ error: 'Please send a correct Ticket' });
        res.end();
    }
})

const port = PORT;

app.listen(port, err => {
    if (err) {
        console.error(err);
    }

    if (__DEV__) {
        // webpack flags!
        console.log('> in development');
    }

    console.log(`> listening on port ${port}`);
});