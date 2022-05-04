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

/**
 * Fetch collection record
 * @param  model - collection 
 * @param  filterQuery - Query Condition to find the Data 
 * @returns
 */
export const fetchRecord = async (model, filterQuery) => {
  return await model.findOne(filterQuery)
}
