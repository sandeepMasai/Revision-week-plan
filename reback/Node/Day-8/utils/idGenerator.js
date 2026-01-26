let counter = 1;

function generateId() {
  return counter++;
}

module.exports = generateId;
