const fs = require('fs');

(async () => {
    try {
        const pdflib = await import('pdf-parse');
        const pdf = pdflib.default || pdflib;
        const dataBuffer = fs.readFileSync('docs/Bitelearn_중간발표.pdf');
        const data = await pdf(dataBuffer);
        fs.writeFileSync('docs/Bitelearn_중간발표.raw.md', data.text, 'utf8');
        console.log("Success");
    } catch (e) {
        console.error("Error occurred:");
        console.error(e);
    }
})();
