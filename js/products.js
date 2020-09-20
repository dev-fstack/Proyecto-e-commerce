const ORDER_ASC_BY_PRICE = "Menor Precio";
const ORDER_DESC_BY_PRICE = "Mayor Precio";
const ORDER_BY_PROD_POPULARITY = "Más relevantes";
var categoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort((a, b) => a.cost - b.cost);

    } else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort((a, b) => b.cost - a.cost);

    } else if (criteria === ORDER_BY_PROD_POPULARITY){
        result = array.sort((a, b) => b.soldCount-a.soldCount);
    }
    return result;
}

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < categoriesArray.length; i++){
        let category = categoriesArray[i];

        if(((minCount == undefined) || (minCount != undefined && category.cost >= minCount)) &&
          ((maxCount == undefined) || (maxCount != undefined && category.cost <= maxCount))){
              
         htmlContentToAppend += `
         <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <a href= "product-info.html"><img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail"></a>
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name +`</h4>
                        <small class="text-muted">` + category.soldCount + ` artículos</small>
                        <small class="text-muted">` + category.cost + category.currency +` </small>
                    </div>
                    <div>
                        <small class="text-muted">` + category.description + `</small>
                    </div>
                </div>
            </div>
         </div>
         `
        }

        document.getElementById("info").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;
    if (productsArray != undefined){
        categoriesArray = productsArray;
    }
    categoriesArray = sortProducts(sortCriteria, categoriesArray);
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
showSpinner();
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData("https://japdevdep.github.io/ecommerce-api/product/all.json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
        }
        hideSpinner();
    });

    document.getElementById("sortAsc").addEventListener("click", function(e){
        sortAndShowProducts(ORDER_ASC_BY_PRICE)
    });

    document.getElementById("sortDesc").addEventListener("click", function(e){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(e){
        sortAndShowProducts(ORDER_BY_PROD_POPULARITY);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});
