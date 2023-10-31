interface Item {
    name: string;
    path: string;
    sub_item?: Item[];
}

export const navItems: Item[] = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Articles",
        path: "/articles",
    },
    {
        name: "Categories",
        path: "/articles/categories"
    },
    {
        name: "About",
        path: "/about"
    },
    {
        name: "Contact",
        path: "/contact"
    }
];

export const storeNavItems: Item[] = [
    {
        name: "Store Home",
        path: "/store",
    },
    {
        name: "Products",
        path: "/store/products",
    },
    {
        name: "Collections",
        path: "/store/products/collections",
    },
    {
        name: "Cart",
        path: "/store/cart",
    },
    {
        name: "Account",
        path: "/store/account",
    },
]