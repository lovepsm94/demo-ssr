import axios from "axios";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

function ssr(props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>ISR-FAKE</title>
        <meta name="description" content={props.data?.time} />
        <meta property="og:title" content={props.data?.time} />
        <meta property="og:description" content={props.data?.page} />
      </Head>
      <p style={{ color: "red" }}>{props.data?.page}</p>
      <p style={{ color: "red" }}>{props.data?.time}</p>
      <button
        style={{ padding: "8px", height: "40px", background: "blue" }}
        onClick={() => router.push("/")}
      >
        To Home
      </button>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=5, stale-while-revalidate=5"
  );
  let data = null;
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASEURL}/api/ssg-demo`,
      {
        params: { page: "isr-fake" },
      }
    );
    data = response.data.data;
  } catch (error) {}
  return {
    props: { data },
  };
}
export default ssr;
