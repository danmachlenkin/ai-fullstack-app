import prisma from '../../util/db.js';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const createNewUser = async() => {
    const user = await currentUser();
    console.log(user);

    const match = await prisma.User.findUnique({
        where: {
            clerkId: user.id
        }
    })

    if(!match) {
        await prisma.user.create({
            data:{
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress
            }
        })
    }

    redirect('/jurnal')
}

const NewUser = async() => {
    await createNewUser();
    return <div>Hi</div>
}


export default NewUser;