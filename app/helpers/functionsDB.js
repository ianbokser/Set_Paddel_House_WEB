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

export async function agregarNuevoCliente(_host, _user, _password, _database, usuario, email, contraseña, unique) {
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
            const when_it_was_cliente = new Date();
            const query = 'INSERT INTO clientes (usuario_cliente, mail_cliente, password_cliente, hash_unico_cliente, when_it_was_cliente) VALUES (?, ?, ?, ?, ?)';
            connection.query(query, [usuario, email, contraseña, unique, when_it_was_cliente], (error, results) => {
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
                    const estadoCliente = usuarioEncontrado.estado_cliente;
                    const contraseñaCoincide = await bcryptjs.compare(password, storedHashedPassword);
                    
                    if (contraseñaCoincide && estadoCliente === 1) {
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
export async function cargarAlquiler(_host, _user, _password, _database, id_cliente, date, hour) {
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
            const when_it_was_alquiler = new Date();
            const query = 'INSERT INTO alquiler (id_cliente, date, hour, when_it_was_alquiler) VALUES (?, ?, ?, ?)';
            
            connection.query(query, [id_cliente, date, hour, when_it_was_alquiler], (error, results) => {
                if (error) {
                    console.error('Error al ejecutar la consulta:', error);
                    reject(error);
                    return;
                }
                resolve(results);
                connection.end();
            });
        });
    });
}

export async function confirmar_unique(_host, _user, _password, _database, unique, user) {
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

            connection.query(queryUsuario, [user], async (error, results) => {
                if (error) {
                    console.error('Error al ejecutar la consulta de usuario:', error);
                    reject(error);
                    return;
                }
                if (results.length > 0) {
                    const usuarioEncontrado = results[0];
                    const storedUnique = usuarioEncontrado.hash_unico_cliente;
                    if (storedUnique === unique) {
                        const updateQuery = 'UPDATE clientes SET estado_cliente = ? WHERE usuario_cliente = ?';
                        connection.query(updateQuery, [1, user], (updateError, updateResult) => {
                        if (updateError) {
                            console.error('Error al actualizar el estado del cliente:', updateError);
                            reject(updateError);
                            return;
                        }
                        resolve(true);
                        });
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