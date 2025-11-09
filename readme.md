# JSON2Dts

a lib for converting JSON to TypeScript interfaces

## Installation

```bash
npm install json2dts
```
## Usage

```typescript
import { JSON2Dts } from 'json2dts';

const json = {
  name: 'John',
  age: 30,
  address: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001'
  }
};

const convert = new JSON2Dts();
const interfaces = convert.transformByJSON(json);
console.log(interfaces);
```

If you only have a JSON string, you can use the `transformByJSONString` method

```typescript
import { JSON2Dts } from 'json2dts';

const jsonString = '{"name": "John", "age": 30, "address": {"street": "123 Main St", "city": "New York", "state": "NY", "zip": "10001"}}';

const convert = new JSON2Dts();
const interfaces = convert.transformByJSONString(jsonString);
console.log(interfaces);
```

## Try it online

you can try it online [here](https://wesmile2020.github.io/json2dts/)
