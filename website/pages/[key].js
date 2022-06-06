import React from "react";
import Head from "next/head";
import Write from "components/Write";
import { useRouter } from "next/router";

export default function Home(props) {
    const router = useRouter();
    const { key } = router.query;
    console.log(key);

    return (
        <div>
            <Head>
                <title>WorkerBin ✏️</title>
                <meta
                    name="description"
                    content="Local Travel is a website listing your nearest locations to travel to."
                />
                <meta name="keywords" content="cf, cf workers, worker, workers, nextjs" />
                <meta name="language" content="EN" />
                <meta name="author" content="Jyotirmoy Bandyopadhayaya | Bravo68web" />
                <meta name="publisher" content="Jyotirmoy Bandyopadhayaya | Bravo68web" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
            </Head>
            <Write id={key} />
        </div>
    );
}
