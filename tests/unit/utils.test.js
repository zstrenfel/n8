const axios = require('axios');
const {
  parseWebpage,
  extractText,
  countWords,
  splitText,
  formatWord,
} = require('../../utils');

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

  it('should raise error on failure to fetch webpage.', async () => {
    axios.get.mockRejectedValue(new Error('404!!!!!'));
    await expect(parseWebpage('https://digiorno-is-bad.com')).rejects.toThrow();
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

  it('should ignore content from script/style tags', () => {
    const expected = 'personal pan-pizza';
    const scripText = `<script>makeMe()</script><style>toppings { anchovies }</style><div>${expected}</div>`;
    const actual = extractText(scripText);
    expect(actual).toEqual(expected);
  });
});

describe('splitText', () => {
  it('should split text according to line breaks.', () => {
    let text = 'Take-n-bake';
    const expected = new Array(4).fill(text);

    text += ['\n', '\r\n', '\r']
      .map(lineBreak => `${lineBreak}${text}`)
      .join('');
    const actual = splitText(text);
    expect(actual).toEqual(expected);
  });
});

describe('formatWord', () => {
  it('should remove unwanted punctuation.', () => {
    const text = '[$$"#/piz{};z%=a:~~^^^~*]';
    expect(formatWord(text)).toEqual('pizza');
  });

  it('should convert all chars to lowercase', () => {
    const text = 'SCREAMINGFORPIZZA';
    expect(formatWord(text)).toEqual(text.toLowerCase());
  });

  it('should convert all chars to lowercase', () => {
    const text = '   pizza to my left';
    expect(formatWord(text)).toEqual(text.trim());
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
    expect(countWords(EXAMPLE_TEXT)).toStrictEqual(expected);
  });
});
