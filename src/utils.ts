const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const TEXT_NODE = 3;
const SCRIPT_TAG = 'SCRIPT';

export async function parseWebpage(url: string) {
  try {
    const response = await axios.get(url);

    // Plain text documents don't have HTML nodes to parse...
    if (response.headers['content-type'] == 'text/plain') {
      return response.data;
    }

    return extractText(response.data);
  } catch (error) {
    console.log(error);
    throw new Error('Could not access website URL.');
  }
}

export function extractText(htmlString: string) {
  // Iterates through DOM nodes in order to find text elements.
  const dom = new JSDOM(htmlString);
  const text = [];
  const stack = [dom.window.document.body];

  while (stack.length) {
    const node = stack.pop();
    // Skip script tags, since we don't want to count that content.
    if (node.nodeName == SCRIPT_TAG) {
      continue;
    }

    if (node.nodeType == TEXT_NODE) {
      const nodeText = node.textContent.trim();
      if (nodeText) {
        text.push(nodeText);
      }
    }

    stack.push(...node.childNodes);
  }

  return text.join(' ');
}

// Split out to make it easier to test :^)
export function splitText(text: string) {
  return text.replace(/(\r\n|\n|\r)/g, ' ').split(' ');
}

// Split out to make it easier to test :^)
export function formatWord(word: string) {
  return word
    .trim()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\[\]\"]/g, '')
    .toLowerCase();
}

export function countWords(text: string) {
  const counts: { [index: string]: number } = {};
  splitText(text).forEach(rawWord => {
    const word = formatWord(rawWord);
    if (!(word in counts)) {
      counts[word] = 0;
    }
    counts[word]++;
  });

  return counts;
}