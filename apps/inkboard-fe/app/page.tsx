"use client"
import React from "react";

import { FooterComponent } from "@/components/footer";
import { HeaderComponent } from "@/components/header";
import { FeaturesComponent } from "@/components/feature";

function Home() {
  return (
    <div className="min-h-screen bg-black">
      <HeaderComponent/>
      <FeaturesComponent/>
      <FooterComponent/>
    </div>
  );
}

export default Home;
