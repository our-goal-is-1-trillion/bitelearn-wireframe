import fs from 'fs';
import pdf from 'pdf-parse';

const dataBuffer = fs.readFileSync('docs/Bitelearn_중간발표.pdf');
pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('docs/Bitelearn_중간발표.raw.md', data.text, 'utf8');
}).catch(e => console.error(e));
