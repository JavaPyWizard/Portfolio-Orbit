// This is rendered in the 3D canvas as a placeholder during boot
'use client'

import { Html } from '@react-three/drei'

export function BootTerminal() {
  return (
    <Html
      fullscreen
      style={{ pointerEvents: 'none' }}
      className="flex items-center justify-center"
    >
      {/* Empty - the actual boot UI is in the HTML overlay */}
    </Html>
  )
}