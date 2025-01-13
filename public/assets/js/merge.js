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
            if (mergedPdf) {
                const pdfBlob = new Blob([mergedPdf], { type: "application/pdf" });
                const pdfUrl = URL.createObjectURL(pdfBlob);

                downloadLink.href = pdfUrl;
                downloadLink.download = "merged.pdf";
                resultSection.classList.remove("d-none");
            }

            fileInput.value = ""; // Reset input for new selection
        } catch (error) {
            console.error("Error merging PDFs:", error);
            alert(`An error occurred while merging the PDFs: ${error.message || "Unknown error"}`);
        }
    });
});

async function mergePDFs(files) {
    try {
        const { PDFDocument } = PDFLib;
        const mergedPdf = await PDFDocument.create();

        for (const file of files) {
            const arrayBuffer = await file.arrayBuffer();

            if (!arrayBuffer || arrayBuffer.byteLength === 0) {
                throw new Error("Invalid PDF file detected");
            }

            const pdf = await PDFDocument.load(arrayBuffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        return await mergedPdf.save();
    } catch (error) {
        console.error("Error loading or merging PDFs:", error);
        throw new Error("Error during PDF merging process.");
    }
}
