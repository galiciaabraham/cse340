'use strict'

 // Get a list of items in inventory based on the classification_id 
let approvalList = document.querySelector("#approval-list")

approvalList.addEventListener("change", function() {
    let selectedOption = approvalList.value
    console.log(`selected option is: ${selectedOption}`)
    let approvalListURL = `/inv/getApprovalList/?type=${selectedOption}`
    console.log(approvalListURL)
    fetch(approvalListURL)
    .then(function (response) {
        if (response.ok) {
            return response.json()
        } throw Error ("Network request problem")
    }).then(function (data){
        buildApprovalList(data);
    }).catch(function (error) {
        console.log('There was a problem:', error.message)
    })
})

// Build inventory items into HTML table components and inject into DOM 
function buildApprovalList (data) {
    let approvalBox = document.querySelector("#approval-box");
     // Set up the table labels 
    let dataList = "<thead>";
    dataList += '<tr><th>Requested change</th><td>Requested date</td><td>&nbsp;</td><td>&nbsp;</td></tr>'; 
    dataList += '</thead>'; 
    // Set up the table body 
    dataList += '<tbody>'; 
    // Iterate over all vehicles in the array and put each in a row 
    data.forEach(function (element) { 
        console.log(element); 
        dataList += `<tr><td>${element.change}</td>`; 
        dataList += `<tr><td>${element.dateOfChange}</td>`; 
        dataList += `<td><a href='/inv/approve/${element.inv_id}' title='Click to approve'>Approve</a></td>`; 
        dataList += `<td><a href='/inv/reject/${element.inv_id}' title='Click to reject'>Reject</a></td></tr>`; 
       }) 
       dataList += '</tbody>';
     // Display the contents in the Inventory Management view 
    approvalBox.innerHTML = dataList;
}

