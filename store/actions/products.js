/**definisco un azione per la delete */

export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, pid: productId };
};
