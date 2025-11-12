# convert_json2dts

a lib for converting JSON to TypeScript interfaces

## Installation

```bash
npm install convert_json2dts
```

## Usage

### Get TypeScript interfaces corresponding to JSON
```typescript
import { JSON2Dts } from 'convert_json2dts';

const data = {
  name: 'John',
  age: 30,
};

const convert = new JSON2Dts();
const interfaces = convert.transformByJSON(data);
console.log(interfaces);
// output:
/*
interface RootType {
  name: string;
  age: number;
}
*/

// if you only have a json string you can use `transformByJSONString` method
const jsonString = JSON.stringify(data);
const interfaces_1 = JSON2Dts.transformByJSONString(jsonString);
```

### Get `.d.ts` code from a JSON file
```typescript
import { JSON2Dts } from 'convert_json2dts';

const json = {
  name: 'John',
  age: 30,
};

const convert = new JSON2Dts();
const interfaces = convert.convertJSONToDts(json);
console.log(interfaces);
// output:
/*
interface RootType {
    name: string;
    age: number;
}

declare const root: RootType;
export default root;
export declare const name: RootType['name'];
export declare const age: RootType['age'];
*/
```

## Try it online

you can try it online [here](https://wesmile2020.github.io/convert_json2dts/)
