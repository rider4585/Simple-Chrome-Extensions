class DataGenerator {
    constructor() {
        this.data = {
            personalInfo: {
                memberId: '',
                name: '',
                phoneNumber: '',
                email: '',
                date: '',
                invoiceNo: '',
                gstNo: '',
                sacNo: '',
                place: '',
                state: '',
            },
            enrollmentInfo: {
                courseName: '',
                plan: '',
                instructor: '',
                startDate: '',
                endDate: '',
            },
            paymentInfo: {
                payMode: '',
                amountInWords: '',
                memberGST: '',
                courseFee: 0,
                registrationFee: 0,
                discount: 0,
                cgst: 0,
                sgst: 0,
                igst: 0,
                total: 0,
                paid: 0,
                balance: 0,
            },
        };
    }

    setFieldValue(section, field, value) {
        this.data[section][field] = value;
    }

    calculateTotal() {
        const {
            courseFee,
            registrationFee,
            discount,
            cgst,
            sgst,
            igst
        } = this.data.paymentInfo;
        this.data.paymentInfo.total =
            parseFloat(courseFee) + parseFloat(registrationFee) - parseFloat(discount) + parseFloat(cgst) + parseFloat(sgst) + parseFloat(igst);
    }

    calculateBalance() {
        const {
            total,
            paidFees
        } = this.data.paymentInfo;
        this.data.paymentInfo.balance = total - parseFloat(paidFees);
    }

    generateJSON() {
        return this.data;
    }
}

class DataValidator {
    static isFieldEmpty(data) {
        for (const section in data) {
            for (const key in data[section]) {
                if (data[section][key] == '') {
                    return true;
                }
            }
        }
        return false;
    }

    static isNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    static validateInputFields(data) {
        const {
            courseFee,
            registrationFee,
            discount,
            cgst,
            sgst,
            igst,
            paidFees
        } = data.paymentInfo;

        const validateField = (field) => {
            return DataValidator.isNumber(field) && parseFloat(field) >= 0;
        };

        return (
            validateField(courseFee) &&
            validateField(registrationFee) &&
            validateField(discount) &&
            validateField(cgst) &&
            validateField(sgst) &&
            validateField(igst) &&
            validateField(paidFees)
        );
    }
    static validateInputFields(data) {
        const {
            courseFee,
            registrationFee,
            discount,
            cgst,
            sgst,
            igst,
            paidFees
        } = data.paymentInfo;

        const validateField = (field) => {
            return DataValidator.isNumber(field) && parseFloat(field) >= 0;
        };

        return (
            validateField(courseFee) &&
            validateField(registrationFee) &&
            validateField(discount) &&
            validateField(cgst) &&
            validateField(sgst) &&
            validateField(igst) &&
            validateField(paidFees)
        );
    }
}

class DataSender {
    static sendData(data) {
        // Add security constraints to validate the source of the request
        console.log(data);
        if (isThisYuWeWebPage()) {
            SendDataToFlutter.postMessage(JSON.stringify(data));
        }
    }
}

function calculateTotalAndBalance() {
    const dataGenerator = new DataGenerator();
    const courseFee = parseFloat(document.querySelector("input[placeholder='Enter Course Fee']").value);
    const cgstRate = 9; // CGST rate is 9%
    const sgstRate = 9; // SGST rate is 9%
    const igstRate = 0; // IGST rate is 0%

    const cgst = (courseFee * cgstRate) / 100;
    const sgst = (courseFee * sgstRate) / 100;
    const igst = (courseFee * igstRate) / 100;

    dataGenerator.setFieldValue('paymentInfo', 'cgst', cgst.toFixed(2));
    dataGenerator.setFieldValue('paymentInfo', 'sgst', sgst.toFixed(2));
    dataGenerator.setFieldValue('paymentInfo', 'igst', igst.toFixed(2));
    dataGenerator.setFieldValue('paymentInfo', 'courseFee', courseFee);

    const paidFees = document.querySelector("input[placeholder='Enter Paid Fees']").value;
    dataGenerator.setFieldValue('paymentInfo', 'paidFees', paidFees);

    if (DataValidator.validateInputFields(dataGenerator.generateJSON())) {
        dataGenerator.calculateTotal();
        dataGenerator.calculateBalance();

        const totalField = document.querySelector("input[placeholder='Enter Total']");
        const balanceField = document.querySelector("input[placeholder='Enter Balance']");

        totalField.value = dataGenerator.generateJSON().paymentInfo.total.toFixed(2);
        balanceField.value = dataGenerator.generateJSON().paymentInfo.balance.toFixed(2);
    } else {
        alert('Please enter valid numeric values for the input fields.');
    }
}

