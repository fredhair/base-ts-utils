export * from './lib/array';
import { UtilityArray } from './lib/array';
import { getNumberOrdinal } from './lib/formatting';

const myReadonlyUtilityArray = UtilityArray.populate(10, x => x);
const myObjectUtilityArray = UtilityArray.populate(10, x => ({ index: x, bob: `is your ${numberWithOrdinal(x)} favourite uncle` }));
// const myUtilityArray = new UtilityArray(...populatedArray(10, x => x));

//Error (primitive array)
// myUtilityArray.extractMap('index');

myReadonlyUtilityArray.last = 20;

console.log(myReadonlyUtilityArray[20]);

console.dir(myObjectUtilityArray.extractMap('index', 'bob'));

function numberWithOrdinal(value: number): string { return value + getNumberOrdinal(value); }

const logAndReturn = (x: number) => {
    console.log(numberWithOrdinal(x));
    return x;
}

switch (logAndReturn(10)) {
    case 2: console.log('found it, it was: 2'); break;
    case 4: console.log('found it, it was: 4'); break;
    case 6: console.log('found it, it was: 6'); break;
    case 8: console.log('found it, it was: 8'); break;
    case 10: console.log('found it, it was: 10'); break;
}

console.log(myObjectUtilityArray.findBy('index', 9));

//  findByIndex = (index: number) => myObjectUtilityArray.findBy('index', index);