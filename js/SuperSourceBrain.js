
/**
 * Define the UserActor container 
 */
 function SuperSourceBrain() {}

 /**
  * Define all internal variables to a known value
  */
 SuperSourceBrain.prototype.apiData = null;
 SuperSourceBrain.prototype.apiSuccess = false;
 SuperSourceBrain.prototype.superSourceName = "NOSOURCE";
 SuperSourceBrain.prototype.superSourceUpdated = false;
 // SuperSourceBrain.prototype.visiblePanelists = 0;
 // SuperSourceBrain.prototype.invisiblePanelists = 0;
 // SuperSourceBrain.prototype.currentPanelist = -1;
 SuperSourceBrain.prototype.maxBoxes = 3;
 
 
 /**
  * Define the input HandsAPI
  * @param {*} data 
  */
 SuperSourceBrain.prototype.inputHandsAPI = function(data) {
     if( data === null || data === 'undefined' || data.length === 0 )
         return;
 
     this.apiData = data;
 };
 
 /**
  * Define the input success API
  */
 SuperSourceBrain.prototype.inputSuccessAPI = function(result) {
     this.apiSuccess = result == 1 ? true : false;
 
     if(
         this.apiSuccess == true && this.apiData !== null && 
         this.apiData !== "" && this.apiData !== 'undefined') {
         this.updateStatus();
     }
 }
 
 /**
  * Define the output SuperSourceName
  * @returns the active super source name
  */
 SuperSourceBrain.prototype.outputSuperSourceName = function() {
     return this.superSourceName;
 }
 
 SuperSourceBrain.prototype.outputSuperSourceUpdated = function() {
     return this.superSourceUpdated;
 }
 
 SuperSourceBrain.prototype.updateStatus = function() {
     // console.log("updateStatus");
 
     // parsing received data
     var panelistCounts = this.parseData();
 
     var totalPanelists = panelistCounts[1] + panelistCounts[2];
     var startSubstring = panelistCounts[2];
     // console.log("total panelists: ", totalPanelists, "start substring: ", startSubstring);
 
     // build array of boxes
     var boxCount = 1;
     var boxesArray = [];
     for( i = 0; i < totalPanelists; i++) {
         if(boxCount > this.maxBoxes)
             boxCount = 1;
         
         boxesArray.push(boxCount.toString(10));
 
         boxCount++;
     }
 
     // console.log("boxesArray:", boxesArray.join(''));
     var boxesString = boxesArray.join('');
 
     if(totalPanelists !== 0 ) {
 
         var substring = "NOSOURCE";
         if((startSubstring + this.maxBoxes) > totalPanelists) {
             substring = boxesString.substring(startSubstring);
         } else {
             substring = boxesString.substring(startSubstring, startSubstring + this.maxBoxes);
         }
         
         // console.log("substring: ", substring);
         
         if(substring === "")
             substring = 'NOSOURCE';
 
         this.superSourceName = substring;
         this.superSourceUpdated = true;
     } else {
         this.superSourceName = 'NOSOURCE';
         this.superSourceUpdated = true;
     }
     // updata output data
 /*    switch (panelistCount) {
         case 1:
             this.superSourceName = '1';
             this.superSourceUpdated = true;
         break;
     
         case 2:
             this.superSourceName = '12';
             this.superSourceUpdated = true;
         break;
     
         default:*/
 /*            break;
     }*/
 }
 
 SuperSourceBrain.prototype.parseData = function() {
     // split data into array
     // console.log("content of data", this.apiData);
     var dataArray = this.apiData.match(/[^\r\n]+/g);
 
     var visiblePanelists = 0;
     var invisiblePanelists = 0;
     var currentPanelist = -1;
 
     for( i = 0; i < dataArray.length; i++) {
         // test if we have multiple values
         if(dataArray[i].includes(',')) {
             // console.log("this line contains multiple values");
             // processing multiple panelists
             var panelistsArray = dataArray[i].split(',');
             // console.log("panelists count: ", panelistsArray.length);
             for( j = 0; j < panelistsArray.length; j++) {
                 // console.log("state:", i, "panelist No.", j, "panelist: ", panelistsArray);
                 if(panelistsArray === 'NONE' || panelistsArray === 'undefined') {
                     // console.log("invalid id");
     
                 } else {
                     // console.log("valid id");
                     // test if we are not the previous panelists increase panelist count
                     if(i < 2)
                         visiblePanelists++;
                     else
                         invisiblePanelists++;
 
                     /*if(i == 1)
                         currentPanelist = i;*/
                 }
             }
         } else {
             // processing one panelist
             // console.log("this line only contains one value", dataArray[i]);
 
             // test for invalid id
             if(dataArray[i] === 'NONE' || dataArray[i] === 'undefined') {
                 // console.log("invalid id");
 
             } else {
                 // console.log("valid id");
                 // this is a special case when only have one panelist
                 if(i < 2)
                     visiblePanelists++;
                 else
                     invisiblePanelists++;
                 
                 if(i == 1)
                     currentPanelist = i;
             }
         }
     }
     return [currentPanelist, visiblePanelists, invisiblePanelists];
 }
 

// this line is necesary for running the tests and 
// should not be copied to the isadora javascript actor
module.exports = SuperSourceBrain;