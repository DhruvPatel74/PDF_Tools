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
    const splitButton = document.getElementById("split-button");
    const pdfFileInput = document.getElementById("pdf-file");
    const pageRangeInput = document.getElementById("page-range");
    const downloadLink = document.getElementById("download-link");
    const resultSection = document.getElementById("result-section");

    splitButton.addEventListener("click", async () => {
        const file = pdfFileInput.files[0];
        const pageRange = pageRangeInput.value.trim();

        if (!file) {
            alert("Please select a PDF file.");
            return;
        }

        if (!pageRange) {
            alert("Please enter a valid page range.");
            return;
        }

        try {
            const splitPdf = await splitPDF(file, pageRange);
            const pdfBlob = new Blob([splitPdf], { type: "application/pdf" });
            const pdfUrl = URL.createObjectURL(pdfBlob);

            // Set up the download link
            downloadLink.href = pdfUrl;
            downloadLink.download = "split.pdf";
            resultSection.classList.remove("d-none");

            // Clear the file input after the download link is ready
            pdfFileInput.value = "";
        } catch (error) {
            console.error("Error splitting PDF:", error);
            alert("An error occurred while splitting the PDF. Please try again.");
        }
    });
});

async function splitPDF(file, pageRange) {
    const { PDFDocument } = PDFLib;
    const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
    const splitDoc = await PDFDocument.create();

    // Parse the page range (e.g., "1-3, 5")
    const pageNumbers = parsePageRange(pageRange, pdfDoc.getPageCount());
    const copiedPages = await splitDoc.copyPages(pdfDoc, pageNumbers);

    copiedPages.forEach((page) => splitDoc.addPage(page));
    return await splitDoc.save();
}

function parsePageRange(range, totalPages) {
    const pages = new Set();

    range.split(",").forEach((part) => {
        const [start, end] = part.split("-").map(Number);
        if (end) {
            for (let i = start - 1; i < end; i++) {
                if (i >= 0 && i < totalPages) pages.add(i);
            }
        } else {
            if (start - 1 >= 0 && start - 1 < totalPages) pages.add(start - 1);
        }
    });

    return Array.from(pages);
}
