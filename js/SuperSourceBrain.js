
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
SuperSourceBrain.prototype.maxBoxes = 4;
SuperSourceBrain.prototype.totalPanelists = 0;
SuperSourceBrain.prototype.visiblePanelists = 0;
SuperSourceBrain.prototype.invisiblePanelists = 0;
SuperSourceBrain.prototype.currentPanelist = -1;
 
/**
 * Define the input HandsAPI
 * @param {*} data 
 */
SuperSourceBrain.prototype.inputHandsAPI = function(data) {
    // validating that we receive useful data
    if( data === null || data === 'undefined' || data.length === 0 )
        return;

    // store data
    this.apiData = data;
};
 
/**
 * Define the input success API
 */
SuperSourceBrain.prototype.inputSuccessAPI = function(result) {
    // validating that we receive useful data
    this.apiSuccess = result == 1 ? true : false;

    // test if we have all necesary data to update the result
    if(
        this.apiSuccess == true && this.apiData !== null && 
        this.apiData !== "" && this.apiData !== 'undefined'
    ) {
        this.updateStatus();
    }
}

SuperSourceBrain.prototype.inputMaxBoxes = function(value) {
    if(this.maxBoxes !== value)
        this.maxBoxes = value;
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

    // parsing received data in array format
    this.parseData();

    // create local variables to make clearer each operation
    var startSubstring = this.invisiblePanelists;
 
    // build array of boxes
    var boxCount = 1;
    var boxesArray = [];
    for( i = 0; i < this.totalPanelists; i++) {
        // reset box count if we have more panelists than boxes
        if(boxCount > this.maxBoxes)
            boxCount = 1;
        
        // append new box name
        boxesArray.push(boxCount.toString(10));

        boxCount++;
    }
 
    // convert array of boxes to a string
    var boxesString = boxesArray.join('');
 
    // test if we have any panelist 
    if(this.totalPanelists !== 0 ) {
        // at least we have one panelist
        // set result super soruce name to NOSOURCE
        var ssName = "NOSOURCE";

        // test if we have enough panelists to use all the boxes availables
        if((startSubstring + this.maxBoxes) > this.totalPanelists) {
            // not enough panelists fot the boxes available
            ssName = boxesString.substring(startSubstring);
        } else {
            // we have more panelists than boxes
            ssName = boxesString.substring(startSubstring, startSubstring + this.maxBoxes);
        }
         
        // if the resulting supersource is empty
        // we return NOSOURCE
        if(ssName === "")
            ssName = 'NOSOURCE';

        this.superSourceName = ssName;
        this.superSourceUpdated = true;
    } else {
        // with no panelists we return NOSOURCE
        this.superSourceName = 'NOSOURCE';
        this.superSourceUpdated = true;
    }
}

SuperSourceBrain.prototype.parseData = function() {
    // split data into an array
    var dataArray = this.apiData.match(/[^\r\n]+/g);

    // seting local variables to a known state
    this.visiblePanelists = 0;
    this.invisiblePanelists = 0;
    this.currentPanelist = -1;
    this.totalPanelists = 0;

    // evaluate each item on the array
    for( i = 0; i < dataArray.length; i++) {
        // test if we have multiple values
        if(dataArray[i].includes(',')) {
            // processing multiple panelists
            var panelistsArray = dataArray[i].split(',');

            // process each value
            for( j = 0; j < panelistsArray.length; j++) {
                // test if we have a real pin
                if(panelistsArray === 'NONE' || panelistsArray === 'undefined') {
                    // no valid pin
                } else {
                    // test if we are not the previous panelists and increase panelist count
                    if(i < 2)
                        this.visiblePanelists++;
                    else
                        this.invisiblePanelists++;
                        
                    this.totalPanelists++;
                }
            }
        } else {
            // processing one panelist
            // test if we have a real pin
            if(dataArray[i] === 'NONE' || dataArray[i] === 'undefined') {
                // no valid pin
            } else {
                // test if we are not the previous panelists and increase panelist count
                if(i < 2)
                    this.visiblePanelists++;
                else
                    this.invisiblePanelists++;
                
                this.totalPanelists++;

                // assign current panelist if we have one
                if(i === 1) {
                    this.currentPanelist = this.totalPanelists - 1;
                }
            }
        }
    }
}
 

// this line is necesary for running the tests and 
// should not be copied to the isadora javascript actor
module.exports = SuperSourceBrain;