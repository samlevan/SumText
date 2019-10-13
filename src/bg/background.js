function getTextFromClipboard() {
  var t = document.createElement("input");
  document.body.appendChild(t);
  t.focus();
  document.execCommand("paste");
  var clipboardText = t.value; //this is your clipboard data
  document.body.removeChild(t);
  return clipboardText
}

function sum_within_text(text) {
  return Math.round(
      text
      .split('[')
        .join('[~!@#$%)(*&^')
      .split(']')
        .join('](*&^%~!@#$)')
      .split('[')
      .map(function(value) {
        // console.log(value)
        const start = value.indexOf('~!@#$%)(*&^')
        const end = value.indexOf('](*&^%~!@#$)')
        if (start > -1 && end > -1) {
          return value
            .substring(start + 11, end)
            .replace(/[^\d.-]/g, '')
        }
      })
      .reduce(function(accumulator, currentValue) {
        if (typeof currentValue !== 'undefined' && !isNaN(parseFloat(currentValue)) ) {
            // console.log('y', accumulator + parseFloat(currentValue))
            return accumulator + parseFloat(currentValue)
        }
        return accumulator
      }, 0)
      * 100) / 100
}


var clickHandler = function(e) {
  alert(sum_within_text(getTextFromClipboard()))
};


chrome.contextMenus.create({
    "title": "Sum numbers from clipboard",
    "contexts": ["page", "selection", "image", "link"],
    "onclick" : clickHandler
  });
