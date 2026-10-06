(function () {
  var input = document.getElementById("url-input");
  var btn = document.getElementById("generate-btn");
  var errorMsg = document.getElementById("error-msg");
  var qrWrapper = document.getElementById("qr-wrapper");
  var qrOutput = document.getElementById("qr-output");
  var downloadBtn = document.getElementById("download-btn");

  var qrInstance = null;

  function normalizeUrl(raw) {
    var trimmed = raw.trim();
    if (!/^https?:\/\//i.test(trimmed)) {
      trimmed = "https://" + trimmed;
    }
    return trimmed;
  }

  function generate() {
    errorMsg.textContent = "";
    var raw = input.value.trim();

    if (!raw) {
      errorMsg.textContent = "Paste a link first.";
      return;
    }

    var url = normalizeUrl(raw);

    // Clear previous QR code
    qrOutput.innerHTML = "";
    qrInstance = null;

    qrInstance = new QRCode(qrOutput, {
      text: url,
      width: 256,
      height: 256,
      correctLevel: QRCode.CorrectLevel.M,
    });

    // qrcodejs renders asynchronously via setTimeout; wait a tick before grabbing the canvas/img
    setTimeout(function () {
      var canvas = qrOutput.querySelector("canvas");
      var img = qrOutput.querySelector("img");

      if (canvas) {
        downloadBtn.href = canvas.toDataURL("image/png");
      } else if (img) {
        downloadBtn.href = img.src;
      }

      qrWrapper.classList.remove("hidden");
    }, 100);
  }

  btn.addEventListener("click", generate);

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") generate();
  });
})();
