"use client"

import React from 'react'
import { useSelectedLayoutSegments } from 'next/navigation'
const Segment = () => {
    const segments = useSelectedLayoutSegments()
  console.log(segments)
    return (
        <ul>
        {segments.map((segment, index) => (
          <li key={index}>{segment}</li>
        ))}
      </ul>
  )
}

export default Segment


