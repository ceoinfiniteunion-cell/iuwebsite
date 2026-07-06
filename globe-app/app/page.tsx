"use client"
import { GlobeCdn } from "@/components/ui/cobe-globe-cdn"

export default function GlobePage() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "white", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <GlobeCdn />
      </div>
    </div>
  )
}
