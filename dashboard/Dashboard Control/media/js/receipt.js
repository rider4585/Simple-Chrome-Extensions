function generateJSON() {
    var data = {
        "memberId": document.getElementById("memberId").value,
        "name": document.getElementById("name").value,
        "contactNo": document.getElementById("contactNo").value,
        "email": document.getElementById("email").value,
        "date": document.getElementById("date").value,
        "invoiceNo": document.getElementById("invoiceNo").value,
        "gstNo": document.getElementById("gstNo").value,
        "sacNo": document.getElementById("sacNo").value,
        "place": document.getElementById("place").value,
        "state": document.getElementById("state").value,
        "courseName": document.querySelector("input[placeholder='Enter Course Name']").value,
        "plan": document.querySelector("input[placeholder='Enter Plan']").value,
        "instructor": document.querySelector("input[placeholder='Enter Instructor']").value,
        "startDate": document.querySelector("input[placeholder='Enter Start Date']").value,
        "endDate": document.querySelector("input[placeholder='Enter End Date']").value,
        "payMode": document.querySelector("input[placeholder='Enter Pay Mode']").value,
        "amountInWords": document.querySelector("input[placeholder='Enter Amount in Words']").value,
        "memberGST": document.querySelector("input[placeholder='Enter Member GST']").value,
        "courseFee": document.querySelector("input[placeholder='Enter Course Fee']").value,
        "registrationFee": document.querySelector("input[placeholder='Enter Registration Fee']").value,
        "discount": document.querySelector("input[placeholder='Enter Discount']").value,
        "cgst": document.querySelector("input[placeholder='Enter CGST']").value,
        "sgst": document.querySelector("input[placeholder='Enter SGST']").value,
        "igst": document.querySelector("input[placeholder='Enter IGST']").value,
        "total": document.querySelector("input[placeholder='Enter Total']").value,
        "paidFees": document.querySelector("input[placeholder='Enter Paid Fees']").value,
        "balance": document.querySelector("input[placeholder='Enter Balance']").value
    };

    return data;
}

function validateResponse() {
    let jsonData = generateJSON();
    let isFieldEmpty = false;
    // console.log(jsonData);
    for (const key in jsonData) {
        if (jsonData[key] == '') {
            isFieldEmpty = true;
        }
    }

    if (isFieldEmpty) {
        alert("Please Enter All Fields!");
    } else {
        sendDataToFlutter(jsonData);
    }
}

function isOasizwebpage() {
    return true;
}

function sendDataToFlutter(data) {
    SendDataToFlutter.postMessage(data)
}