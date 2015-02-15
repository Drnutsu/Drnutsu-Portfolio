var cookieArr;
var cartProductAmount = 0;
var currentProductName = "";

function clearval()
{
  $('#buy-amount').val(1);
}

window.onload = function ()
{
  var tmpCookie = getCookie("products");
  if(tmpCookie == "") {
    cookieArr = new Array();
  } else {
    eval("cookieArr = " + tmpCookie );
  }

  for(var i=0; i < cookieArr.length; i++)
  {
      break;
  }
}

function getCookie(cname) 
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
  }
  return "";
} 

function cartModal(name)
{
  currentProductName = name;
  $('#product-name').html(currentProductName);
  $('#buy-amount').attr('max', $('#' + currentProductName.replace(/\s+/g, "") + "-max").val());
  var realPrice;
  if(typeof $('#'+currentProductName.replace(/\s+/g, "")+'-promotion-price').val() != 'undefined'){
    realPrice = $('#'+currentProductName.replace(/\s+/g, "")+'-promotion-price').val();
  } else {
    realPrice = $('#' + currentProductName.replace(/\s+/g, "") + "-price").val();
  }
  $('#total-price').html(realPrice);
}

function changeAmount(amount) {

  var realPrice=0;
  if(typeof $('#'+currentProductName.replace(/\s+/g, "")+'-promotion-price').val() != 'undefined'){
    realPrice = $('#'+currentProductName.replace(/\s+/g, "")+'-promotion-price').val();
    $("#total-price").html(realPrice*amount.value);
  } else if(typeof $('#'+currentProductName.replace(/\s+/g, "")+'-promotion-xy').val() != 'undefined'){
    var x = parseInt($('#'+currentProductName.replace(/\s+/g, "")+'-promotion-xy').val().split(',')[0]);
    var y = parseInt($('#'+currentProductName.replace(/\s+/g, "")+'-promotion-xy').val().split(',')[1]);
    realPrice = $('#' + currentProductName.replace(/\s+/g, "") + "-price").val() * x * Math.floor(amount.value/(x+y));
    realPrice += $('#' + currentProductName.replace(/\s+/g, "") + "-price").val() * (amount.value%(x+y));
    realPrice=realPrice/amount.value;
    $("#total-price").html(Math.round(realPrice*amount.value));
  } else {
    realPrice = $('#' + currentProductName.replace(/\s+/g, "") + "-price").val();
    $("#total-price").html(realPrice*amount.value);
  }
}


function addToCart(name)
{
  var tmpCookie = getCookie("products");
  var expires = new Date();
  expires.setFullYear((expires.getFullYear()+5) );
  var length = cookieArr.length;
  for(var i=0; i<=length ; i++)
  {
    if(i == length)
    {
      cookieArr.push({id: $('#'+ currentProductName.replace(/\s+/g,'') + '-id').val(), name: currentProductName, amount:  parseInt(document.getElementById("buy-amount").value)});
      cartProductAmount = cookieArr[i].amount;
    }
    else if( cookieArr[i].id == $('#'+currentProductName+'-id').val() ){
      cookieArr[i].amount = parseInt(document.getElementById("buy-amount").value);
      cartProductAmount = cookieArr[i].amount;
      break;
    }

  document.cookie = "products=" + JSON.stringify(cookieArr) + "; expires="
    + expires.toGMTString() + "; path=/;";
  }
  clearval();
}

