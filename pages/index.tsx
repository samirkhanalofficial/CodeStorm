import Head from "next/head";
import Nav from "../components/Nav";
import { useRouter } from "next/router";
import HeroSection from "@/components/HeroSection";
import style from "../styles/index.module.css";
import Footer from "@/components/Footer";

// RedHat, smartcontract in solidity
export default function Home() {
  const router = useRouter();
  return (
    <div className={style.main}>
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
          src="/brain.png"
        />
        <div className={style.buttonSection}>
          <button className={style.button}>Get Started</button>
        </div>
      </div>
      <footer className={style.footer}>
        <Footer />
      </footer>
    </div>
  );
}
