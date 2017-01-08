/**
 * Created by JustinBrown on 11/24/16.
 */
//---------------Global Variables----------------
//put file data into paragraphs to get as variables
$('#amfiles').load("AMfiles.txt");
$('#affiles').load("AFfiles.txt");
$('#pmfiles').load("PMfiles.txt");
$('#pffiles').load("PFfiles.txt");
var im1switch=0;
var im2switch=0;
var image1x=0;
var image1y=0;
var image1x2=0;
var image1y2=0;
var image2x=0;
var image2y=0;
var image2x2=0;
var image2y2=0;
var phantomnames;
//----------get coords from functions and fill out table-----------------
function confirmCoords(){
    if(image1x>0 && image1y>0 && image2x>0 && image2y>0){
        //Get form values and phantom information
        var patid = document.forms["reqInfo"]["pid"].value;
        var pdate = document.forms["reqInfo"]["prodate"].value;
        var pdesc = document.forms["reqInfo"]["proname"].value;
        var imnum = document.forms["reqInfo"]["imid"].value;
        var pgend = document.forms["reqInfo"]["gender"].value;
        var pheight = document.forms["reqInfo"]["ph"].value;
        var pweight = document.forms["reqInfo"]["pw"].value;
        var page = document.forms["reqInfo"]["pa"].value;
        var im1=document.getElementById('Image1Can');
        var im2=document.getElementById('Image2Can');
        var im1orient=im1.getAttribute('class').split('_')[0];
        var im2orient=im2.getAttribute('class').split('_')[0];
        var im1dims=[im1.width,im1.height];
        var im2dims=[im2.width,im2.height];
        var pdims=im1.getAttribute('class').split('_')[3].replace('.png','').split('x');
        var phantomhw=im1.getAttribute('class').split('_')[2];
        var phantomtype=im1.getAttribute('class').split('_')[1];
        console.log('Phantom Dims');
        console.log(pdims)
        //get phantom voxel positions
        //for lat image------
        // larger x corresponds to more posterier ie larger "y" in phantom
        //larger y corresponds to more plantar ie smaller "z" in phantom
        //for AP image------
        //larger x corresponds to more toward left of phantom "x" in phantom
        //larger y corresponds to more plantar ie smaller "z" in phantom
        var vx=0;
        var vy=0;
        var vz=0;
        if (im1orient=='LAT'){
            vy=(pdims[1]/im1dims[0])*image1x;
            if (vz==0){
                vz=pdims[2]-(pdims[2]/im1dims[1])*image1y;
            }else{
                vz=(vz+(pdims[2]-(pdims[2]/im1dims[1])*image1y))/2;
            }
        }else if(im1orient=="AP"){
            vx=(pdims[0]/im1dims[0])*image1x;
            if (vz==0){
                vz=pdims[2]-(pdims[2]/im1dims[1])*image1y;
            }else{
                vz=(vz+(pdims[2]-(pdims[2]/im1dims[1])*image1y))/2;
            }
        }
        if (im2orient=='LAT'){
            vy=(pdims[1]/im2dims[0])*image2x;
            if (vz==0){
                vz=pdims[2]-(pdims[2]/im2dims[1])*image2y;
            }else{
                vz=(vz+(pdims[2]-(pdims[2]/im2dims[1])*image2y))/2;
            }
        }else if(im1orient=="AP"){
            vx=(pdims[0]/im2dims[0])*image2x;
            if (vz==0){
                vz=pdims[2]-(pdims[2]/im2dims[1])*image2y;
            }else{
                vz=(vz+(pdims[2]-(pdims[2]/im2dims[1])*image2y))/2;
            }
        }

        console.log('Phantom voxel coords');
        console.log(vx);
        console.log(vy);
        console.log(vz);
        //now put into text area
        var tarea=document.getElementById('inputTextToSave');
        tarea.innerHTML=tarea.innerHTML+'\n'+patid+','+imnum+','+pdate+','+pdesc+','+pgend+','+pheight+','+pweight+','+page+','+im1.getAttribute('class').split('_')[1]+'_'+im1.getAttribute('class').split('_')[2]+'_'+im1.getAttribute('class').split('_')[3].replace('.png','')+','+vx+','+vy+','+vz;

    }else{alert('please click on both images');}

}
//----------------------save text area---------------------------
function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}

function saveTextAsFile()
{
    var textToSave = document.getElementById("inputTextToSave").value;
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value+'.csv';

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
}

