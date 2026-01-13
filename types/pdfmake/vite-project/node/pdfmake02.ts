import * as fs from "fs";
import Printer from "pdfmake02";

console.log("--- 0.2 ---");

console.log("Root", Printer);

const printer = new Printer({
    Foo: {
        normal: "Roboto-Regular.ttf",
    },
});

const pdfDoc = printer.createPdfKitDocument({
    content: [{ text: "0.2 Node: Hello, world", font: "Foo" }],
});
pdfDoc.pipe(fs.createWriteStream("02.pdf"));
pdfDoc.end();
