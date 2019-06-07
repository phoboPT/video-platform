function calcTotalPrice(cart) {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.course) return tally;
    return tally + cartItem.course.price;
  }, 0);
}
export default calcTotalPrice;
