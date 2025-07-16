import React from 'react'
import clsx from 'clsx'

type CardContainerProps = {
  children: React.ReactNode
  className?: string
  innerClassName?: string
}

export default function CardContainer({
  children,
  className,
  innerClassName,
}: CardContainerProps) {
  return (
    <div className={clsx('bg-white text-center', className)}>
      <div
        className={clsx(
          'max-w-7xl rounded-3xl shadow-cus p-12 mx-auto',
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}
