import express, {type Router} from "express"
import { authRouter, userRouter } from "../../modules/users/router";
import { blogRouter } from "../../modules/blogs/router";

const router = express.Router();

const defaultRoutes: {path: string, route: Router}[] = [
    {
        path: "/auth",
        route: authRouter
    },
    {
        path: "/users",
        route: userRouter
    },
    {
        path: "/blogs",
        route: blogRouter
    }
]

defaultRoutes.forEach(route => {
    router.use(route.path, route.route)
})

export default router;