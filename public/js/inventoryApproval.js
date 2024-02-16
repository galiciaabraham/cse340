'use strict'

 // Get a list of items in inventory based on the classification_id 
let approvalList = document.querySelector("#approval-list")

approvalList.addEventListener("change", function() {
    let selectedOption = approvalList.value
    console.log(`selected option is: ${selectedOption}`)
    let approvalListURL = `/approve/getApprovalList/?type=${selectedOption}`
    console.log(approvalListURL)
    if (selectedOption == 'classification') {
        ajaxRequest(approvalListURL, buildClassApprovalList)
    } else {
        ajaxRequest(approvalListURL, buildInvApprovalList)
    }
})

async function ajaxRequest(URL, buildFn){
    fetch(URL)
    .then(function (response) {
        if (response.ok) {
            return response.json()
        } throw Error ("Network request problem")
    }).then(function (data){
       buildFn(data);
    }).catch(function (error) {
        console.log('There was a problem:', error.message)
    })
}

// Build classification items into HTML table components and inject into DOM 
async function buildClassApprovalList (data) {
    let approvalBox = document.querySelector(".approval-box");
     // Set up the table labels 
    let dataList = '<ul class="pending-approval-list">'
    // Iterate over all vehicles in the array and put each in a row 
    data.forEach(function (element) { 
        dataList += `<li>
        <span>Classification: </span>
        <span>Classification ID: ${element.classification_id}</span>
        <span>Classification Name: ${element.classification_name}</span>
        <a href='/approve/approve/${element.classification_id}/?type=classification' class='approval-button'>Approve</a>
        <a href='/approve/reject/${element.classification_id}/?type=classification' class='approval-button'>Reject</a>
        </li>`
    })
    dataList += '</ul>'
     // Display the contents in the Approval Management view 
    approvalBox.innerHTML = dataList;
}

// Build inventory items into HTML table components and inject into DOM 
async function buildInvApprovalList (data) {
    let approvalBox = document.querySelector(".approval-box");
     // Set up the table labels 
    let dataList = '<ul class="pending-approval-list">'
    // Iterate over all vehicles in the array and put each in a row 
    data.forEach(function (element) { 
        dataList += `<li>
        <span>Inventory Item: </span>
        <span>Item ID: ${element.inv_id}</span>
        <span>Vehicle: ${element.inv_year} ${element.inv_make} ${element.inv_model}</span>
        <span>Description: ${element.inv_description}</span>
        <span>Image Path: ${element.inv_image}</span>
        <span>Price: ${element.inv_price}</span>
        <span>Mileage: ${element.inv_miles}</span>
        <a href='/approve/approve/${element.inv_id}/?type=inventory' class='approval-button'>Approve</a>
        <a href='/approve/reject/${element.inv_id}/?type=inventory' class='approval-button'>Reject</a>
        </li>`
    })
    dataList += '</ul>'
     // Display the contents in the Approval Management view 
    approvalBox.innerHTML = dataList;
}

async function hideClickedItem (parentElement) {
    const actionButton = document.getElementsByClassName('approval-button')
    actionButton.addEventListener("click", function () {
        parentElement.parentElement.remove()
    })

}
