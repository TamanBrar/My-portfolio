/* jslint browser: true */
/* global $, Swiper, document, window, info */

// EDITABLE VARIABLES START ////////////////////////////////

// wait time for inactivity in seconds
var idleWaitTime = 2000;

// outfitters logo file name for receipt
var receiptLogo = "logo.svg";

// format for model images - .jpg or .png
var imageType = ".png";

// EDITABLE VARIABLES END //////////////////////////////////

// general vars
var outfitIndex = 0,
    gender = "M",
    view = "F",
    idleTimer;

// swiper setup for outfit parts
var headSwiper = new Swiper('#headImg');
var torsoSwiper = new Swiper('#torsoImg');
var legsSwiper = new Swiper('#legsImg');
var feetSwiper = new Swiper('#feetImg');

// hide cart at startup
$("#cart").hide();

// idle timer... Restarts after every click
$("body").click(function() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(showPromotion, idleWaitTime * 1000);
});

// function to restart promotional video/instructions
function showPromotion() {
    
    // fade in promotion video
    $("#promotion").fadeIn(500, function() {
        
        // initialize outfit
        outfitIndex = 0;
        headSwiper.slideToLoop(outfitIndex, 500);
        torsoSwiper.slideToLoop(outfitIndex, 500);
        legsSwiper.slideToLoop(outfitIndex, 500);
        feetSwiper.slideToLoop(outfitIndex, 500);
        updateOutfitInfo();
        
        // hide cart
        $("#cart").hide();
    });
}

// hide promotion video and reveal outfits
$("#promotion").click(function() {
    $(this).fadeOut(500);
});

// function to update outfit information
function updateOutfitInfo() {
    
    // grabs data from info object (external)
    var headInfo = info["head" + gender + (headSwiper.activeIndex + 1)];
    var torsoInfo = info["torso" + gender + (torsoSwiper.activeIndex + 1)];
    var legsInfo = info["legs" + gender + (legsSwiper.activeIndex + 1)];
    var feetInfo = info["feet" + gender + (feetSwiper.activeIndex + 1)];
    
    // fades in new content
    $("#headInfo").html("<h2>" + headInfo.title + "</h2><p>" + headInfo.description + "</p>").fadeIn(500);
    $("#torsoInfo").html("<h2>" + torsoInfo.title + "</h2><p>" + torsoInfo.description + "</p>").delay(100).fadeIn(500);
    $("#legsInfo").html("<h2>" + legsInfo.title + "</h2><p>" + legsInfo.description + "</p>").delay(200).fadeIn(500);
    $("#feetInfo").html("<h2>" + feetInfo.title + "</h2><p>" + feetInfo.description + "</p>").delay(300).fadeIn(500);
}

// applies appropriate info on startup
updateOutfitInfo();

// updates info to the right of part that has changed with a swipe
headSwiper.on('slideChange', function() {
  $("#headInfo").fadeOut(500, function() {
      var headInfo = info["head" + gender + (headSwiper.activeIndex + 1)];
      $(this).html("<h2>" + headInfo.title + "</h2><p>" + headInfo.description + "</p>").fadeIn(500);
  });
});

torsoSwiper.on('slideChange', function() {
  $("#torsoInfo").fadeOut(500, function() {
      var torsoInfo = info["torso" + gender + (torsoSwiper.activeIndex + 1)];
      $(this).html("<h2>" + torsoInfo.title + "</h2><p>" + torsoInfo.description + "</p>").fadeIn(500);
  });
});

legsSwiper.on('slideChange', function() {
  $("#legsInfo").fadeOut(500, function() {
      var legsInfo = info["legs" + gender + (legsSwiper.activeIndex + 1)];
      $(this).html("<h2>" + legsInfo.title + "</h2><p>" + legsInfo.description + "</p>").fadeIn(500);
  });
});

feetSwiper.on('slideChange', function() {
  $("#feetorsoInfonfo").fadeOut(500, function() {
      var feetInfo = info["feet" + gender + (feetSwiper.activeIndex + 1)];
      $(this).html("<h2>" + feetInfo.title + "</h2><p>" + feetInfo.description + "</p>").fadeIn(500);
  });
});

// button that chooses next outfit based on last one viewed all toegther
$("#nextOutfit").click(function() {
    
    // fade out all info and update content based on outfit selected
    $(".info").fadeOut(500, updateOutfitInfo);
    
    // increase outfit index and reset if at the end
    outfitIndex++;
    if(outfitIndex == 3) { outfitIndex = 0; }
    
    // move sliders to appropriate outfit
    headSwiper.slideToLoop(outfitIndex, 500);
    torsoSwiper.slideToLoop(outfitIndex, 500);
    legsSwiper.slideToLoop(outfitIndex, 500);
    feetSwiper.slideToLoop(outfitIndex, 500);
});

