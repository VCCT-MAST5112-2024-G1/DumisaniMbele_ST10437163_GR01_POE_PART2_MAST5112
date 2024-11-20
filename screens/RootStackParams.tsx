export type RootStackParamList = {
    Home: { dishes: Dish[]; newDish?: Dish };
    AddDish: { dishes: Dish[]; setDishes: React.Dispatch<React.SetStateAction<Dish[]>> };
};

export type Dish = {
    Title: string;
    Description: string;
    Course: string; 
    Price: number;
};
