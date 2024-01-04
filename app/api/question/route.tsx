import { NextResponse } from "next/server";
import { qa } from "../../../util/ai";
import GetUserFromClerkID from "../../../util/auth"
import prisma from "../../../util/db";

export const POST = async (request) => {
    const {question} = await request.json();
    const user = await GetUserFromClerkID();
    const entries = await prisma.JurnalEntry.findMany({
        where:{
            userId: user.id
        },
        select: {
            id: true,
            createdAt: true,
            content: true
        }
    })

    const answer = await qa(question,entries);

    return NextResponse.json({data:answer})
}