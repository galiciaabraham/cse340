const pool = require("../database/")

/* 
 Get all classification data
*/
async function getClassifications(){
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

async function getClassificationName(classification_id) {
    const classificationName = await pool.query(`SELECT classification_name FROM public.classification WHERE classification_id = $1`,[classification_id])
    return classificationName.rows
}
/* 
 Get all inventory items and classification_name by classification_id
*/
async function getInventoryByClassificationId(classification_id) {
    try {
        const data = await pool.query(
            `SELECT * FROM public.inventory AS i
            JOIN public.classification AS c
            ON i.classification_id = c.classification_id
            WHERE i.classification_id = $1`,
            [classification_id]
        )
        return data.rows
    } catch (error) {
        console.error("getclassificationbyid error" + error)
    }
}
/*Gets the details of an specific product by Id 
matching the product_id being passed as a parameter*/
async function getCarDetailsById (product_id) {
    try {
        const data = await pool.query(
            `SELECT * FROM public.inventory AS i            
            WHERE i.inv_id = $1`,
            [product_id]
        )
        return data.rows
    } catch (error) {
        console.error("getCarDetailsById error" + error)
    }
}

/*
Add new classification
*/
async function addClassification(classification_name){
    try {
      const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
      return await pool.query(sql, [classification_name])
    } catch (error) {
      return error.message
    }
  }
  
/*
Check for existing email
 */
  async function checkExistingClassification(classification_name) {
    try {
      const sql = "SELECT * FROM classification WHERE classification_name = $1"
      const classification = await pool.query(sql, [classification_name])
      return classification.rowCount
    } catch (error) {
      return error.message
    }
  }

module.exports = {getClassifications, getInventoryByClassificationId, getCarDetailsById, checkExistingClassification, addClassification, getClassificationName}

