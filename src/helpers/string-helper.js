export function convertToPascalCase(text) {
  return text.replace(/\w+/g,
    (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
}

export function firstWordUpperCase(text) {
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

export function convertToHtmlDocument(html, css) {
  return `${html}<style>${css}</style>`;
}

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
