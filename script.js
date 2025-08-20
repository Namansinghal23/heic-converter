let uploadedFile = null;

function handleFiles(files) {
  uploadedFile = files[0];
  if (uploadedFile) {
    let reader = new FileReader();
    reader.onload = function(e) {
      let img = document.createElement("img");
      img.src = e.target.result;
      document.getElementById("preview").innerHTML = "";
      document.getElementById("preview").appendChild(img);
    };
    reader.readAsDataURL(uploadedFile);
  }
}

function convertImage(format) {
    const fileInput = document.getElementById("fileInput");
    if (!fileInput.files.length) {
        alert("Please upload a HEIC/HEIF image first.");
        return;
    }

    const file = fileInput.files[0];

    // disable download button + show loader
    const downloadLink = document.getElementById("downloadlink");
    const loader = document.getElementById("loader");
    const downloadText = document.getElementById("download-text");

    downloadLink.classList.remove("active");
    loader.style.display = "inline";
    downloadText.style.display = "none";

    heic2any({
        blob: file,
        toType: format
    })
    .then((converted) => {
        let outputBlob = Array.isArray(converted) ? converted[0] : converted;

        const url = URL.createObjectURL(outputBlob);

        downloadLink.href = url;
        downloadLink.download = "converted." + (format === "image/png" ? "png" : "jpg");

        // enable button + hide loader
        loader.style.display = "none";
        downloadText.style.display = "inline";
        downloadLink.classList.add("active");
    })
    .catch((err) => {
        console.error("Conversion failed:", err);
        alert("Conversion failed. Please try again.");
        loader.style.display = "none";
        downloadText.style.display = "inline";
    });
}

