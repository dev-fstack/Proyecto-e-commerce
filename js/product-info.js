"use strict"

var product = {};
var productImages = [];
var related = [];
var comments = {};
var products = [];

function showProductsImages (array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="carousel-item">
        <img src="` + imageSrc + `" alt="">
        </div>
        `

        document.getElementById("images").innerHTML = htmlContentToAppend;
    }
}

function showRelatedProducts (array){
    let relatedProductsToAppend = "";

    for(let element of array){

         relatedProductsToAppend += `
          <div class="col">
          <dl>
           <dd><strong>`+ products[element].name +`</strong></dd>
           <dd><img src= "`+ products[element].imgSrc +`" alt="" width="150" height="120"></dd>
           <dd>`+ products[element].cost + products[element].currency+`</dd>
          </dl>
          </div> 
          `  
    }

    document.getElementById("relatedProducts").innerHTML = relatedProductsToAppend;
}

function showComments (array) {
    let commentsToAppend = "";

    for (let i =0; i < array.length; i++) {
        let comment = array[i];

        let score = "";

        for (let i= 1; i <= comment.score; i++){
            score += `<span class= "fa fa-star checked"></span>`
        }

        for(let i= comment.score; i <5; i++){
            score += `<span class= "fa fa-star"></span>`
        }

        commentsToAppend += `
        <div class="container pl-0 py-3">
         <div> ` + score +`</div>
         <div class="row">
          <div class= "col">
           <span>` + comment.user +`</span><br>
           <span>` + comment.description + `</span>
          </div>
          <div class= "col">
           <span><strong> `+ comment.dateTime + `</strong></span>
          </div>
         </div>
        </div>
        `
        document.getElementById("comments").innerHTML = commentsToAppend;
    }

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(result){
        if(result.status=== "ok"){
            products = result.data;
        }
    })
});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
            product = resultObj.data;
            productImages = product.images;
            related = product.relatedProducts;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost;
            productSoldCountHTML.innerHTML = product.soldCount;

            showProductsImages(productImages);
            showRelatedProducts(related);
        }

    })

});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(response){
        if (response.status === "ok") {
            comments = response.data;

            showComments(comments);
        }
    })
})

var star1 = document.getElementById("1");
var star2 = document.getElementById("2");
var star3 = document.getElementById("3");
var star4 = document.getElementById("4");
var star5 = document.getElementById("5");

star1.addEventListener("click", function(e){
    star1.className = "fa fa-star checked";
    star2.className = "fa fa-star";
    star3.className = "fa fa-star";
    star4.className = "fa fa-star";
    star5.className = "fa fa-star";
});

star2.addEventListener("click", function(e){
    star1.className = "fa fa-star checked";
    star2.className = "fa fa-star checked";
    star3.className = "fa fa-star";
    star4.className = "fa fa-star";
    star5.className = "fa fa-star";
});

star3.addEventListener("click", function(e){
    star1.className = "fa fa-star checked";
    star2.className = "fa fa-star checked";
    star3.className = "fa fa-star checked";
    star4.className = "fa fa-star";
    star5.className = "fa fa-star";
});

star4.addEventListener("click", function(e){
    star1.className = "fa fa-star checked";
    star2.className = "fa fa-star checked";
    star3.className = "fa fa-star checked";
    star4.className = "fa fa-star checked";
    star5.className = "fa fa-star";
});

star5.addEventListener("click", function(e){
    star1.className = "fa fa-star checked";
    star2.className = "fa fa-star checked";
    star3.className = "fa fa-star checked";
    star4.className = "fa fa-star checked";
    star5.className = "fa fa-star checked";
});