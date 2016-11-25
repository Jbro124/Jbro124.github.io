/**
 * Created by JustinBrown on 11/24/16.
 */
//---------------Global Variables----------------
//pedmales
var mpedheights=[[1,3,4],2,3,4,5]

//-------------check form function-------------------------------
function validateForm(n1,n2,n3,n4,n5,n6) {
    if (n1!="" && n2!="" && n3!="" && n4!="" && n5!="" && n6!="") {
        return true;
    }
    else{
        alert("From is not filled out correctly");
        return false;
    }
}

//----------------run everything----------------------------
function initiate(){
    //Get form values
    var patid = document.forms["reqInfo"]["pid"].value;
    var pdate = document.forms["reqInfo"]["prodate"].value;
    var pdesc = document.forms["reqInfo"]["proname"].value;
    var pgend = document.forms["reqInfo"]["gender"].value;
    var pheight = document.forms["reqInfo"]["ph"].value;
    var pweight = document.forms["reqInfo"]["pw"].value;
    //validate form
    var validation=validateForm(patid,pdate,pdesc,pgend,pheight,pweight);
    //if validated to true proceed
    if (validation){
        alert('correct');


    }
    console.log(mpedheights[0])
}