//--------------event listeners---------------------
var can1= document.getElementById('Image1Can');
var can2= document.getElementById('Image2Can');
can1.addEventListener('click',function(e){
    var ctx=can1.getContext('2d');
    //this if statement erases the point previously drawn
    if ((image1x!=0 || image1y!=0)&&im1switch==0){
        var curimage=document.getElementById('Image1');
        ctx.drawImage(curimage,0,0);
    }
    ctx.fillStyle = "#000000";
    if (im1switch==0){
        image1x=event.pageX-can1.offsetLeft;
        image1y=event.pageY-can1.offsetTop;
        image1x2=0;
        image1y2=0;
        im1switch=1;
        ctx.beginPath();
        ctx.arc(image1x,image1y,2,0,2*Math.PI);
        ctx.fill();
        console.log('image1.1');
        console.log(image1x);
        console.log(image1y);
    }
    else if (im1switch==1){
        image1x2=event.pageX-can1.offsetLeft;
        image1y2=event.pageY-can1.offsetTop;
        im1switch=0;
        ctx.beginPath();
        ctx.arc(image1x2,image1y2,2,0,2*Math.PI);
        ctx.fill();
        ctx.strokeRect(image1x,image1y,(image1x2-image1x),(image1y2-image1y));
        console.log('image1.2');
        console.log(image1x2);
        console.log(image1y2);
    }
    //image1x=event.pageX-can1.offsetLeft;
    //image1y=event.pageY-can1.offsetTop;
    //ctx.beginPath();
    //ctx.arc(image1x,image1y,2,0,2*Math.PI);
    //ctx.fill();
});
can2.addEventListener('click',function(e){
    var ctx=can2.getContext('2d');
    //this if statement erases the point previously drawn
    if (image2x!=0 || image2y!=0){
        var curimage=document.getElementById('Image2');
        ctx.drawImage(curimage,0,0);
    }
    ctx.fillStyle = "#000000";
    if (im2switch==0){
        image2x=event.pageX-can2.offsetLeft;
        image2y=event.pageY-can2.offsetTop;
        image2x2=0;
        image2y2=0;
        im2switch=1;
        ctx.beginPath();
        ctx.arc(image2x,image2y,2,0,2*Math.PI);
        ctx.fill();
        console.log('image2.1');
        console.log(image2x);
        console.log(image2y);
    }
    else if (im2switch==1){
        image2x2=event.pageX-can2.offsetLeft;
        image2y2=event.pageY-can2.offsetTop;
        im2switch=0;
        ctx.beginPath();
        ctx.arc(image2x2,image2y2,2,0,2*Math.PI);
        ctx.fill();
        ctx.strokeRect(image2x,image2y,(image2x2-image2x),(image2y2-image2y));
        console.log('image2.2');
        console.log(image2x2);
        console.log(image2y2);
    }
});
//-------------check form function-------------------------------
function validateForm(n1,n2,n3,n4,n5,n6,n7,n8) {
    if (n1!="" && n2!="" && n3!="" && n4!="" && n5!="" && n6!="" && n7!="" && n8!="") {
        return true;
    }
    else{
        alert("From is not filled out correctly");
        return false;
    }
}
//------subtract array function input array and constant subtracts contant from array--
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
        //--------onload occurs after script is executed and images are loaded
        im1.onload=function(){
            console.log('loaded im1');
            var im1=document.getElementById('Image1');
            var c1=document.getElementById('Image1Can');
            var c1ctx=c1.getContext("2d");
            console.log('image1 dims w,h');
            console.log(im1.width);
            console.log(im1.height);
            c1.width=im1.width;
            c1.height=im1.height;
            c1ctx.drawImage(im1,0,0);


        };
        im2.onload=function(){
            console.log('loaded im2');
            var im2=document.getElementById('Image2');
            var c2=document.getElementById('Image2Can');
            var c2ctx=c2.getContext("2d");
            console.log('image2 dims w,h');
            console.log(im2.width);
            console.log(im2.height);
            c2.width=im2.width;
            c2.height=im2.height;
            c2ctx.drawImage(im2,0,0);


        };
        //put in images
        im1.src='images/'+matchnames[0];
        im2.src='images/'+matchnames[1];
        //var im1=document.getElementById('Image1');
        //var im2=document.getElementById('Image2');
        //var c1=document.getElementById('Image1Can');
        //var c1ctx=c1.getContext("2d");
        //var c2=document.getElementById('Image2Can');
        //var c2ctx=c2.getContext("2d");
        //console.log('image1 dims w,h');
        //console.log(im1.width);
        //console.log(im1.height);
        //console.log('image2 dims w,h');
        //console.log(im2.width);
        //console.log(im2.height);
        //c1.width=im1.width;
        //c2.width=im2.width;
        //c1.height=im1.height;
        //c2.height=im2.height;
        //c1ctx.drawImage(im1,0,0);
        //c2ctx.drawImage(im2,0,0);
    }
    return matchnames;
}
//----------------run everything----------------------------
function initiate(){
    //restore id's to defualt stored in class
    //get values of filenames and remove last space
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
    var imnum = document.forms["reqInfo"]["imid"].value;
    var pdesc = document.forms["reqInfo"]["proname"].value;
    var pgend = document.forms["reqInfo"]["gender"].value;
    var pheight = document.forms["reqInfo"]["ph"].value;
    var pweight = document.forms["reqInfo"]["pw"].value;
    var page = document.forms["reqInfo"]["pa"].value;
    //validate form
    var validation=validateForm(patid,pdate,pdesc,pgend,pheight,pweight,page,imnum);
    //if validated to true proceed
    if (validation){
        //check gender and age to send to phantom matcher
        if(pgend=='male' && page<18){
            //alert('ped male');
            var phantnames=phantommatcher(pheight,pweight,PMfiles,'pm');
        }else if(pgend=='female' && page<18){
            //alert('ped female');
            var phantnames=phantommatcher(pheight,pweight,PFfiles,'pf');
        }else if(pgend=='male' && page>=18){
            // alert('adult male');
            var phantnames=phantommatcher(pheight,pweight,AMfiles,'am');
        }else if(pgend=='female' && page>=18){
            //alert('adult female');
            var phantnames=phantommatcher(pheight,pweight,AFfiles,'af');
        }
        //after match need to add event listeners to images and change ID to LAt and AP
        //alert(phantnames);
        phantomnames=phantnames;//return global variable
        var im1name=phantnames[0];
        var im2name=phantnames[1];
        document.getElementById('Image1Can').setAttribute('class',im1name);
        document.getElementById('Image2Can').setAttribute('class',im2name);
        document.getElementById('Image1Can').style.visibility='visible';
        document.getElementById('Image2Can').style.visibility='visible';
        document.getElementById('inputTextToSave').style.visibility='visible';
        document.getElementById('confirmbutt').style.visibility='visible';
        document.getElementById('inputFileNameToSaveAs').style.visibility='visible';
        document.getElementById('savebutt').style.visibility='visible';
    }
}
