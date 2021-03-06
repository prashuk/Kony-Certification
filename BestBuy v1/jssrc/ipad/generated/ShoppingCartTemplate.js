function initializeShoppingCartTemplate() {
    CopyFlexShoppingCart04de677d372bf48 = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "80dp",
        "id": "CopyFlexShoppingCart04de677d372bf48",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "skin": "slFbox"
    }, {}, {});
    CopyFlexShoppingCart04de677d372bf48.setDefaultUnit(kony.flex.DP);
    var LblProductCartName = new kony.ui.Label({
        "centerY": "50%",
        "height": "90%",
        "id": "LblProductCartName",
        "isVisible": true,
        "left": "2%",
        "skin": "CopyslLabel0e6fc1d4849bc49",
        "text": "Label",
        "width": "60%",
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false,
        "wrapping": constants.WIDGET_TEXT_WORD_WRAP
    });
    var LblProductCartPrice = new kony.ui.Label({
        "centerY": "50%",
        "height": "90%",
        "id": "LblProductCartPrice",
        "isVisible": true,
        "left": "63%",
        "skin": "CopyslLabel04297bceffce145",
        "text": "Label",
        "top": "13dp",
        "width": "20%",
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false,
        "wrapping": constants.WIDGET_TEXT_WORD_WRAP
    });
    var FlexImgCart = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "centerY": "50%",
        "clipBounds": true,
        "height": "50dp",
        "id": "FlexImgCart",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "onClick": AS_FlexContainer_39f8558964f04efab0021b35675166e5,
        "right": 10,
        "skin": "slFbox",
        "width": "50dp",
        "zIndex": 1
    }, {}, {});
    FlexImgCart.setDefaultUnit(kony.flex.DP);
    var ImgCart = new kony.ui.Image2({
        "bottom": 0,
        "centerY": "50%",
        "id": "ImgCart",
        "isVisible": true,
        "left": 0,
        "right": "0dp",
        "skin": "slImage",
        "src": "imagedrag.png",
        "top": 0,
        "zIndex": 1
    }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    FlexImgCart.add(ImgCart);
    CopyFlexShoppingCart04de677d372bf48.add(LblProductCartName, LblProductCartPrice, FlexImgCart);
}