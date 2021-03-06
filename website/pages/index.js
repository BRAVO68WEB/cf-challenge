import React from "react";
import Write from "../components/Write";
import Head from "next/head";
import Nav from "../components/nav";
import Footer from "../components/footer";

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>WorkerBin ✏️</title>
        <meta
          name="description"
          content="A Pastebin alternative, but it is using CF Worker API to store the data."
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
      </Head>
      <Write />
    </div>
  );
}
