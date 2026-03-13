const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('../Bitelearn_중간발표.pdf');
pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('../Bitelearn_중간발표.raw.md', data.text, 'utf8');
}).catch(e => console.error(e));
