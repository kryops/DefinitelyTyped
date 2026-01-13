import pdfmakeRoot from "pdfmake03";
import pdfmakeBuild from "pdfmake03/build/pdfmake";
import pdfmakeMin from "pdfmake03/build/pdfmake.min";
import vfsImport from "pdfmake03/build/vfs_fonts";

console.log("--- 0.3 ---");

console.log("Root", pdfmakeRoot);
console.log("Build", pdfmakeBuild);
console.log("Min", pdfmakeMin);
console.log("vfs", vfsImport);

async function foo(pdfmakeToUse: typeof pdfmakeBuild, message: string) {
    pdfmakeToUse.addVirtualFileSystem(vfsImport);
    pdfmakeToUse.addFonts({
        Foo: {
            normal: "Roboto-Regular.ttf",
        },
    });
    pdfmakeToUse.addTableLayouts({
        foo: {
            fillColor: "red",
        },
    });

    const pdfContent = pdfmakeToUse.createPdf({
        content: [
            { text: "0.3:" + message, font: "Foo" },
            { table: { body: [["Table with custom layout"]] }, layout: "foo" },
            { section: "Section content" },
        ],
    });
    const blob = await pdfContent.getBlob();
    const blobUrl = URL.createObjectURL(blob);
    document.getElementById("app")!.innerHTML += `<iframe src="${blobUrl}" width="600" />`;
}

foo(pdfmakeRoot, "Root");
foo(pdfmakeBuild, "Build");
foo(pdfmakeMin, "Min");
