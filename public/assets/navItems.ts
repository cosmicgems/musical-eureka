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