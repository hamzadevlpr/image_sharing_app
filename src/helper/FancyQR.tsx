import React, { useRef, useEffect } from 'react'
import QRCodeStyling from "qr-code-styling";

interface FancyQRProps {
  value: string
  size?: number
}

export const FancyQR: React.FC<FancyQRProps> = ({
  value,
  size = 200,
}) => {
  const qrRef = useRef<QRCodeStyling>()

  useEffect(() => {
    qrRef.current = new QRCodeStyling({
      width: size,
      height: size,
      data: value,
      margin: 10,
      // dot style
      dotsOptions: {
        color: '#0066ff',
        type: 'rounded',          // "rounded" | "dots" | "classy" | "classy-rounded"
      },
      // corner style
      cornersSquareOptions: {
        color: '#0044aa',
        type: 'extra-rounded',    // "fluent" | "dot" | "extra-rounded" | ...
      },
      // gradient
      backgroundOptions: {
        color: '#ffffff',
      },
      image: '/logo.png',         // embed a center logo
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 5,
      },
    })
    qrRef.current.append(document.getElementById('qr-styled')!)
  }, [value, size])

  return <div id="qr-styled" />
}
