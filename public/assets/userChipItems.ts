interface ChipItem {
    name: string;
    auth_level: number;
    href: string;
    _id: string;
    add_username: boolean;
}

export const userChipItems : ChipItem[] = [
    {
        name: "Profile",
        auth_level: 0,
        href: "/profile/",
        _id: "704xb743x367xb",
        add_username: true,
    },
    {
        name: "Apps",
        auth_level: 0,
        href: "/apps",
        _id: "387xb7x3629",
        add_username: false,
    },
    {
        name: "Dashboard",
        auth_level: 12,
        href: "/admin/dashboard/",
        _id: "782de31bxd3819ne",
        add_username: true,
    },
    {
        name: "Create Identifiers",
        auth_level: 24,
        href: "/admin/dashboard/identifiers/create",
        _id: "376b4c674",
        add_username: false,
    },
    {
        name: "Modify Identifiers",
        auth_level: 24,
        href: "/admin/dashboard/identifiers/modify",
        _id: "677rr42bc452dc3",
        add_username: false,
    },
    {
        name: "Settings",
        auth_level: 0,
        href: "/admin/settings/",
        _id: "3767cew48fsr48b4xf74784x",
        add_username: true,
    },
]