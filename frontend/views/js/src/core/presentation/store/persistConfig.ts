import storage from "redux-persist/lib/storage";
// import authTransform from "@/pages/auth/presentation/redux/authTransform";


const persistConfig = {
    key: "root",
    storage,
    // transforms: [authTransform],
    whitelist: ["auth", "clientDatabase"],
}

export default persistConfig;
