import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../db";
import { v4 as uuidv4 } from "uuid";

export const handleLogin = (req: Request, res: Response) => {
    if (req.session.user && req.session.user.username) {
        res.json({ loggedIn: true, user: req.session.user.username });
    } else {
        res.json({ loggedIn: false });
    }
};

export const attemptLogin = async (req: Request, res: Response) => {
    const potentialLogin = await pool.query(
        "SELECT id,username,passhash, userid FROM users u WHERE u.username=$1",
        [req.body.username]
    );
    let isPasswordValid;
    if (!(potentialLogin.rowCount === 0)) {
        isPasswordValid = await bcrypt.compare(
            req.body.password,
            potentialLogin.rows[0].passhash
        );
    }

    if (potentialLogin.rowCount === 0 || !isPasswordValid) {
        res.json({ loggedIn: false, status: "Wrong username or password" });
        return;
    }
    req.session.user = {
        username: potentialLogin.rows[0].username,
        id: potentialLogin.rows[0].id,
        userid: potentialLogin.rows[0].userid,
    };

    res.json({ loggedIn: true, username: req.body.username });
};

export const register = async (req: Request, res: Response) => {
    const existingUser = await pool.query(
        "SELECT username FROM users WHERE username=$1",
        [req.body.username]
    );
    if (existingUser.rowCount === 0) {
        // register
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUserQuery = await pool.query(
            "INSERT INTO users(username,passhash,userid) values($1,$2,$3) RETURNING id,username,userid",
            [req.body.username, hashedPassword, uuidv4()]
        );
        req.session.user = {
            username: req.body.username,
            id: newUserQuery.rows[0].id,
            userid: newUserQuery.rows[0].userid,
        };
        res.json({ loggedIn: true, username: req.body.username });
    } else {
        res.json({ loggedIn: false, status: "Username taken" });
    }
};
