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
  async function approveInventory(){

  }

  /*Approve the classification by modifying the classification_approved, account_id and classification_approval_date in the inventory table*/
  async function approveClassification(){

  }

  module.exports = { getClassificationsWithoutApproval, getInventoryWithoutApproval, approveInventory, approveClassification}
