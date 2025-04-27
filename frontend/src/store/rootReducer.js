import { categoryApi } from "./features/categoryApi";

const rootReducer = {
    [categoryApi.reducerPath]: categoryApi.reducer,
};

export default rootReducer;
