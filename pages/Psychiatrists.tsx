import Head from "next/head";
import Nav from "../components/Nav";
import { useRouter } from "next/router";
import HeroSection from "@/components/HeroSection";

import React from "react";

export default function Psychiatrists() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>CodeStorm</title>
        <meta
          name="description"
          content="Medical Care for your mental health"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav route={router.pathname} />
      <div>
        <HeroSection
          firstWord=" Brilliant"
          firstLine=" things happen"
          secondLine="in calm "
          lastWord="minds !"
          subTitle=<>
            Improve your mental health, spirituality <br /> and livings with
            NebulaCare.
          </>
          src="/yoga.png"
        />
      </div>
    </>
  );
}
