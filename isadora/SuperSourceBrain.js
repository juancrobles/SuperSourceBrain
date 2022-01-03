
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
SuperSourceBrain.prototype.UpcomingPanelistsArray = []
SuperSourceBrain.prototype.searchPins = [];

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
SuperSourceBrain.prototype.outputSearchPins = function() {
    return this.searchPins.join('\n');
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
    this.searchPins = [];

    // process upcoming panelists
    var upcomingPanelistsData = dataArray[0];
    if(
        upcomingPanelistsData.length !== 0 && 
        upcomingPanelistsData !== 'NONE'&& 
        upcomingPanelistsData !== 'undefined') {
        // we have a valid upcoming panelist(s)

        // test if we have more than one panelist
        if(upcomingPanelistsData.includes(',')) {
            // processing multiple upcoming panelists
            var panelistsArray = upcomingPanelistsData.split(',');

            for( j = 0; j < panelistsArray.length; j++) {
                // test if we have a real pin
                if(panelistsArray === 'NONE' || panelistsArray === 'undefined') {
                    // no valid pin
                } else {
                    // test if we are not the previous panelists and increase panelist count
                    this.visiblePanelists++;
                    
                    this.searchPins.push(panelistsArray[j]);
                    this.totalPanelists++;
                }
            }
        } else {
            // processing one upcoming panelist
            if(upcomingPanelistsData === 'NONE' || upcomingPanelistsData === 'undefined') {
                // no valid pin
            } else {

                this.visiblePanelists++;

                this.searchPins.unshift(upcomingPanelistsData);
                this.totalPanelists++;
            }
        }
    } else {
    }

    // process current panelist
    var currentPanelistData = dataArray[1];

    if(currentPanelistData === 'NONE' || currentPanelistData === 'undefined') {
        // no valid pin
    } else {
        this.visiblePanelists++;
        
        this.searchPins.unshift(currentPanelistData);
        this.totalPanelists++;

        // assign current panelist if we have one
        this.currentPanelist = this.totalPanelists - 1;
    }

    // processing previous panelists
    var previousPanelistsData = dataArray[2];
    if(
        previousPanelistsData.length !== 0 && 
        previousPanelistsData !== 'NONE'&& 
        previousPanelistsData !== 'undefined') {
        // we have a valid upcoming panelist(s)
 
        // test if we have more than one panelist
        if(previousPanelistsData.includes(',')) {
            // processing multiple upcoming panelists
            var panelistsArray = previousPanelistsData.split(',');

            for( j = 0; j < panelistsArray.length; j++) {
                // test if we have a real pin
                if(panelistsArray === 'NONE' || panelistsArray === 'undefined') {
                    // no valid pin
                } else {
                    // test if we are not the previous panelists and increase panelist count

                    this.invisiblePanelists++;

                    this.totalPanelists++;
                }
            }
        } else {
            // processing one upcoming panelist
            if(previousPanelistsData === 'NONE' || previousPanelistsData === 'undefined') {
                // no valid pin
            } else {
                this.invisiblePanelists++;

                this.totalPanelists++;
            }
        }
    } else {
    }

}
 

// here we create an instance of our container
var superSourceBrain = new SuperSourceBrain(); 

function main()
{
	// iz_input 1 "HandsAPI"
	superSourceBrain.inputHandsAPI(arguments[0]);

	// iz_input 2 "SuccessAPI"
	superSourceBrain.inputSuccessAPI(arguments[1]);

	// iz_input 3 "Max Boxes"
	superSourceBrain.inputMaxBoxes(arguments[2]);

	// we return our real outpus followed by the "DEBUG OUTPUTS" string
	// and any variable that help to trace the funcionality of the actor
	return [
		// iz_output 1 "Super Source Name"
		superSourceBrain.outputSuperSourceName(),
		// iz_output 2 "Super Source Updated"
		superSourceBrain.outputSuperSourceUpdated(),
		// iz_output 3 "Search Pins"
		superSourceBrain.outputSearchPins(),

		// iz_output 4 "DEBUG"
		"DEBUG OUTPUTS",
		// iz_output 5 "Total panelists"
		superSourceBrain.totalPanelists,
		// iz_output 6 "Visible panelists"
		superSourceBrain.visiblePanelists,
		// iz_output 7 "Invisible panelists"
		superSourceBrain.invisiblePanelists,
		// iz_output 8 "current panelist index"
		superSourceBrain.currentPanelist
	];
}