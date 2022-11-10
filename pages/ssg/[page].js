import axios from "axios";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

function ssg(props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { isFallback } = router;
  return (
    <div>
      <Head>
        <title>SSG</title>
        <meta name="description" content={props.data?.time} />
        <meta property="og:title" content={props.data?.time} />
        <meta property="og:description" content={props.data?.page} />
      </Head>
      {isFallback && <p style={{ color: "blue" }}>Loading....</p>}
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

export async function getStaticPaths() {
  return {
    fallback: "blocking",
    paths: [
      { params: { page: "dep-trai" } },
      { params: { page: "tai-nang" } },
      { params: { page: "khiem-ton" } },
    ],
  };
}

export async function getStaticProps(context) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASEURL}/api/ssg-demo`,
      {
        params: { page: context?.params?.page },
      }
    );
    const data = response.data.data;
    return {
      props: { data },
    };
  } catch (error) {
    return {
      props: { data: null },
    };
  }
}
export default ssg;
