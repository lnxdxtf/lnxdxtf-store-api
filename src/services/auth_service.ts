const jwt = require('jsonwebtoken');
import Express, {NextFunction, Request, Response } from "express"

exports.generateToken = async (data:any) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

exports.decodeToken = async (token:any) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.authorize = function (request:Request, response:Response, next:NextFunction) {
    var token = request.body.token || request.query.token || request.headers['x-access-token'];

    if (!token) {
        response.status(401).json({
            message: 'Acesso Restrito - Acesso apenas para usuários cadastrados'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error:any, decoded:any) {
            if (error) {
                response.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                next();
            }
        });
    }
};

exports.isAdmin = function (request:Request, response:Response, next:NextFunction) {
    var token = request.body.token || request.query.token || request.headers['x-access-token'];

    if (!token) {
        response.status(401).json({
            message: 'Token Inválido'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error:any, decoded:any) {
            if (error) {
                response.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    response.status(403).json({
                        message: 'Esta funcionalidade é restrita para administradores'
                    });
                }
            }
        });
    }
};