exports.findtype=function(type){
  var keys=[];
  switch(type) {
    case '4':
      keys=['command','product'{'productid','supplierid'}] ;
      break;
    case '2':
      keys=['product':{'productid'},'prices'{'fromquantity','price'}];
      break;
    case '3':
      keys=['Prices':{'pricetype','price','fromQuantity'}];
      break;
    case '5':
      keys=['product':{'productid'},'attributes':{'attributeId':'length','attributeId':'color'}];
      break;
    case '6':
      keys=['product':{'productid'},'attributes':{'attributeId','description'}];
      break;
  }
  return keys;
 }
