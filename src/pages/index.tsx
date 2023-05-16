import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import React, { useEffect, useState } from "react";

import { Header, Map, Dock } from "@/components";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden relative">
      <Dock />
    </div>
  );
}
