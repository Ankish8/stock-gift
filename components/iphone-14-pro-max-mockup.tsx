import React from 'react'

interface IPhone14ProMaxMockupProps {
  children: React.ReactNode
}

export function IPhone14ProMaxMockup({ children }: IPhone14ProMaxMockupProps) {
  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[896px] w-[428px] shadow-xl">
      <div className="w-[148px] h-[18px] bg-gray-800 absolute top-0 inset-x-0 mx-auto rounded-b-[1rem] z-20"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-[400px] h-[868px] bg-white dark:bg-gray-800">
        <div className="w-full h-full overflow-hidden">{children}</div>
      </div>
    </div>
  )
}

