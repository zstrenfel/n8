
# N8 Backend Challenge

## Running Locally via Docker
You'll need to create a docker image via the `Dockerfile` in order to run the application.
```
> docker build docker build . -t zstrenfel/n8-backend challenge
// Then run the container using:
> docker -d -p 3000:3000 zstrenfel/n8-backend challenge
XXXXX // (Output) Auto-generated ID you can use to close the container (different every time).
...
> docker stop XXXXX
```
Once the docker container is running, you can query the API using `curl`:
```
> curl localhost:3000/count?url=https://google.com
{"2021":1,"terms":1,"":3,"privacy":1,"©":1,"about":1,"google":1,"business":1,"solutions":1,"advertising�programs":1,"a":2,"virtual":1,"hike":1,"for":1,"all":1,"walkers":1,"take":1,"journey":1,"through":1,"the":1,"camino":1,"de":1,"santiago":1,"advanced":1,"search":2,"sign":1,"in":1,"|":2,"settings":1,"web":1,"history":1,"»":1,"more":1,"drive":1,"gmail":1,"news":1,"youtube":1,"play":1,"maps":1,"images":1}%
```
Cool! 🤠

## Performance
Overhead for my implementation comes from two operations:

1. Iterating through all HTML nodes in order to find nodes with `node.nodeType === 3` (3, in this case, represents text nodes). This is only application to `text/html` pages.
2. Iterating through all words parsed from a page, and incrementing how frequently they occur.

I settled on this implementation after initially trying to find an implementation of the [`HTMLElement.innerText`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText) property in a server-side DOM parsing library. Unfortunately, non have this feature.

I also thought about using a regex to grep for all the HTML tags I was interested in, but dealing with finicky regular expressions was not high on my list of things I wanted to do in my free time.

### Performance Details
In lieu of using an external library to collect metrics, I added `console.debug` statements that print out the time in ms for each operation to complete. I then ran each URL through the `GET /count` route in order to approximate average time.
```
> for i in {1..10}; do curl "localhost:3000/count?url=https://norvig.com/big.txt" -w '%{time_total}' --output /dev/null --silent && echo; done
```
**Avg Operation Execution Time**
| url | content-size | GET url | text extraction time | word count time | total time
|--|--|--|--|--|--|
| `https://google.com` | 36kb |~235ms| ~35ms | ~0ms | ~270ms|
|`https://norvig.big.txt`|6mb|~500ms|N/A|~570ms|~1100ms

## Testing
Both unit tests and integration tests are included in the `tests` folder. This can be run using the `npm test` and `npm run test:integration` commands, respectively.

I chose [Jest](https://jestjs.io/) as my test framework, as that is the framework I am most familiar with, from my previous experiences working with JS (on the frontend side).

#### Test Coverage
```----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |   96.15 |    83.33 |     100 |   96.15 |
 app.js   |     100 |      100 |     100 |     100 |
 utils.js |   94.73 |       80 |     100 |   94.73 | 22,37
----------|---------|----------|---------|---------|-------------------
```


> **A Note On Integration Tests**
I am using the [`supertest`](https://github.com/visionmedia/supertest) module in order to start the express server that serves our integration tests. The purpose of these tests is to test the end-to-end functionality of the app. Thusly, they are making real requests to website URLs and parsing the results.

## Implementation Details
- Due to time constraints, I wasn't able to implement typescript completely. While I was able to run the server using this language, I was leaning on the `any` type quite heavily for types from different packages (`axios`, `express`, etc). I also had trouble mocking modules in the tests, when compiling them using the [`ts-jest`](https://github.com/kulshekhar/ts-jest) Jest extension. I opted to exclude this functionality in the master branch, but you can view my attempts to convert JS to TS on the `typescript-implementations` .
- This project has been implemented in Javascript (if you weren't aware up to this point, haha). I chose this language as I had the most familiarity with it. Had I had more free time in the past week, I would have preferred to use Go. I have never used this language before, but this project would have served as a good introduction, I believe.
- As an aside, while I note that I have familiarity with JS, I haven't used it in ~3 years. I may be a bit rusty, so if my code doesn't follow the most idiomatic practices, oops!

 


