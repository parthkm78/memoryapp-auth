/**********************************************************************
 * Changelog                                        
 * All notable changes to this project will be documented in this file.    
 **********************************************************************
 *
 * Author            : Parth Mehta
 *
 * Date created      : 04/05/2022
 *
 * Purpose           : Express Server
 *
 * Revision History  :
 *
 * Date            Author            Jira            Functionality 
 * 
 **********************************************************************
 */

import loaders from "./loaders/index.js";

/**
 *  Bootstrap server 
 */
async function startServer() {
    await loaders();
}
// Start server
startServer();
