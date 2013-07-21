/** 
 * Example of use:
 *
 * var ex = new Perceptron(2,0.1)
 *
 * for (i=0; i<100; i++) {
 *      ex.learn([0,0],0);
 *      ex.learn([0,1],0);
 *      ex.learn([1,0],1);
 *      ex.learn([1,1],1);
 * }
 */

"use strict";
var Perceptron = function(d,a) {
    var i;

    this.w = [];
    this.a = a;

    for (i=0; i<d; i++) {
        this.w[i] = Math.random(); 
    }
    this.u = 0.5;

};

Perceptron.prototype = {

    step: function(x) {
        return this._getValue(x)>this.u?1:0;
    },

    learn: function(x,y) {
        var i,
        w = this.w,
        d = w.length,
        value = this._getValue(x);

        for (i=0; i<d; i++) {
            w[i] = w[i] + this.a*(y-value)*x[i];
        }
    },

    _getValue: function(x) {
        var i,
        w = this.w,
        d = w.length,
        sum = 0;

        if (x.length !== d) {
            throw "Invalid input";
        }

        for (i=0; i<d; i++) {
            sum += x[i]*w[i]; 
        }

        return sum;
    }
};

