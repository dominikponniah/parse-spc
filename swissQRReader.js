export const QRCodeSections = {
    0: 'QRType',
    1: 'Version',
    2: 'CodingType',
    3: 'Konto',
    4: 'ZE_Adress-Typ',
    5: 'ZE_Name',
    6: 'ZE_Strasse',
    7: 'ZE_Hausnummer',
    8: 'ZE_PLZ',
    9: 'ZE_Ort',
    10: 'ZE_Land',
    11: 'EZE_Adress-Typ',
    12: 'EZE_Name',
    13: 'EZE_Strasse',
    14: 'EZE_Hausnummer',
    15: 'EZE_PLZ',
    16: 'EZE_Ort',
    17: 'EZE_Land',
    18: 'Betrag',
    19: 'Währung',
    20: 'EZP_Adress-Typ',
    21: 'EZP_Name',
    22: 'EZP_Strasse',
    23: 'EZP_Hausnummer',
    24: 'EZP_PLZ',
    25: 'EZP_Ort',
    26: 'EZP_Land',
    27: 'Referenztyp',
    28: 'Referenz',
    29: 'Unstrukturierte_Mitteilung',
    30: 'Trailer',
    31: 'Rechnungsinformationen',
    32: 'AV1_Parameter',
    33: 'AV2_Parameter'
};

export async function decodeQRCode(imageSrc) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = async function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const context = canvas.getContext('2d');
            context.drawImage(img, 0, 0, img.width, img.height);

            const imageData = context.getImageData(0, 0, img.width, img.height);
            const code = jsQR(imageData.data, img.width, img.height, { inversionAttempts: 'dontInvert' });

            if (code) {
                resolve(code.data);
            } else {
                resolve(null);
            }
        };
    });
}

export function parseQRCodeData(textContent) {
    console.log(textContent);
    const lines = textContent.split('\n');
    const data = {};

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
            const sectionKey = QRCodeSections[i];
            if (sectionKey) {
                data[sectionKey] = line;
            }
        }
    }

    // EZE - Endgültigerzahlungsempfänger (LEER LASSEN)!
    // ZE - Zahlungsempfänger
    // EZP - Endgültiger Zahlungspflichtiger
    const jsonData = {
        currency: data['Währung'],
        amount: parseFloat(data['Betrag']),
        reference: data['Unstrukturierte_Mitteilung'],
        slipData: data['Rechnungsinformationen'],
        creditor: {
            name: data['ZE_Name'],
            address: data['ZE_Strasse'],
            buildingNumber: data['ZE_Hausnummer'],
            zip: data['ZE_PLZ'],
            city: data['ZE_Ort'],
            country: data['ZE_Land'],
            account: data['Konto'],
        },
        debtor: {
            name: data['EZP_Name'],
            address: data['EZP_Strasse'],
            buildingNumber: data['EZP_Hausnummer'],
            zip: data['EZP_PLZ'],
            city: data['EZP_Ort'],
            country: data['EZP_Land'],
        },
    };
    return jsonData;}

export function processSwissQRCodeFromImageFile(file, callback) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const imageSrc = e.target.result;
        decodeQRCode(imageSrc).then(dataMatrix => {
            callback && callback(dataMatrix);
        });
    };
    reader.readAsDataURL(file);
}