// button that chooses a random outfit
$("#randomOutfit").click(function() {
    
    // fade out all info and update content based on outfit selected
    $(".info").fadeOut(500, updateOutfitInfo);
    
    // move sliders to appropriate outfit based on random number between 0 and 2 (3 outfits total)
    headSwiper.slideToLoop(Math.floor(Math.random() * 3), 500);
    torsoSwiper.slideToLoop(Math.floor(Math.random() * 3), 500);
    legsSwiper.slideToLoop(Math.floor(Math.random() * 3), 500);
    feetSwiper.slideToLoop(Math.floor(Math.random() * 3), 500);
});

// function to update all images based on Male/Female and/or Front/Back selections
// once img tags have been added, change all instances of .swiper-slide to img
// use what is in the console.log to update the img src attribute
function updateImages() {
    
    // update all head images
    $("#headImg img").each(function(index) {
        $(this).attr("src", "../images/" + view + "/" + gender + "/head/" + index + imageType);
//        console.log("../images/" + view + "/" + gender + "/head/" + index + imageType);
    });
    
    // update all torso images
    $("#torsoImg img").each(function(index) {
         $(this).attr("src", "../images/" + view + "/" + gender + "/torso/" + index + imageType);
        //console.log("../images/" + view + "/" + gender + "/torso/" + index + imageType);
    });
    
    // update all legs images
    $("#legsImg img").each(function(index) {
        $(this).attr("src", "../images/" + view + "/" + gender + "/legs/" + index + imageType);
        //console.log("../images/" + view + "/" + gender + "/legs/" + index + imageType);
    });
    
    // update all feet images
    $("#feetImg img").each(function(index) {
         $(this).attr("src", "../images/" + view + "/" + gender + "/feet/" + index + imageType);
        //console.log("../images/" + view + "/" + gender + "/feet/" + index + imageType);
    });
}

// button to switch between male (M) and female (F)
$("#genderOutfit").click(function() {
    
    // check if male or female
    if (gender == "M") {
        
        $("#headImg").css({height:'122'});
        $("#torsoImg").css({height:'204'});
        $("#legsImg").css({height:'319'});
        $("#feetImg").css({height:'92'});
        
        // set to female
        gender = "F";
        
        // update button label
        $(this).text("SHOW MALE");
        
        // update main title
        $("#genderTitle").text("WOMEN");
        
        // fade out info and update
        $(".info").fadeOut(500, updateOutfitInfo);
        
        // update all images
        updateImages();
        
    } else {
        
        // set to male
        gender = "M";
        
         $("#headImg").css({height:'108'});
        $("#torsoImg").css({height:'257'});
        $("#legsImg").css({height:'276'});
        $("#feetImg").css({height:'108'});
        
        // update button label
        $(this).text("SHOW FEMALE");
        
        // update main title
        $("#genderTitle").text("MEN");
        
        // fade out info and update
        $(".info").fadeOut(500, updateOutfitInfo);
        
        // update all images
        updateImages();
    }
});

// button to switch between front (F) and back (B) views
$("#sideOutfit").click(function() {
    
    if (view == "F") {
        
        // set to back
        view = "B";
        
        // update button label
        $("#sideOutfit img").attr("../images/back.png");
        
        // update slide with temp text
        // REMOVE when images are set up
//        $(".swiper-slide").text("BACK");
        
        // update all images
        updateImages();
        
    } else {
        
        // set to front
        view = "F";
        
        // update button label
        $("#sideOutfit img").attr("../images/back.png");
        
        // update slide with temp text
        // REMOVE when images are set up
//        $(".swiper-slide").text("FRONT");
        
        // update all images
        updateImages();
        
    }
});

// function to set up available sizes in cart
function setSizes(product) {
    
    var sizes = "";
    if (product.sizes.length > 1) {
        sizes = "<div class='size-select size-select-active'>" + product.sizes[0] + "</div>";
        for (var i = 1; i < product.sizes.length; i++) {
            sizes += "<div class='size-select'>" + product.sizes[i] + "</div>";
        }
    } else {
        sizes = product.sizes[0];
    }
    
    return sizes;
}

