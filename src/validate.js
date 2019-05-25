const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());

console.log('capitalized', capitalizeEveryWord('tesasdf thisdf name'));

const data = new Map();

data.set(1, { id: 1, val: 200, name: 'first person' });
data.set(2, { id: 2, val: 100, name: 'second person' });
data.set(3, { id: 3, val: 150, name: 'second person' });

for (let [idx, entry] of data) {
  console.log('entry', idx, entry);
}

// const sortedData = new Map([...data.entries()].sort((a, b) => a.val - b.val));

// // console.log('sortedData', sortedData);

// sortedData.forEach(row => {
//   // console.log('row', row);
// });
