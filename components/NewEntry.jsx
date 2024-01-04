'use client'

import { createNewEntry } from '../util/api';
import { useRouter } from 'next/navigation';

const NewEntry = () => {
    const router = useRouter();

    const handleOnClick = async() => {
        const data = await createNewEntry();
        router.push(`/jurnal/${data.id}`)
    }

    return (
      <div onClick={handleOnClick}
        className="cursor-pointer overflow-hidden rounded-lg bg-white shadow"
      >
        <div className="px-4 py-5 sm:p-6">
          <span className="text-3xl">New Entry</span>
        </div>
      </div>
    )
  }
  
  export default NewEntry