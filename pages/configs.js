function Page({ SERVERRESTDELAYMAXMS, SERVERRESTDELAYMINMS }) {
  const isDebugging = process?.env?.NEXT_PUBLIC_ISDEBUGGING;

  return (
    <div>
      <h2>Server Side</h2>
      process?.env?.SERVERRESTDELAYMAXMS : {SERVERRESTDELAYMAXMS}
      <br />
      process?.env?.SERVERRESTDELAYMINMS: {SERVERRESTDELAYMINMS}
      <br />
      <hr />
      <h2>Client Side</h2>
      process?.env?.NEXT_PUBLIC_ISDEBUGGING:{" "}
      {isDebugging == "true" ? "true" : "false"}
      <br />
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      SERVERRESTDELAYMAXMS: process?.env?.SERVERRESTDELAYMAXMS,
      SERVERRESTDELAYMINMS: process?.env?.SERVERRESTDELAYMINMS,
    }, // will be passed to the page component as props
  };
}

export default Page;
