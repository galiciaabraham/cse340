const pool = require("../database/")

/* 
Get classifications that haven't been approved yet 
*/
async function getClassificationsWithoutApproval(){
    try {
      const data = await pool.query("SELECT * FROM public.classification WHERE classification_approved = false ORDER BY classification_name ")
      return data.rows;
    } catch (error) {
      console.error("Error retrieving classification approvals" + error )
    }
  }
  
  /* 
  Get inventory items that haven't been approved yet 
  */
  async function getInventoryWithoutApproval(){
    try {
      const data = await pool.query("SELECT * FROM public.inventory  WHERE inv_approved = false ORDER BY inv_id")
      return data.rows;
    } catch (error) {
      console.error("Error retrieving inventory approvals" + error )
    }
  }

  /*Approve the inventory by modifying the inventory_approved, account_id and inv_approved_date in the inventory table*/
  async function approveInventory(inv_id, account_id){
    try {
        const sql = "UPDATE public.inventory SET inv_approved = true, account_id = $1, inv_approval_date = CURRENT_TIMESTAMP WHERE inv_id = $2 RETURNING *"
        return await pool.query(sql, [account_id, inv_id])  
    } catch (error) {
        console.error("model error: " + error)
    }     
  }

  /*Approve All the inventory by modifying the inventory_approved, account_id and inv_approved_date in the inventory table*/
    async function approveAllInventory(account_id){
      try {
          const sql = "UPDATE public.inventory SET inv_approved = true, account_id = $1, inv_approval_date = CURRENT_TIMESTAMP WHERE inv_approved = false RETURNING *"
          return await pool.query(sql, [account_id])  
      } catch (error) {
          console.error("model error: " + error)
      }     
    }

  /*Approve the classification by modifying the classification_approved, account_id and classification_approval_date in the inventory table*/
  async function approveClassification(classification_id, account_id){
    try {
      const sql = "UPDATE public.classification SET classification_approved = true, account_id = $1, classification_approval_date = CURRENT_TIMESTAMP WHERE classification_id = $2 RETURNING *";
      
      const data = await pool.query(sql, [parseInt(account_id), parseInt(classification_id)]);
      return data

    } catch (error) {
        console.error("model error: " + error)
    }     
  }

  module.exports = { getClassificationsWithoutApproval, getInventoryWithoutApproval, approveInventory, approveClassification, approveAllInventory}
