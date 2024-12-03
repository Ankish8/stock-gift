import React from 'react'

interface IPhone13ProMockupProps {
  children: React.ReactNode
}

export function IPhone13ProMockup({ children }: IPhone13ProMockupProps) {
  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
      <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
        <div className="absolute top-0 inset-x-0">
          <div className="mx-auto bg-black w-[40%] h-[24px] rounded-b-[1rem]"></div>
        </div>
        <div className="h-full w-full overflow-hidden">{children}</div>
      </div>
    </div>
  )
}

