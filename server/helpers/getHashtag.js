const letters = /^[A-Za-z]+$/;

function getHashTags(string) {
  let i = 0;
  const hashTags = [];
  while (i < string.length) {
    let currentChar = string[i] || null;

    if (currentChar === "#") {
      let currentHashTag = "";
      i++;
      currentChar = string[i] || null;
      while (currentChar && currentChar.match(letters)) {
        currentHashTag += currentChar;
        i++;
        currentChar = string[i] || null;
      }

      hashTags.push(currentHashTag);
      currentHashTag = "";
    }

    i++;
  }
  return hashTags;
}

module.exports = getHashTags;
