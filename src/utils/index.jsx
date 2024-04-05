/* 
this funtion calculates total price of a new order
@param{array} products cartProduct: Array of objects
@returns {number}totalprice
*/
export const totalPrice = (products) => {
   let sum = 0 
   products.forEach(product => sum += product.price)

   return sum
}