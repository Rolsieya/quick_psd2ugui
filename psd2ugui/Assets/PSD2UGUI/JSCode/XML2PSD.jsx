// **************************************************
// This file created by Brett Bibby (c) 2010-2013
// You may freely use and modify this file as you see fit
// You may not sell it
//**************************************************
// hidden object game exporter
//$.writeln("=== Starting Debugging Session ===");

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop;

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

main();

function main(){
    // 创建一个新的文档
    var doc = app.documents.add(1136, 313, 72, "ImageName", NewDocumentMode.RGB, DocumentFill.TRANSPARENT);

    var layers = doc.artLayers;
    // 循环添加图层for
    // 获取图层集合，并创建一个新的图层
    var newLayer = layers.add();
    newLayer.name = "TargetLayer";
    
    //填充数据，把已经切出来的图片重新贴回图层内，同时指定一下放置位置
    placeImageInLayer("D:/Program Files/LR/UnityDemo/PSD2UGUI_X-master/Assets/New/Source/FightBGImg.png", 0, 0);
    // 合成图像图层与新图层，使之完全展现
    newLayer.merge();
    //循环end
    
    // 保存文档为PSD格式
    var psdOptions = new PhotoshopSaveOptions();
    psdOptions.embedColorProfile = true;
    psdOptions.alphaChannels = true;
    psdOptions.layers = true;
    doc.saveAs(new File("~/Desktop/NewDocument.psd"), psdOptions, true, Extension.LOWERCASE);
    // 取消文档激活
    doc.close(SaveOptions.DONOTSAVECHANGES);
}
// 打开一个图像文件，并将其粘贴到文档的图层上
function placeImageInLayer(imagePath, x, y) {
    // 打开图像文件
    var fileRef = new File(imagePath);
    if (!fileRef.exists) {
        alert("图像文件未找到：" + imagePath);
        return;
    }
    var imageDoc = app.open(fileRef);
    
    // 选择图像的全部内容并拷贝
    imageDoc.selection.selectAll();
    imageDoc.selection.copy();
    
    // 关闭图像文档，不保存
    imageDoc.close(SaveOptions.DONOTSAVECHANGES);
    // 将剪贴板的图像粘贴到新图层
    app.activeDocument.paste();
    var pastedLayer = app.activeDocument.activeLayer;
    
    // 获取图层的边界
    var bounds = pastedLayer.bounds;
    var layerWidth = bounds[2] - bounds[0];
    var layerHeight = bounds[3] - bounds[1];
    // 移动图层到指定位置
    var deltaX = x - bounds[0];
    var deltaY = y - bounds[1];
    pastedLayer.translate(deltaX, deltaY);
}