import { auth } from "@clerk/nextjs"
import prisma from "./db";

 const GetUserFromClerkID  = async() => {
    const {userId} = await auth();
    const user = await prisma.User.findUniqueOrThrow({
        where: {
            clerkId: userId
        }
    })

    return user;
}

export default GetUserFromClerkID;

