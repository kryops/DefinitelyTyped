import pdfmakeRoot from "pdfmake02";
import pdfmakeBuild from "pdfmake02/build/pdfmake";
import pdfmakeMin from "pdfmake02/build/pdfmake.min";
import vfsImport from "pdfmake02/build/vfs_fonts";

console.log("--- 0.2 ---");

console.log("Root", pdfmakeRoot);
console.log("Build", pdfmakeBuild);
console.log("Min", pdfmakeMin);
console.log("vfs", vfsImport);

async function foo(pdfmakeToUse: typeof pdfmakeBuild, message: string) {
    pdfmakeToUse.vfs = vfsImport;

    const pdfContent = pdfmakeToUse.createPdf({
        content: ["0.2: " + message],
    });
    const blob = await new Promise<Blob>(resolve => {
        pdfContent.getBlob(resolve);
    });
    const blobUrl = URL.createObjectURL(blob);
    document.getElementById("app")!.innerHTML += `<iframe src="${blobUrl}" width="600" />`;
}

// Works, but is wrong according to the types because they expose the Node API at the root
// @ts-expect-error
foo(pdfmakeRoot, "Root");
foo(pdfmakeBuild, "Build");
foo(pdfmakeMin, "Min");
