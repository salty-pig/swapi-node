'use strict';

function deprecate (message) {
  console.log(`DEPRECATION NOTICE: ${message}`);
}

function capitaliseFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  deprecate,
  capitaliseFirstLetter
};