function validateResponse() {
    const dataGenerator = new DataGenerator();

    const personalInfoFields = [
        'memberId',
        'name',
        'phoneNumber',
        'email',
        'date',
        'invoiceNo',
        'gstNo',
        'sacNo',
        'place',
        'state',
    ];
    const enrollmentInfoFields = [
        'courseName',
        'plan',
        'instructor',
        'startDate',
        'endDate',
    ];
    const paymentInfoFields = [
        'payMode',
        'amountInWords',
        'memberGST',
        'courseFee',
        'registrationFee',
        'discount',
        'cgst',
        'sgst',
        'igst',
        'total',
        'paid',
        'balance'
    ];

    personalInfoFields.forEach((field) => {
        let inputField = document.querySelector(`#${field}`);
        dataGenerator.setFieldValue('personalInfo', field, inputField ? inputField.value : '');
    });

    enrollmentInfoFields.forEach((field) => {
        let inputField = document.querySelector(`#${field}`);
        dataGenerator.setFieldValue('enrollmentInfo', field, inputField ? inputField.value : '');
    });

    paymentInfoFields.forEach((field) => {
        let inputField = document.querySelector(`#${field}`);
        dataGenerator.setFieldValue('paymentInfo', field, inputField ? inputField.value : '');
    });

    if (DataValidator.isFieldEmpty(dataGenerator.generateJSON())) {
        alert('Please fill in all the required fields.');
    } else {
        DataSender.sendData(dataGenerator.generateJSON());
    }
}



function fillForm() {
    // Personal Information
    document.getElementById('memberId').value = '123456';
    document.getElementById('name').value = 'John Doe';
    document.getElementById('phoneNumber').value = '1234567890';
    document.getElementById('email').value = 'johndoe@example.com';
    document.getElementById('date').value = '2023-06-26';
    document.getElementById('invoiceNo').value = 'INV-123456';
    document.getElementById('gstNo').value = 'GST123456';
    document.getElementById('sacNo').value = 'SAC123456';
    document.getElementById('place').value = 'City';
    document.getElementById('state').value = 'State';

    // Enrollment Information
    document.querySelector("input[placeholder='Enter Course Name']").value = 'English 101';
    document.querySelector("input[placeholder='Enter Plan']").value = 'Basic';
    document.querySelector("input[placeholder='Enter Instructor']").value = 'Jane Smith';
    document.querySelector("input[placeholder='Enter Start Date']").value = '2023-07-01';
    document.querySelector("input[placeholder='Enter End Date']").value = '2023-09-30';

    // Payment Information
    document.querySelector("input[placeholder='Enter Pay Mode']").value = 'Credit Card';
    document.querySelector("input[placeholder='Enter Amount in Words']").value = 'One Thousand';
    document.querySelector("input[placeholder='Enter Member GST']").value = 'GST123456';
    document.querySelector("input[placeholder='Enter Course Fee']").value = '1000';
    document.querySelector("input[placeholder='Enter Registration Fee']").value = '50';
    document.querySelector("input[placeholder='Enter Discount']").value = '100';
    document.querySelector("input[placeholder='Enter CGST']").value = '90';
    document.querySelector("input[placeholder='Enter SGST']").value = '90';
    document.querySelector("input[placeholder='Enter IGST']").value = '0';
    document.querySelector("input[placeholder='Enter Paid Fees']").value = '500';

    calculateTotalAndBalance();
}

function isThisYuWeWebPage() {
    return true;
}

function setData(data) {
    if (data != "" && data != null && data != undefined) {
        if (data.hasOwnProperty('name')) {
            document.getElementById("name").value = data['name'];
        }

        if (data.hasOwnProperty('phoneNumber')) {
            document.getElementById("phoneNumber").value = data['phoneNumber'];
            document.getElementById("memberId").value = data['phoneNumber'];
        }
    }
}