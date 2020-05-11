export const isDarkMode = () =>
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

/**
 * Downloads the file in a JSON format.
 *
 * @param {Object} object
 * @param {string} fileName
 */
export function saveJson(object, fileName) {
  let data =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(object, null, 2));
  let href = document.createElement('a');

  href.setAttribute('href', data);
  href.setAttribute('download', fileName + '.json');
  href.style.display = 'hidden';

  document.body.appendChild(href);

  href.click();
  href.remove();
}

export function createInputFileJson() {
  let input = document.createElement('input');

  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'application/JSON');

  return input;
}

/**
 * Loads JSON content once from the file on the file input change.
 *
 * @param {string?} fileInputId example 'uploader' for <input type="file" id="uploader" />
 * @returns {Promise}
 */
export function loadJson(fileInputId = null) {
  let file, input, reader;

  return new Promise((resolve, reject) => {
    input =
      fileInputId !== null
        ? document.getElementById(fileInputId)
        : createInputFileJson();

    if (input !== null) {
      input.addEventListener(
        'change',
        function() {
          file = this.files[0];

          if (file) {
            reader = new FileReader();

            reader.onload = event => {
              resolve(JSON.parse(event.target.result));
            };
            reader.onerror = reject;

            reader.readAsText(file, 'UTF-8');
          }
        },
        {
          capture: true,
          once: true
        }
      );

      input.click();
    }
  });
}
