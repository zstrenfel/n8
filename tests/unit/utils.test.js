const axios = require('axios');
const { parseWebpage, extractText, countWords } = require('../../utils');

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
      data: EXAMPLE_TEXT,
    });

    const expected = EXAMPLE_TEXT;
    const actual = await parseWebpage('https://digiorno.com/big.txt');
    expect(actual).toEqual(expected);
  });

  it('should handle html websites by returning text only', async () => {
    axios.get.mockResolvedValue({
      headers: { 'content-type': 'text/html' },
      data: webpage,
    });

    const expected_strings = EXAMPLE_TEXT.split(' ');
    const actual = await parseWebpage('https://digiorno.com');
    expected_strings.forEach(expected => {
      expect(actual).toEqual(expect.stringContaining(expected));
    });
  });
});

describe('extractText', () => {
  it('should extract text from webpage text nodes"', () => {
    const expected_strings = EXAMPLE_TEXT.split(' ');
    const actual = extractText(webpage);
    expected_strings.forEach(expected => {
      expect(actual).toEqual(expect.stringContaining(expected));
    });
  });
});

describe('countWords', () => {
  it('should count the words for the given text', () => {
    const expected = {
      digiorno: 1,
      pizza: 1,
      is: 1,
      delicious: 1,
    };
    const actual = countWords(EXAMPLE_TEXT);
    expect(actual).toStrictEqual(expected);
  });
});
