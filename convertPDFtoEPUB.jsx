// 1. Define the path to the input PDF file
var inputFile = File("C:/Users/User/Downloads/millar.pdf");

// 2. Check if the file exists before proceeding
if (!inputFile.exists) {
  alert("Error: The specified PDF file does not exist.");
  exit();
}

// 3. Create a new InDesign document
var myDocument = app.documents.add();

// 4. Place the PDF to get the page count (we need to place it temporarily to get pages)
var myTempDocument = app.documents.add();
var myRectangle = myTempDocument.pages[0].rectangles.add();
myRectangle.place(inputFile); // Place the entire PDF in a rectangle to read page count

// Get the page count of the placed PDF
var pageCount = 6; // Page count of the placed PDF

// 5. Close the temporary document used to get the page count
myTempDocument.close(SaveOptions.NO);

// 6. Add pages to the InDesign document to match the number of PDF pages
for (var i = 1; i < pageCount; i++) {
  myDocument.pages.add();
}

// 7. Place each PDF page on the corresponding InDesign page
for (var i = 0; i < pageCount; i++) {
  var myPage = myDocument.pages.item(i);

  // Add a rectangle on each page to place the PDF content
  var myRectangle = myPage.rectangles.add();

  // Place the specific page of the PDF into the rectangle
  myRectangle.place(inputFile);

  // Resize the rectangle to match the entire page size of the InDesign document
  var pageBounds = myPage.bounds; // Get the bounds of the InDesign page (top, left, bottom, right)
  myRectangle.geometricBounds = pageBounds; // Adjust the rectangle size to match the page

  // Optionally, you can also scale the placed PDF to fit within the rectangle
  myRectangle.fit(FitOptions.FILL_PROPORTIONALLY); // This will scale the PDF to fill the rectangle proportionally
}

// 8. Define the output file path for the EPUB (Save to a different folder like Desktop)
var outputFile = File("C:/Users/User/Desktop/millar.epub"); // Change this path to something available

// 9. Export the InDesign document to EPUB
try {
  myDocument.exportFile(ExportFormat.EPUB, outputFile);
  alert(
    "PDF has been successfully converted to EPUB and saved at: " +
      outputFile.fsName
  );
} catch (e) {
  alert("Error: Could not export the InDesign document to EPUB. " + e.message);
}

// 10. Close the InDesign document without saving changes (since we're exporting)
myDocument.close(SaveOptions.NO);
