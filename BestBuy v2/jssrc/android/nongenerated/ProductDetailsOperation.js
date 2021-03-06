var sku;
var apikey = "sdjvqsgy8dufawzjpgssz6ns";
var moreImagesarray = [];
var shoppingcartarray = [];
var detaildetailproductprice;

function getProductDetails(psku) {
    sku = psku;
    if (!mobileFabricConfiguration.isKonySDKObjectInitialized) {
        initializeMobileFabric();
    } else if (mobileFabricConfiguration.isKonySDKObjectInitialized) {
        fetchDetailsForProduct();
    }
}

function fetchDetailsForProduct() {
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        kony.application.showLoadingScreen("loadskin", "Fetching products details...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, false, true, {
            enableMenuKey: true,
            enableBackKey: true,
            progressIndicatorColor: "ffffff77"
        });
        mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[0].service);
        var operationName = mobileFabricConfiguration.integrationServices[0].operations[3];
        var headers = {};
        data = {
            SkuVal: sku,
            ApiKey: apikey
        };
        mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, data, productDetailsSuccess, productDetailsError);
    } else alert("Network unavailable. Please check your network settings. ");
}

function productDetailsSuccess(detailsResponse) {
    if (detailsResponse !== null && detailsResponse.opstatus === 0) {
        if (detailsResponse.Product !== null) {
            shoppingcartitem = detailsResponse.Product;
            moreImagesarray = [];
            getImage(detailsResponse.Product.TopViewImage);
            getImage(detailsResponse.Product.MediumImage);
            getImage(detailsResponse.Product.ThumbnailImage);
            getImage(detailsResponse.Product.LargeImage);
            getImage(detailsResponse.Product.AlternateViewsImage);
            getImage(detailsResponse.Product.AngleImage);
            getImage(detailsResponse.Product.LargeFrontImage);
            getImage(detailsResponse.Product.RemoteControlImage);
            getImage(detailsResponse.Product.Image);
            getImage(detailsResponse.Product.BackViewImage);
            getImage(detailsResponse.Product.LeftViewImage);
            getImage(detailsResponse.Product.AccessoriesImage);
            getImage(detailsResponse.Product.EnergyGuideImage);
            getImage(detailsResponse.Product.RightViewImage);
            ProductDetailsScreen.ImgProductImage.src = detailsResponse.Product.MediumImage;
            ProductDetailsScreen.LblProductName.text = detailsResponse.Product.Name;
            ProductDetailsScreen.LblPrice.text = "";
            if (detailsResponse.Product.isOnSale === true) {
                ProductDetailsScreen.LblPrice.skin = "red";
            } else {
                ProductDetailsScreen.LblPrice.skin = "";
            }
            //ProductDetailsScreen.LblPrice.text="OnSale $ "+detailproductprice;
            getProductReview(detailsResponse.Product.AvgReview);
            ProductDetailsScreen.LblProductDetails.text = detailsResponse.Product.Description;
            getReviewImage(detailsResponse.Product.AvgReview);
            ProductDetailsScreen.LblPrice.text = detailsResponse.Product.isOnSale ? "$ " + detailsResponse.Product.SalePrice : "$ " + detailsResponse.Product.RegularPrice;
            kony.application.dismissLoadingScreen();
        } else {
            kony.application.dismissLoadingScreen();
            alert("there is no data available for the selected Product");
        }
    } else {
        kony.application.dismissLoadingScreen();
        kony.ui.Alert({
            message: "Service call failed with opstatus " + productlistresponse.opstatus,
            alertType: constants.ALERT_TYPE_ERROR,
            alertTitle: "Composite Service",
            yesLabel: "OK"
        }, {});
    }
}

function productDetailsError(error) {
    kony.application.dismissLoadingScreen();
    alert(" Failed to fetch bestbuy stores. Please try again. " + JSON.stringify(error));
}

function getReviewImage(review) {
    var customerview = Math.floor(review);
    if (customerview > 0 && customerview <= 1) {
        ProductDetailsScreen.ImgRatings.src = "ratings_star_1.png";
    } else if (customerview > 1 && customerview <= 2) {
        ProductDetailsScreen.ImgRatings.src = "ratings_star_2.png";
    } else if (customerview > 2 && customerview <= 3) {
        ProductDetailsScreen.ImgRatings.src = "ratings_star_3.png";
    } else if (customerview > 3 && customerview <= 4) {
        ProductDetailsScreen.ImgRatings.src = "ratings_star_4.png";
    } else if (customerview > 4) {
        ProductDetailsScreen.ImgRatings.src = "ratings_star_5.png";
    } else {
        ProductDetailsScreen.ImgRatings.src = "";
    }
}

function getImage(typeImage) {
    if (typeImage.length > 0) {
        moreImagesarray.push({
            "typeImage": typeImage
        });
    }
}

function getMoreImages() {
    ProductDetailImagesScreen.detailimagessegment.widgetDataMap = {
        ImgProductSeveral: "typeImage"
    };
    ProductDetailImagesScreen.detailimagessegment.setData(moreImagesarray);
    ProductDetailImagesScreen.show();
}

function getProductReview(avgreview) {
    if (avgreview > 0.0) {
        ProductDetailsScreen.LblRatings.text = "Avg Review: " + avgreview;
    } else {
        ProductDetailsScreen.LblRatings.text = "No reviews";
    }
}

function MovetoCart() {
    if (shoppingcartitem.isOnSale === true) {
        saleprice = parseFloat(shoppingcartitem.SalePrice);
        regularprice = parseFloat(shoppingcartitem.RegularPrice);
        shoppingcartarray.push({
            LblProductCartName: shoppingcartitem.Name,
            ImgCart: "cartremoveitem.png",
            LblProductCartPrice: {
                text: "$" + saleprice,
                skin: "red"
            },
            cartdetailproductprice: saleprice,
            "saleprice": saleprice,
            "regularprice": regularprice
        });
        alert("Item is added to cart");
    } else {
        saleprice = parseFloat(shoppingcartitem.SalePrice);
        regularprice = parseFloat(shoppingcartitem.RegularPrice);
        shoppingcartarray.push({
            LblProductCartName: shoppingcartitem.Name,
            ImgCart: "cartremoveitem.png",
            LblProductCartPrice: {
                text: "$" + regularprice,
                skin: ""
            },
            cartdetailproductprice: regularprice,
            "saleprice": saleprice,
            "regularprice": regularprice
        });
        alert("Item is added to cart");
    }
}

function hideUpArrow() {
    ProductDetailsScreen.FlexImageUpArrow.isVisible = false;
    ProductDetailsScreen.FlexImageDownArrow.isVisible = true;
}

function hideDownArrow() {
    ProductDetailsScreen.FlexImageUpArrow.isVisible = true;
    ProductDetailsScreen.FlexImageDownArrow.isVisible = false;
}

function onProductDetailsBack() {
    hideDownArrow();
    ProductDetailsScreen.LblTotalReviews.text = "";
    reviewarr = [];
    ProductDetailsScreen.SegmentReview.setData(reviewarr);
    page = "1";
    reviewsMoveDown();
    ProductListScreen.show();
}