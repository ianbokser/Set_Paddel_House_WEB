import mysql from 'mysql'
import bcryptjs from 'bcryptjs';

async function verificarUsuarioExiste(_host, _user, _password, _database, usuario, email) {
    const connection = mysql.createConnection({
        host: _host,
        user: _user,
        password: _password,
        database: _database,
    });

    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.error('Error al conectar a la base de datos:', err);
                reject(err);
                return;
            }

            const queryUsuario = 'SELECT * FROM clientes WHERE usuario_cliente = ?';
            const queryEmail = 'SELECT * FROM clientes WHERE mail_cliente = ?';

            connection.query(queryUsuario, [usuario], (errorUsuario, resultsUsuario) => {
                if (errorUsuario) {
                    console.error('Error al ejecutar la consulta de usuario:', errorUsuario);
                    reject(errorUsuario);
                    return;
                }

                connection.query(queryEmail, [email], (errorEmail, resultsEmail) => {
                    if (errorEmail) {
                        console.error('Error al ejecutar la consulta de email:', errorEmail);
                        reject(errorEmail);
                        return;
                    }
                    const usuarioExiste = resultsUsuario.length > 0 || resultsEmail.length > 0;
                    resolve(usuarioExiste);
                    connection.end();
                });
            });
        });
    });
}


export function usuarioExiste(_host, _user, _password, _database, usuario, email) {
    return new Promise(async (resolve, reject) => {
        try {
            const UsuarioExiste = await verificarUsuarioExiste(_host, _user, _password, _database, usuario, email)
            resolve(UsuarioExiste);
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            reject(error);
        }
    });
}

export async function agregarNuevoCliente(_host, _user, _password, _database, usuario, email, contraseña) {
    const connection = mysql.createConnection({
        host: _host,
        user: _user,
        password: _password,
        database: _database,
    });

    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.error('Error al conectar a la base de datos:', err);
                reject(err);
                return;
            }
            const query = 'INSERT INTO clientes (usuario_cliente, mail_cliente, password_cliente) VALUES (?, ?, ?)';
            connection.query(query, [usuario, email, contraseña], (error, results) => {
                if (error) {
                    console.error('Error al ejecutar la consulta de inserción:', error);
                    reject(error);
                } else {
                    resolve();
                }
                connection.end();
            });
        });
    });
}

export async function verificarUsuarioYContraseña(_host, _user, _password, _database, email, password) {
    const connection = mysql.createConnection({
        host: _host,
        user: _user,
        password: _password,
        database: _database,
    });
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.error('Error al conectar a la base de datos:', err);
                reject(err);
                return;
            }

            const queryUsuario = 'SELECT * FROM clientes WHERE mail_cliente = ?';

            connection.query(queryUsuario, [email], async (error, results) => {
                if (error) {
                    console.error('Error al ejecutar la consulta de usuario:', error);
                    reject(error);
                    return;
                }
                if (results.length > 0) {
                    const usuarioEncontrado = results[0];
                    const storedHashedPassword = usuarioEncontrado.password_cliente;
                    const contraseñaCoincide = await bcryptjs.compare(password, storedHashedPassword);
                    if (contraseñaCoincide) {
                        resolve(usuarioEncontrado);
                    } else {
                        resolve(false);
                    }
                } else {
                    resolve(false);
                }

                connection.end();
            });
        });
    });
}