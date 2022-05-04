// **********************************************************************
// * Changelog										
// * All notable changes to this project will be documented in this file.	
// **********************************************************************
// *
// * Author				: Parth Mehta
// *
// * Date created		: 04/05/2022
// *
// * Purpose			: Contains hash related 
// *                      functions
// *
// * Revision History	:
// *
// * Date			Author			Jira			Functionality 
// * 
// *
// **********************************************************************

import bcrypt from "bcrypt";

/**
 * Compare Hash
 * 
 * @param {string} plainText
 * @param {string} textHash
 * @returns {boolean}
 **/
export const compareHash = async (plainText, textHash) => {
    return await bcrypt.compare(plainText, textHash);
}