// function to set up available colours in cart
function setColours(product) {
    
    var colours = "";
    if (product.colours.length > 1) {
        colours = "<div class='colour-select colour-select-active' data-colour='" + product.colours[0] + "' style='background-color:" + product.colourCodes[0] + "'></div>";
        for (var i = 1; i < product.colours.length; i++) {
            colours += "<div class='colour-select' data-colour='" + product.colours[i] + "' style='background-color:" + product.colourCodes[i] + "'></div>";
        }
    } else {
        colours = product.colours[0];
    }
    
    return colours;
}

// function to update cart when row removed or updated
function updateCart() {
    
    var subtotal = 0;
    var selection = "";
    
    if ($("#head").length) {
        subtotal += parseFloat($("#head .price").attr("data-price"));
        selection += "<div id='head2'><h3>" + $("#head .title-desc h2").text() + "<span>$" + parseFloat($("#head .price").attr("data-price")).toFixed(2) + "</span></h3><p><strong>Size:</strong> " + $("#head .size").attr("data-size") + "<br><strong>Colour:</strong> " + $("#head .colour").attr("data-colour") + "</p></div>";
    }
    
    if ($("#torso").length) {
        subtotal += parseFloat($("#torso .price").attr("data-price"));
        selection += "<div id='torso2'><h3>" + $("#torso .title-desc h2").text() + "<span>$" + parseFloat($("#torso .price").attr("data-price")).toFixed(2) + "</span></h3><p><strong>Size:</strong> " + $("#torso .size").attr("data-size") + "<br><strong>Colour:</strong> " + $("#torso .colour").attr("data-colour") + "</p></div>";
    }
    
    if ($("#legs").length) {
        subtotal += parseFloat($("#legs .price").attr("data-price"));
        selection += "<div id='legs2'><h3>" + $("#legs .title-desc h2").text() + "<span>$" + parseFloat($("#legs .price").attr("data-price")).toFixed(2) + "</span></h3><p><strong>Size:</strong> " + $("#legs .size").attr("data-size") + "<br><strong>Colour:</strong> " + $("#legs .colour").attr("data-colour") + "</p></div>";
    }
    
    if ($("#feet").length) {
        subtotal += parseFloat($("#feet .price").attr("data-price"));
        selection += "<div id='feet2'><h3>" + $("#feet .title-desc h2").text() + "<span>$" + parseFloat($("#feet .price").attr("data-price")).toFixed(2) + "</span></h3><p><strong>Size:</strong> " + $("#feet .size").attr("data-size") + "<br><strong>Colour:</strong> " + $("#feet .colour").attr("data-colour") + "</p></div>";
    }
    
    var taxes = subtotal * 0.13;
    var total = subtotal + taxes;
    
    $("#subtotal").text("$" + subtotal);
    $("#taxes").text("$" + taxes.toFixed(2));
    $("#total").text("$" + total.toFixed(2));
    
    $("#selection").html(selection);
    
    var receipt = "<html><head><style>body{margin:20px;width:300px;}hr{margin:20px 0;}img{width:100%;height:auto;}h1{text-align:center;}h3{margin-bottom:0;}p{margin-top:0;}span{float:right;}</style></head><body><img src='../images/" + receiptLogo + "' /><hr>" + selection +"<hr><p style='margin-top:20px;'>Subtotal<span>$" + subtotal + "</span></p><p>Taxes<span>$" + taxes.toFixed(2) + "</span></p><h3>TOTAL<span>$" + total.toFixed(2) + "</span></h3><hr><img src='../images/barcode.svg' /><h1>Bring this receipt to the cashier :)</h1></body></html>";
    
    $("#receipt").attr("srcdoc", receipt);
    
}

