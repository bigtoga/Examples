

var lettersArray = ["a", "b", "c", "d"];

// Use push() to append an item to an array
lettersArray.push("e");
lettersArray.push("f");
console.log("Use push() to append an item to an array:");
console.log(lettersArray);

// Use slice() to return selected items of an array
console.log("Use slice() to return selected items of an array");
var slicedArray1 = lettersArray.slice(1);
// Return the first three items of an array
var slicedArray2 = lettersArray.slice(0, 3);
// Return the second and third items of an array
var slicedArray3 = lettersArray.slice(1, 3);


// Use join() to return items of an array into a single string
var joinedArray = lettersArray.join(", ");
console.log("Use join() to return items of an array into a single string:");
console.log(joinedArray);
