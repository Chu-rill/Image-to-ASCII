const asciiCharacters = " .,:;i1tfLCG08@"; // More detailed character set

function convertToAscii(imageData, width) {
  let asciiImage = "";
  for (let i = 0; i < imageData.data.length; i += 4 * width) {
    for (let j = 0; j < 4 * width; j += 4) {
      const r = imageData.data[i + j];
      const g = imageData.data[i + j + 1];
      const b = imageData.data[i + j + 2];
      const grayscale = (r + g + b) / 3;
      const asciiChar =
        asciiCharacters[
          Math.floor((grayscale / 255) * (asciiCharacters.length - 1))
        ];
      asciiImage += asciiChar;
    }
    asciiImage += "\n"; // Move to the next line
  }
  return asciiImage;
}

let uploadedFile = null;

document.getElementById("upload").addEventListener("change", function (event) {
  uploadedFile = event.target.files[0];
});

document.querySelector("button").addEventListener("click", function () {
  if (!uploadedFile) {
    alert("Please upload an image first.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const maxWidth = 200; // Increase maximum width for higher resolution ASCII
      const scale = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * scale;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Get the image data from the canvas
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Convert the image data to ASCII
      const asciiImage = convertToAscii(imageData, canvas.width);

      // Display the ASCII art
      document.getElementById("ascii").textContent = asciiImage;
    };
  };

  reader.readAsDataURL(uploadedFile);
});
