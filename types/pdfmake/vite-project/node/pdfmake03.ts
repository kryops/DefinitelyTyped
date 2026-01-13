import pdfmake from "pdfmake03";

console.log("--- 0.3 ---");

console.log("Root", pdfmake);

pdfmake.setProgressCallback((...args) => console.warn("progressCallback", ...args));

pdfmake.addFonts({
    Foo: {
        normal: "Roboto-Regular.ttf",
    },
    Roboto: {
        normal: "Roboto-Regular.ttf",
    },
});

pdfmake.addTableLayouts({
    bar: {
        fillColor: "red",
    },
});

const pdfContent = pdfmake.createPdf({
    content: [
        { text: "0.3: Hello, Node", font: "Foo" },
        { table: { body: [["Table with custom layout"]] }, layout: "bar" },
    ],
});
await pdfContent.write("03.pdf");
