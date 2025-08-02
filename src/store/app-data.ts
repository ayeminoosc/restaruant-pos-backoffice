export type SideBarItemType = {
  label: string;
  icon: string;
  color: string;
};

export type SubCategoryType = {
  id: string;
  name: string;
  bilingualName?: string;
  image?: string;
  isActive: boolean;
};

export type CategoryType = {
  id: string;
  name: string;
  bilingualName: string;
  image: string;
  isActive: boolean;
  subCategoryList: SubCategoryType[];
};
export const appData = {
    sidebarItems: [
        { label: "Admin", icon: "/assets/face.svg", color: "#FF6E30" },
        { label: "Report", icon: "/assets/ChartBar.svg", color: "#4CAF50" },
        { label: "Category", icon: "/assets/Folder.svg", color: "#2196F3" },
        { label: "Menu Items", icon: "/assets/ForkKnife.svg", color: "#9C27B0" },
        { label: "Modifier Groups", icon: "/assets/Command.svg", color: "#FF6E30" },
        { label: "Prefixes", icon: "/assets/tray.svg", color: "#4CAF50" },
        { label: "Recipes", icon: "/assets/cook.svg", color: "#2196F3" },
        { label: "Recipe Items", icon: "/assets/cooktop.svg", color: "#9C27B0" },
        { label: "Inventory Items", icon: "/assets/inventory.svg", color: "#FF6E30" },
        { label: "Floor Plan", icon: "/assets/chair.svg", color: "#4CAF50" },
        { label: "Settings", icon: "/assets/setting.svg", color: "#9C27B0" },
        { label: "Help", icon: "/assets/help.svg", color: "#9C27B0" },
    ] as SideBarItemType[],
    restaurantName: "ACF Restaurant",
    restaurantIcon: "/assets/hamburger.png",
    menuCategoryLabel: "Menu Categories",
    menuCategoryCount: 2,
    menuCategoryAddButtonText: "Add Category",
    menuSubCategoryAddButtonText: "Add SubCategory",
    categoryList:[
        {
            id: "1",
            name: "Beverages",
            bilingualName: "饮料",
            image: "/assets/menu30.jpg",
            isActive: true,
            subCategoryList: [
                {
                    id: "1-1",
                    name: "Soft Drinks",
                    bilingualName: "软饮料",
                    image: "/assets/menu30.jpg",
                    isActive: true,
                },
                {
                    id: "1-2",
                    name: "Juices",
                    bilingualName: "果汁",
                    image: "/assets/menu30.jpg",
                    isActive: true,
                },
            ],
        },
        {
            id: "2",
            name: "Appetizers",
            bilingualName: "开胃菜",
            image: "/assets/menu30.jpg",
            isActive: true,
            subCategoryList: [
                {
                    id: "2-1",
                    name: "Salads",
                    bilingualName: "沙拉",
                    image: "/assets/menu30.jpg",
                    isActive: true,
                },
                {
                    id: "2-2",
                    name: "Soups",
                    bilingualName: "汤",
                    image: "/assets/menu30.jpg",
                    isActive: true,
                },
            ],
        },
        {
            id: "3",
            name: "Main Course",
            bilingualName: "主菜",
            image: "/assets/menu30.jpg",
            isActive: true,
            subCategoryList: [
                {
                    id: "3-1",
                    name: "Vegetarian",
                    bilingualName: "素食",
                    image: "/assets/menu30.jpg",
                    isActive: true,
                },
                {
                    id: "3-2",
                    name: "Non-Vegetarian",
                    bilingualName: "非素食",
                    image: "/assets/menu30.jpg",
                    isActive: true,
                },
            ],
        },
        {
            id: "4",
            name: "Desserts",
            bilingualName: "甜点",
            image: "/assets/menu30.jpg",
            isActive: true,
            subCategoryList: [
                {
                    id: "4-1",
                    name: "Cakes",
                    bilingualName: "蛋糕",
                    image: "/assets/menu30.jpg",
                    isActive: true,
                },
                {
                    id: "4-2",
                    name: "Ice Creams",
                    bilingualName: "冰淇淋",
                    image: "/assets/menu30.jpg",
                    isActive: true,
                },
            ],
        },
    ],
    
}