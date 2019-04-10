import Head from "next/head";

const Meta = () => (
  <Head>
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta charSet="utf-8" />
    <link href="/static/favicon.png" rel="shortcut icon" />
    <link href="/static/nprogress.css" rel="stylesheet" type="text/css" />
    <link href="../static/video-react.css" rel="stylesheet" type="text/css" />

    <link
      href="https://cdn.quilljs.com/1.3.6/quill.snow.css"
      rel="stylesheet"
    />

    <link
      crossOrigin="anonymous"
      href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
      rel="stylesheet"
    />

    <script src="https://cdn.quilljs.com/1.3.6/quill.js" />
    <title>Picus</title>
  </Head>
);

export default Meta;
