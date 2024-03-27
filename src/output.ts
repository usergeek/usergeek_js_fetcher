import fs from "fs";

export const writeOutputToFile = (data: any) => {
    const jsonString = JSON.stringify(data, null, 2);
    const filename = `output_${Date.now()}.json`;
    fs.writeFileSync(filename, jsonString);
    console.log(`Output written to file: "${filename}"`);
}


