import product from "../assets/product-json/product.json"

export const getAllMenu = () => {
    return product.menu.filter((menu) => menu)
}