import express, { NextFunction, Request, Response, Router } from "express";

const router: Router = express.Router({mergeParams: true})

const checkRole = (req: Request, res: Response, next: NextFunction)=>{
    next()
}
const getAll = (req: Request, res: Response, next: NextFunction)=>{
    res.status(200).json({
        error:false,
        errors:[],
        data: {
            description: "Get all user route is successful"
        },
        message: "successful",
        status: 200
     })
}

// path
router.get("/", checkRole, getAll)

export default router;