/**
 * @author Thomas Rupprecht
 * @version 0.0.1
 */

var Trigonometric = {

  /**
   * Calculate the distances in every dimension from to x-dimension Points
   * @param {number[]} p1
   * @param {number[]} p2
   * @returns {number[]} distances
   */
  getDimensionDistancesFromPoints: function (p1, p2) {
    if (p1.length !== p2.length) {
      throw 'Points need the same dimension!';
    }

    var distances = [];

    p1.forEach(function (value, dimension) {
      var dimensionDistance = Math.abs(value - p2[dimension]);
      distances.push(dimensionDistance);
    });

    return distances
  },

  /**
   * Calculate the distance with specific norm (metric) from x-dimension distances
   * If no norm is set, the euclidean distance gets calculated
   * @param {number[]} distances
   * @param {number} [norm=2]
   * @returns {number} distance
   */
  getDistanceFromDimesionDistances: function (distances, norm) {
    if (!norm) {
      norm = 2;
    }

    if (norm < 1) {
      console.info('Quasinorm!');
    }

    var distance;

    if (norm === Infinity) {
      distance = Math.max.apply(null, distances);
    } else {
      distances = distances.map(function (v) {
        return Math.pow(v, norm);
      });
      distance = distances.reduce(function (pv, cv) {
        return pv + cv;
      });
      distance = Math.pow(distance, 1/norm);
    }

    return distance;
  },


  /**
   * Calculate the radian form a XY Point to Null-Point (North is 0; -PI to +PI)
   * @param {number} x - distance in x direction
   * @param {number} y - distance in y direction
   * @returns {number} radian - radian from the XY Point to Null-Point
   */
  getRadianFromXY: function (x, y) {
    return Math.atan2(x, y);
  },


  /**
   * Converts degree to radian
   * @param {number} degree
   * @returns {number} radian
   */
  getRadianFromDegree: function (degree) {
    return degree * Math.PI / 180;
  },

  /**
   * Converts radian to degree
   * @param {number} radian
   * @returns {number} degree
   */
  getDegreeFromRadian: function (radian) {
    return radian * 180 / Math.PI;
  },


  /**
   * Converts a -180°/+180° value into a 0°/360° value
   * @param {number} degree
   * @returns {number} compassDegree
   */
  getCompassDegreeFromDegree: function (degree) {
    return (degree + 360) % 360;
  },

  /**
   * Converts a 0°/360° value into a -180°/+180° value
   * @param {number} compassDegree
   * @returns {number} degree
   */
  getDegreeFromCompassDegree: function (compassDegree) {
    var degree;
    if (compassDegree > 180) {
      degree = compassDegree - 360;
    } else {
      degree = compassDegree;
    }

    return degree;
  },


  /**
   * Converts radian (-PI/+PI) into degree (0°/360°)
   * @param {number} radian
   * @returns {number} compassDegree
   */
  getCompassDegreeFromRadian: function (radian) {
    return Trigonometric.getCompassDegreeFromDegree(Trigonometric.getDegreeFromRadian(radian));
  },

  /**
   * Converts degree (0°/360°) into radian (-PI/+PI)
   * @param {number} compassDegree
   * @returns {number} radian
   */
  getRadianFromCompassDegree: function (compassDegree) {
    return Trigonometric.getRadianFromDegree(Trigonometric.getDegreeFromCompassDegree(compassDegree));
  },


  /**
   * Calculates a point on a circle from a radian and radius and optional offset
   * @param {number} radian
   * @param {number} radius
   * @param {Array.<number, number>} [offset=[0, 0]]
   * @returns {Array.<number, number>} point
   */
  getCirclePointFromRadianRadius: function (radian, radius, offset) {
    if (!offset) {
      offset = [0, 0];
    }

    return [
      Math.sin(radian) * radius + offset[0],
      Math.cos(radian) * radius + offset[1]
    ];
  }

};

module.exports = Trigonometric;
