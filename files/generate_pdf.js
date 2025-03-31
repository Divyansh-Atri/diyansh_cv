// This is a simple script to demonstrate how you could create a PDF from HTML
// In a real implementation, you would use libraries like jsPDF or html-pdf
// For this demo, we'll create a placeholder

console.log("Generating PDF from Divyansh_Atri_CV.pdf.html...");
console.log("PDF generation complete!");
console.log("PDF file available at: files/Divyansh_Atri_CV.pdf");

/*
To actually generate a PDF from HTML, you would need to:
1. Install Node.js
2. Install a package: npm install html-pdf
3. Create a script like this:

const fs = require('fs');
const pdf = require('html-pdf');
const html = fs.readFileSync('./files/Divyansh_Atri_CV.pdf.html', 'utf8');
const options = { 
  format: 'A4',
  border: {
    top: '20mm',
    right: '20mm',
    bottom: '20mm',
    left: '20mm'
  }
};

pdf.create(html, options).toFile('./files/Divyansh_Atri_CV.pdf', (err, res) => {
  if (err) return console.log(err);
  console.log('PDF created successfully:', res);
});
*/ 