// button that goes to cart
// creates rows in cart dynamically
$("#orderOutfit").click(function() {
    
    var headInfo = info["head" + gender + (headSwiper.activeIndex + 1)];
    var torsoInfo = info["torso" + gender + (torsoSwiper.activeIndex + 1)];
    var legsInfo = info["legs" + gender + (legsSwiper.activeIndex + 1)];
    var feetInfo = info["feet" + gender + (feetSwiper.activeIndex + 1)];
    
    var cartHTML = '<div id="column-labels" class="row"><div class="column image">Product</div><div class="column title-desc">Description</div><div class="column size">Size</div><div class="column colour">Colour</div><div class="column price">Price</div><div class="column remove"></div></div>';
    
    cartHTML += '<div id="head" class="row"><div class="column image"><img src="../images/' + view + '/' + gender + '/head/' + headSwiper.activeIndex + imageType + '" onerror="this.src=\'../images/missing.jpg\';" /></div><div class="column title-desc"><h2>' + headInfo.title + '</h2><p>' + headInfo.description + '</p></div><div class="column size" data-size="' + headInfo.sizes[0] + '">' + setSizes(headInfo) + '</div><div class="column colour" data-colour="' + headInfo.colours[0] + '">' + setColours(headInfo) + '</div><div class="column price" data-price="' + headInfo.price[1] + '">' + headInfo.price[0] + '</div><div class="column remove">X</div></div>';
    
    cartHTML += '<div id="torso" class="row"><div class="column image"><img src="../images/' + view + '/' + gender + '/torso/' + torsoSwiper.activeIndex + imageType + '" onerror="this.src=\'../images/missing.jpg\';" /></div><div class="column title-desc"><h2>' + torsoInfo.title + '</h2><p>' + torsoInfo.description + '</p></div><div class="column size" data-size="' + torsoInfo.sizes[0] + '">' + setSizes(torsoInfo) + '</div><div class="column colour" data-colour="' + torsoInfo.colours[0] + '">' + setColours(torsoInfo) + '</div><div class="column price" data-price="' + torsoInfo.price[1] + '">' + torsoInfo.price[0] + '</div><div class="column remove">X</div></div>';
    
    cartHTML += '<div id="legs" class="row"><div class="column image"><img src="../images/' + view + '/' + gender + '/legs/' + legsSwiper.activeIndex + imageType + '" onerror="this.src=\'images/missing.jpg\';" /></div><div class="column title-desc"><h2>' + legsInfo.title + '</h2><p>' + legsInfo.description + '</p></div><div class="column size" data-size="' + legsInfo.sizes[0] + '">' + setSizes(legsInfo) + '</div><div class="column colour" data-colour="' + legsInfo.colours[0] + '">' + setColours(legsInfo) + '</div><div class="column price" data-price="' + legsInfo.price[1] + '">' + legsInfo.price[0] + '</div><div class="column remove">X</div></div>';
    
    cartHTML += '<div id="feet" class="row"><div class="column image"><img src="../images/' + view + '/' + gender + '/feet/' + feetSwiper.activeIndex + imageType + '" onerror="this.src=\'images/missing.jpg\';" /></div><div class="column title-desc"><h2>' + feetInfo.title + '</h2><p>' + feetInfo.description + '</p></div><div class="column size" data-size="' + feetInfo.sizes[0] + '">' + setSizes(feetInfo) + '</div><div class="column colour" data-colour="' + feetInfo.colours[0] + '">' + setColours(feetInfo) + '</div><div class="column price" data-price="' + feetInfo.price[1] + '">' + feetInfo.price[0] + '</div><div class="column remove">X</div></div>';
    
    $(this).addClass("size-select-active");
    
    $("#products").html(cartHTML);
    
    updateCart();
    
    // fade in shopping cart
    $("#cart").fadeIn(500);
    
    // remove row from cart
    $(".remove").click(function() {
        $("#"+$(this).parent().attr("id")+"2").animate({height:0, opacity:0}, 500);
        $(this).parent().animate({height:0, paddingTop:0, paddingBottom:0, marginBottom:0, opacity:0}, 500, function() {
            $(this).remove();
            updateCart();
        });
    });

    // update item size in selected row
    $(".size-select").click(function() {
        $(this).parent().find(".size-select").removeClass("size-select-active");
        $(this).addClass("size-select-active");
        $(this).parent().attr("data-size", $(this).text());
        updateCart();
    });

    // update item colour in selected row
    $(".colour-select").click(function() {
        $(this).parent().find(".colour-select").removeClass("colour-select-active");
        $(this).addClass("colour-select-active");
        $(this).parent().attr("data-colour", $(this).attr("data-colour"));
        updateCart();
    });
    
});

// button that prints receipt based on current selections
$("#print-receipt").click(function() {
    
    $("#receipt")[0].contentWindow.focus();
    $("#receipt")[0].contentWindow.print();
    
    $(this).text("PRINTING... PLEASE WAIT").addClass("print-receipt-active");
    
    setTimeout(function() {
        $("#print-receipt").text("PRINT RECEIPT").removeClass("print-receipt-active");
    }, 5000);
});

// button to close/remove cart
$("#close-cart").click(function() {
    
    // fade out cart
    $("#cart").fadeOut(500);
    
});

// function for going fullscreen
document.onkeydown = function(e) {
    
    e = e || window.event;
    
    // check for F key and then go fullscreen
    if (e.keyCode == 70) { $(document).fullScreen(true); }
};