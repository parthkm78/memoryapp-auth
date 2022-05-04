/**********************************************************************
 * Changelog
 * All notable changes to this project will be documented in this file.
 **********************************************************************
 *
 * Author            : Parth
 *
 * Date created      : 03/05/2022
 *
 * Purpose           : Auth related APIs
 *
 * Revision History  :
 *
 * Date            Author            Jira            Functionality
 *
  **********************************************************************
 */

import { successResponse, errorResponse } from "../../utils/response.js";
import { ERROR_MESSAGE, HTTP_STATUS_CODE } from "../../utils/constants.js";
import { logger } from "../../utils/logger.js";
import validator from 'express-validator';
const { validationResult } = validator;
import { CONFIGS } from "../../configs/configExport.js";
const { JWKCONFIG } = CONFIGS;
const { JWSCONFIG } = CONFIGS;
import fs from "fs";
import jose from "node-jose";
import jwt from "jsonwebtoken";
import User from "../../model/user.js";
import { fetchRecord } from "../../services/database/dbCollection.js";
import { compareHash } from "../../utils/crypto.js";
import mongoose from "mongoose";
import { generateJWT}  from "../../services/googleAuth/auth.js";

/**
 * Generate Token
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const generateToken = async (req, res) => {
    try {
        console.log("sd")
        // generate google auth token
        let token = await generateJWT();

        res.status(HTTP_STATUS_CODE.OK)
        .json(successResponse("Token created successfully", { token : token }));
    }
    catch (err) {
        logger.error("generateToken: Something went wrong while generating Token: " + err.message);
        return res
            .status(HTTP_STATUS_CODE.OK)
            .json(errorResponse(ERROR_MESSAGE.INTERNAL_SERVER_ERROR, { status : HTTP_STATUS_CODE.INTERNAL_SERVER }))
    }
}

/**
 * Validate Auth token
 *
 * @param {object} request The request object
 * @param {object} response The response object
 * @param {object} next The next object
 **/
export const validateToken = async (request, response, next) => {
    try {
        const token = request.body.headers.auth;
        // validate token
        let data = await validateJWT(token);

        res.status(HTTP_STATUS_CODE.OK)
        .json(successResponse("Token vallidated successfully", { data : data }));
    }
    catch (err) {
        logger.error("User Authentication Error in Authentication Middleware: " + err.message)
        return response
            .status(HTTP_STATUS_CODE.OK)
            .json(errorResponse(ERROR_MESSAGE.GENERIC_AUTHENTICATION_CHECK_ERROR, { status : HTTP_STATUS_CODE.BAD_REQUEST }))
    }
}
