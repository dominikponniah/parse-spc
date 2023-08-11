
    // Just for you to know
    // EZE - Endgültigerzahlungsempfänger
    // ZE - Zahlungsempfänger
    // EZP - Endgültiger Zahlungspflichtiger

    Certainly, here's the complete README documentation for your SwissQR-Code Reader Library:

```markdown
# parse-spc
This library is a JS-Library designed to decode SPC (Swiss Payment Codes, also known as QR-Codes, QR-Bills) virtually. The functionality is quite similar to apps like neon or yuh, where you are able to upload a image from your camera roll directly into the application.

This library utilizes the jsQR library as a dependency to decode QR codes and process their data.

## Standardization
This library is based on public documentations provided by SIX Group. It uses the specifications and informations from this document: https://www.six-group.com/dam/download/banking-services/standardization/qr-bill/ig-qr-bill-v2.2-de.pdf

## Installation
To use parse-spc  in your project, run the following command:

```bash
npm install parse-spc
```

## Usage

```javascript
// Import library functions
import { processSwissQRCodeFromImageFile, parseQRCodeData } from 'parse-spc';

// File input field
const fileInput = document.getElementById('file-input');

fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        processSwissQRCodeFromImageFile(file, dataMatrix => {
            if (dataMatrix) {
                const jsonData = parseQRCodeData(dataMatrix);
                console.log('Parsed QR Code Data:', jsonData);
            } else {
                console.log('No QR code found.');
            }
        });
    }
});
```

## Example
You will find a working example in the ```examples```-Folder.

## License
This library is licensed under the [MIT License](LICENSE).

---

Developed by Dominik Ponniah
