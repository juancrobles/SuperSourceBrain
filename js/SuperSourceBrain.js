
/**
 * Define the UserActor container 
 */
function SuperSourceBrain() {}

/**
 * Define all internal variables to a known value
 */
SuperSourceBrain.prototype.baString = "";
SuperSourceBrain.prototype.superSourceName = "NOSOURCE";


/**
 * Define the input BAString
 * @param {*} ba_string 
 */
SuperSourceBrain.prototype.inputBAString = function(ba_string) {
    this.baString = ba_string;
};

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