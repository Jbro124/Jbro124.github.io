/**
 * Created by JustinBrown on 11/24/16.
 */
//---------------Global Variables----------------
//put file data into paragraphs to get as variables
$('#amfiles').load("AMfiles.txt");
$('#affiles').load("AFfiles.txt");
$('#pmfiles').load("PMfiles.txt");
$('#pffiles').load("PFfiles.txt");


//-------------check form function-------------------------------
function validateForm(n1,n2,n3,n4,n5,n6,n7) {
    if (n1!="" && n2!="" && n3!="" && n4!="" && n5!="" && n6!="" && n7!="") {
        return true;
    }
    else{
        alert("From is not filled out correctly");
        return false;
    }
}
//------subarray function input array and constant subtracts contant from array--
function subfun(arr,cval){
    var newarr= new Array(arr.length);
    for(i=0;i<arr.length;i++){
        newarr[i]=arr[i]-cval;
    }
    return newarr;
}



//------------phantommatching----------------
//if matchtype=1 match closest
//if matchtype=2 match always heavier and taller
//if matchtype=3 match always lighter and shorter
function phantommatcher(h,w,imlist,prefix){
    var matchtype=1;
    console.log(h);
    console.log(w);
    //first make a 2 arrays with heights and weights
    var harray=new Array(imlist.length);
    var warray=new Array(imlist.length);
    var hdiffs=new Array(imlist.length);
    var wdiffs=new Array();
    var curf;
    for(i=0;i<imlist.length;i++){
        curf=imlist[i].split('_');
        curf=curf[2].split('x');
        harray[i]=parseFloat(curf[0]);
        warray[i]=parseFloat(curf[1]);
    }
//now subtract height and weights from images
//positive are heavier/taller and neg are lighter/shorter
    hdiffs=subfun(harray,h);
    if (matchtype==1){
        //first match heights
        var closestToZero=Math.abs(hdiffs[0]);
        var closestToZeroIndex=0;
        for(i=0;i<hdiffs.length;i++){
            if (Math.abs(hdiffs[i])<closestToZero){
                closestToZero=Math.abs(hdiffs[i]);
                closestToZeroIndex=i;
            }
        }
        var matchedheight=harray[closestToZeroIndex];
        console.log('Matched Height');
        console.log(matchedheight);
        //now pull  weights corresponding to matched
        var matchedHIndices=new Array();
        var possibleweights=new Array();
        for(i=0;i<harray.length;i++){
            if (harray[i]==matchedheight){
                matchedHIndices.push(i);
                possibleweights.push(warray[i]);
            }
        }
        //now subtract patient weight from possible weight
        wdiffs=subfun(possibleweights,w);
        //now find closest height
        var matchedindex;
        var closestToZeroWIndex=0;
        var closestToZeroW=Math.abs(wdiffs[0]);
        for(i=0;i<wdiffs.length;i++){
            if (Math.abs(wdiffs[i])<closestToZeroW){
                closestToZeroW=Math.abs(wdiffs[i]);
                closestToZeroWIndex=i;
            }
        }
        var matchedweight=possibleweights[closestToZeroWIndex];
        console.log('Matched Weight');
        console.log(matchedweight);
        //find image names with height and weight
        var matchnames= new Array();
        for(i=0;i<harray.length;i++){
            if(harray[i]==matchedheight && warray[i]==matchedweight){
                matchnames.push(imlist[i]);
            }
        }
        console.log('Matched Image');
        console.log(matchnames);
        //put images into canvas and put names in
        var im1= new Image();
        var im2=new Image();
        var im1=document.getElementById('Image1');
        var im2=document.getElementById('Image2');
        im1.onload=function(){console.log('loaded im1');};
        im2.onload=function(){console.log('loaded im2');};
        im1.src='images/'+matchnames[0];
        im2.src='images/'+matchnames[1];
        var im1=document.getElementById('Image1');
        var im2=document.getElementById('Image2');
        var c1=document.getElementById('Image1Can');
        var c1ctx=c1.getContext("2d");
        var c2=document.getElementById('Image2Can');
        var c2ctx=c2.getContext("2d");
        console.log('image1 dims w,h');
        console.log(im1.width);
        console.log(im1.height);
        console.log('image2 dims w,h');
        console.log(im2.width);
        console.log(im2.height);
        c1.width=im1.width;
        c2.width=im2.width;
        c1.height=im1.height;
        c2.height=im2.height;
        c1ctx.drawImage(im1,0,0);
        c2ctx.drawImage(im2,0,0);
    }

}
//----------------run everything----------------------------
function initiate(){
    //get values of filenames and remove last space
    console.log('test');
    var AMfiles=document.getElementById('amfiles').innerHTML.split(' ');
    var AFfiles=document.getElementById('affiles').innerHTML.split(' ');
    var PMfiles=document.getElementById('pmfiles').innerHTML.split(' ');
    var PFfiles=document.getElementById('pffiles').innerHTML.split(' ');
    AMfiles=AMfiles.slice(0,AMfiles.length-1);
    AFfiles=AFfiles.slice(0,AFfiles.length-1);
    PMfiles=PMfiles.slice(0,PMfiles.length-1);
    PFfiles=PFfiles.slice(0,PFfiles.length-1);
    //Get form values
    var patid = document.forms["reqInfo"]["pid"].value;
    var pdate = document.forms["reqInfo"]["prodate"].value;
    var pdesc = document.forms["reqInfo"]["proname"].value;
    var pgend = document.forms["reqInfo"]["gender"].value;
    var pheight = document.forms["reqInfo"]["ph"].value;
    var pweight = document.forms["reqInfo"]["pw"].value;
    var page = document.forms["reqInfo"]["pa"].value;
    //validate form
    var validation=validateForm(patid,pdate,pdesc,pgend,pheight,pweight,page);
    //if validated to true proceed
    if (validation){
        //check gender and age to send to phantom matcher
        if(pgend=='male' && page<18){
            alert('ped male');
            phantommatcher(pheight,pweight,PMfiles,'pm');
        }else if(pgend=='female' && page<18){
            alert('ped female');
            phantommatcher(pheight,pweight,PFfiles,'pf');
        }else if(pgend=='male' && page>=18){
            alert('adult male');
            phantommatcher(pheight,pweight,AMfiles,'am');
        }else if(pgend=='female' && page>=18){
            alert('adult female');
            phantommatcher(pheight,pweight,AFfiles,'af');
        }


    }
}