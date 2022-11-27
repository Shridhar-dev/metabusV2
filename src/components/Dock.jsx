import { ActionIcon } from '@mantine/core';
import { Adjustments } from 'tabler-icons-react';
function Dock() {
  return (
    <div className="w-full fixed z-[1000] bottom-5 px-5 md:px-5 hidden md:visible">
      <div className="flex flex-col w-full p-8 space-y-4">
  
      </div>
        <ActionIcon>
          <Adjustments />
        </ActionIcon>
        <div className='w-full'>

        </div>    
    </div>
  )
}

export default Dock