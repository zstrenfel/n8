const axios = require('axios');
const { parseWebpage, extractText } = require('../../utils');

jest.mock('axios');

const EXAMPLE_TEXT = 'Digiorno pizza is delicious.';

const webpage = `
<!DOCTYPE html>
<html>
<body>
<div>
Digiorno
<p>pizza</p>
<p>is</p>
</div>
<div>
delicious.
</div>
</body>
</html>`;

describe('parseWebpage', () => {
  it('should handle text/plain websites by splitting on new lines', async () => {
    axios.get.mockResolvedValue({
      headers: { 'content-type': 'text/plain' },
      data: `${EXAMPLE_TEXT}\n${EXAMPLE_TEXT}`,
    });

    expected = Array(2).fill(EXAMPLE_TEXT);
    const actual = await parseWebpage('https://digiorno.com/big.txt');
    expect(actual).toEqual(expect.arrayContaining(expected));
  });

  it('should handle html websites by returning text only', async () => {
    axios.get.mockResolvedValue({
      headers: { 'content-type': 'text/html' },
      data: webpage,
    });

    expected = EXAMPLE_TEXT.split(' ');
    const actual = await parseWebpage('https://digiorno.com');
    expect(actual).toEqual(expect.arrayContaining(expected));
  });
});

describe('extractText', () => {
  it('should extract text from webpage text nodes"', () => {
    const expected = EXAMPLE_TEXT.split(' ');
    const actual = extractText(webpage);
    expect(actual).toEqual(expect.arrayContaining(expected));
  });
});
