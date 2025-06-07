function openPopup(videoUrl) {
    const popup = document.getElementById("videoPopup");
    const iframe = document.getElementById("videoFrame");
    iframe.src = videoUrl + "?autoplay=1";
    popup.style.display = "flex";
}

function closePopup() {
    const popup = document.getElementById("videoPopup");
    const iframe = document.getElementById("videoFrame");
    popup.style.display = "none";
    iframe.src = "";
}