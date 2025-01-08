// JavaScript to load the navbar HTML into the page
document.addEventListener('DOMContentLoaded', function() {
    fetch('/includes/header.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('navbar-container').innerHTML = data;
      })
      .catch(error => console.error('Error loading navbar:', error));
  });

  document.addEventListener('DOMContentLoaded', function() {
    fetch('/includes/footer.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('footer-container').innerHTML = data;
      })
      .catch(error => console.error('Error loading navbar:', error));
  });

document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("pdf-files");
    const mergeButton = document.getElementById("merge-button");
    const resultSection = document.getElementById("result-section");
    const downloadLink = document.getElementById("download-link");

    mergeButton.addEventListener("click", async () => {
        const files = fileInput.files;

        if (files.length < 2) {
            alert("Please select at least two PDF files to merge.");
            return;
        }

        try {
            const mergedPdf = await mergePDFs(files);
            const pdfBlob = new Blob([mergedPdf], { type: "application/pdf" });
            const pdfUrl = URL.createObjectURL(pdfBlob);

            downloadLink.href = pdfUrl;
            downloadLink.download = "merged.pdf";
            resultSection.classList.remove("d-none");

            pdfFileInput.value = "";
        } catch (error) {
            console.error("Error merging PDFs:", error);
            alert("An error occurred while merging the PDFs. Please try again.");
        }
    });
});

async function mergePDFs(files) {
    const { PDFDocument } = PDFLib;
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    return await mergedPdf.save();
}
