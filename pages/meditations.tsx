import Head from "next/head";
import Nav from "../components/Nav";
import { useRouter } from "next/router";
import HeroSection from "@/components/HeroSection";
import style from "../styles/Meditations.module.css";

import React from "react";
import Card from "@/components/Card";

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
          firstWord=" Yoga"
          firstLine=" is the practice"
          secondLine="quieting the"
          lastWord="minds !"
          subTitle=<>
            Improve your mental health, spirituality <br /> and livings with
            NebulaCare.
          </>
          src="/yoga.png"
        />
      </div>
      <h1 className={style.h1}>Video you might find helpful !</h1>
      <div className={style.videoSection}>
        <Card title="Meditations" src="/med.jpg" />
        <Card title="Meditations" src="/med.jpg" />
        <Card title="Meditations" src="/med.jpg" />
        <Card title="Meditations" src="/med.jpg" />
        <Card title="Meditations" src="/med.jpg" />
        <Card title="Meditations" src="/med.jpg" />
        <Card title="Meditations" src="/med.jpg" />
        <Card title="Meditations" src="/med.jpg" />
        <Card title="Meditations" src="/med.jpg" />
        <Card title="Meditations" src="/med.jpg" />
        <Card title="Meditations" src="/med.jpg" />
      </div>
    </>
  );
}
