
/**
 * Define the UserActor container 
 */
function SuperSourceBrain() {}

/**
 * Define all internal variables to a known value
 */
SuperSourceBrain.prototype.baString = "";
SuperSourceBrain.prototype.odlBAString = "";
SuperSourceBrain.prototype.superSourceName = "NOSOURCE";
SuperSourceBrain.prototype.baArray = [];
SuperSourceBrain.prototype.baCount = 0;


/**
 * Define the input BAString
 * @param {*} ba_string 
 */
SuperSourceBrain.prototype.inputBAString = function(ba_string) {
    if(this.baString !== ba_string) {
        this.odlBAString = this.baString;
        this.baString = ba_string;
    }
    
    this.baArray = this.baString.match(/[^\r\n]+/g);
    this.baCount = this.baArray.length;
};

/**
 * Define the input process
 */
SuperSourceBrain.prototype.inputProcess = function() {
    if(this.baCount == 1)
        this.superSourceName = "1";
}

/**
 * Definte the input reset
 */
SuperSourceBrain.prototype.inputReset = function() {

}

/**
 * Define the output SuperSourceName
 * @returns the active super source name
 */
SuperSourceBrain.prototype.outputSuperSourceName = function() {
    return this.superSourceName;
}


// this line is necesary for running the tests and 
// should not be copied to the isadora javascript actor
module.exports = SuperSourceBrain;