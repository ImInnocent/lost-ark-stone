/*global chrome*/
const openButton = document.getElementById("openButton");

openButton.onclick = () => {
  chrome.runtime.openOptionsPage();
}
