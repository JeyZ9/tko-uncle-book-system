import product from "../assets/product-json/product.json"
export const getAllBook = () => {
    return product.products.filter((book) => book);
}

export const getAllBookByMenuId = (menuId) => {
    return product.products.filter((item) => item.menuId == menuId);
}