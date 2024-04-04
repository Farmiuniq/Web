const Router = require("express").Router;
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const UserSchema = require ("../models/usuario.js");
const dotenv = require("dotenv");
const { correoelectronico } = require("./html.js");
const { enviarCorreo } = require("./nodemailer.js");


module.exports = { Router, bcrypt, nodemailer, crypto, jwt, dotenv, correoelectronico, enviarCorreo, UserSchema };
