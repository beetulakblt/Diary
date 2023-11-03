// Resmi base64 formatına çevirmek
function convertImageToBase64(file, callback) {
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const base64Image = e.target.result;
      callback(base64Image);
    };

    reader.readAsDataURL(file);
  }
}

// Dosya yüklendikçe veya sürüklendikçe base64 formatına çevirin
// const fileInput = $("#file-upload");
// const uploadedImage = $("#uploaded-image");
let base64Image = "";

// Function to convert and compress the image to base64
function convertAndCompressImageToBase64(
  file,
  callback,
  maxWidth,
  maxHeight,
  quality
) {
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Calculate the new dimensions to fit within maxWidth and maxHeight
        let newWidth = img.width;
        let newHeight = img.height;

        if (newWidth > maxWidth) {
          newHeight *= maxWidth / newWidth;
          newWidth = maxWidth;
        }

        if (newHeight > maxHeight) {
          newWidth *= maxHeight / newHeight;
          newHeight = maxHeight;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw the image on the canvas with the new dimensions
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convert the canvas back to a base64 image with the specified quality
        const base64Image = canvas.toDataURL("image/jpeg", quality / 100);

        callback(base64Image);
      };
    };

    reader.readAsDataURL(file);
  }
}

// Example usage:
const fileInput = $("#file-upload");
const uploadedImage = $("#uploaded-image");
const maxWidth = 800; // Set your desired max width
const maxHeight = 600; // Set your desired max height
const quality = 70; // Set the desired image quality (0-100)

fileInput.change(function (e) {
  const selectedFile = e.target.files[0];
  convertAndCompressImageToBase64(
    selectedFile,
    function (base64) {
      base64Image = base64;
      uploadedImage.attr("src", base64);
    },
    maxWidth,
    maxHeight,
    quality
  );
});

// Drag and drop functionality remains the same

// Drag and drop işlemi
uploadedImage.on("dragover", function (e) {
  e.preventDefault();
  $(this).addClass("dragover");
});

uploadedImage.on("dragleave", function () {
  $(this).removeClass("dragover");
});

uploadedImage.on("drop", function (e) {
  e.preventDefault();
  $(this).removeClass("dragover");

  const droppedFile = e.originalEvent.dataTransfer.files[0];
  convertImageToBase64(droppedFile, function (base64) {
    base64Image = base64;
    uploadedImage.attr("src", base64);
  });
});
