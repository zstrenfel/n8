const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const TEXT_NODE = 3;

async function parseWebpage(url) {
  try {
    const response = await axios.get(url);

    if (response.headers['content-type'] == 'text/plain') {
      return response.data.split('\n');
    }

    return extractText(response.data);
  } catch (error) {
    console.log(error);
  }
}

function extractText(htmlString) {
  // Iterates through DOM nodes in order to find text elements.
  const dom = new JSDOM(htmlString);
  const text = [];
  const stack = [dom.window.document.body];

  while (stack.length) {
    const node = stack.pop();

    if (node.nodeType == TEXT_NODE) {
      nodeText = node.textContent.trim();
      if (nodeText) {
        text.push(nodeText);
      }
    }

    stack.push(...node.childNodes);
  }

  return text;
}

function countWords(text) {}

module.exports = {
  parseWebpage: parseWebpage,
  extractText: extractText,
};
