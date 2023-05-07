// HAMBURGER MENU
function hamburg(){
    let isChecked = document.getElementById("hamburger").checked;
    if(isChecked){
        document.getElementById("home").innerHTML = "Home";
        document.getElementById("prod").innerHTML = "Our Products";
        document.getElementById("locate").innerHTML = "Our Stores";
        document.getElementById("about").innerHTML = "About Us";
        document.getElementById("purchase").innerHTML = "Buy Now";
    } else{
        document.getElementById("home").innerHTML = "";
        document.getElementById("prod").innerHTML = "";
        document.getElementById("locate").innerHTML = "";
        document.getElementById("about").innerHTML = "";
        document.getElementById("purchase").innerHTML = "";
    }
}


// FORM VALIDATION
const check_submit = document.getElementById("form_purchase");
check_submit.addEventListener('submit',submit_check);


var check_form = [];
function submit_check(e){
    validation(e)
    let test = true;
    for(i = 0; i<check_form.length; i++){
        if(check_form[i]==false){
            test = false;
            break;
        }
    }

    if(test){
        alert("Transaction Completed! Thank You for Choosing CHocs!");
    }
    
}


function validation(e){
    var name = getIdVal("input-name");
    var phone = getIdVal("input-phone");
    var address = getIdVal("input-address");
    var region = getIdVal("select-region");
    var payment = document.getElementsByName("radio");

    // INPUT VALIDATION
    check_form[0] = checkInput(e, (name.length > 1), "name-error","*Required");
    check_form[1] = checkInput(e, (phone.startsWith("+62")==true && phone.length > 11 && !check_phone(phone)),"phone-error","*Use Indonesia phone number(+62) and number length more than 10");
    check_form[2] = checkInput(e, (region!="none"), "region-error","*Choose one region");
    check_form[3] = checkInput(e, (address.length > 1), "add-error","*Required");

    // CHECK THE PRODUCT INPUT (USER NEED TO BUY ATLEAST 1 PRODUCT TO DO TRANSACTION)
    let pr_check = false;
    var product_name = ["dbox_q","wbar_q","dbar_q","hbox_q","htruf_q","mbox_q","mbar_q","wbox_q","mixbox_q"];
    product_name.forEach(element => {
        if(getIdVal(element)>=1){
            pr_check = true;
        } else if(getIdVal(element) <0){
            pr_check = false;
        }
    });
    check_form[4] = checkInput(e, pr_check, "check-error", "*Buy at least 1 product and don't input negative number")

    // CHECK THE RADIO BUTTON INPUT
    let p_check = false;
    for(i = 0; i < payment.length; i++){
        if(payment[i].checked==true){
            p_check = true;
        }
    }
    check_form[5] = checkInput(e, p_check, "rad-error","*Choose one payment method");

}

function check_phone(array){
    for(i=1; i<array.length; i++){
        if(isNaN(array[i])){
            return true;
        }
    }
    return false;
}

// VALIDATE THE INPUT
function checkInput(e,cases,errorID,message){
    if(!cases){
        errorPrint(errorID,message);
        e.preventDefault();
        return false;
    } else{
        clear(errorID);
        return true;
    }
}

// RETURN THE VALUE OF THE ELEMENT BY ID
function getIdVal(elementNames){
    return document.getElementById(elementNames).value;
}

//ADD CONTENT INTO ELEMENT
function errorPrint(elementNames,message){
    document.getElementById(elementNames).innerHTML = message + "";
}

// CLEAR ELEMENT CONTENT
function clear(elementNames){
    document.getElementById(elementNames).innerHTML = "";
}


