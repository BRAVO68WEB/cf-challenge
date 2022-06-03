import Head from "next/head";
import Nav from "components/nav";
import Main from "components/main";
import Footer from "components/footer";

export default function ispInfo() {
  return (
    <div>
      <Head>
        <title>
         Who is my Internet Provider?
        </title>
        <meta
          name="description"
          content="Local Travel is a website listing your nearest locations to travel to."
        />
        <meta
          name="keywords"
          content="cf, cf workers, worker, workers, nextjs"
        />
        <meta name="language" content="EN" />
        <meta name="author" content="Jyotirmoy Bandyopadhayaya | Bravo68web" />
        <meta
          name="publisher"
          content="Jyotirmoy Bandyopadhayaya | Bravo68web"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
        <Nav />
        <Main />
      <Footer />
    </div>
  );
}