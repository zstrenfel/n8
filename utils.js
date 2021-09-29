const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const TEXT_NODE = 3;
const SCRIPT_TAG = 'SCRIPT';
const STYLE_TAG = 'STYLE';
const IGNORE_TAGS = [SCRIPT_TAG, STYLE_TAG];

async function parseWebpage(url) {
  try {
    const t0 = new Date().getTime();
    const response = await axios.get(url);
    console.debug(`GET on url ${url} in ${new Date().getTime() - t0}ms`);

    // Plain text documents don't have HTML nodes to parse...
    if (response.headers['content-type'] == 'text/plain') {
      return response.data;
    }

    return extractText(response.data);
  } catch (error) {
    console.log(error.toJSON());
    throw new Error(`Error fetching URL: ${url}`);
  }
}

function extractText(htmlString) {
  // Iterates through DOM nodes in order to find text elements.
  const t0 = new Date().getTime();

  const dom = new JSDOM(htmlString);
  const text = [];
  const stack = [dom.window.document.body];

  while (stack.length) {
    const node = stack.pop();
    // Skip script/style tags, since we don't want to include that content.
    const { nodeName } = node;
    if (IGNORE_TAGS.includes(nodeName)) {
      continue;
    }

    if (node.nodeType == TEXT_NODE) {
      nodeText = node.textContent.trim();
      if (nodeText) {
        text.push(nodeText);
      }
    }

    stack.push(...node.childNodes);
  }

  // Returning as a string to keep parity with text/plain webpages.
  console.debug(
    `Extracted text from webpage in ${new Date().getTime() - t0}ms`,
  );
  return text.join(' ');
}

// Split out to make it easier to test :^)
function splitText(text) {
  return text.replace(/(\r\n|\n|\r)/g, ' ').split(' ');
}

// Split out to make it easier to test :^)
function formatWord(word) {
  return word
    .trim()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\[\]\"]/g, '')
    .toLowerCase();
}

function countWords(text) {
  t0 = new Date().getTime();
  counts = {};
  splitText(text).forEach(rawWord => {
    word = formatWord(rawWord);
    if (!(word in counts)) {
      counts[word] = 0;
    }
    counts[word]++;
  });

  console.debug(`Words counted in ${new Date().getTime() - t0}ms`);
  return counts;
}

module.exports = {
  parseWebpage,
  extractText,
  countWords,
  splitText,
  formatWord,
};
