/**********************************************************************
 * Changelog                                        
 * All notable changes to this project will be documented in this file.    
 **********************************************************************
 *
 * Author            : Parth Mehta
 *
 * Date created      : 04/05/2022
 *
 * Purpose           : Mongo Database Service
 *
 * Revision History  :
 *
 * Date            Author            Jira          Functionality 
 **********************************************************************
 */

import {JWT} from "google-auth-library";
import  keys   from "../../configs/dev/toggle-test.js";
import { logger } from "../../utils/logger.js";

/**
 * Generate Token
 * @param {*} req
 * @param {*} res
 * @returns
 */
 export const generateJWT = async (req, res) => {
  try {
    const client = await new JWT({
      email: keys.client_email,
      key: keys.private_key,
      scopes: [keys.provider],
    });
    const url = keys.projectUrl + keys.project_id;
    const res = await client.request({url});
    return res.access_token;
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
 export const validateJWT = async (token, response, next) => {

  const client = await new JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: [keys.provider],
  });

  const decyptToken = await client.authorize(token);
  return decyptToken.data;
}