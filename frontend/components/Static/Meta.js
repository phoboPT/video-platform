import Head from "next/head";

const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/static/favicon.png" />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <link rel="stylesheet" type="text/css" href="../static/video-react.css" />
    <link
      rel="stylesheet"
      type="text/css"
      href="../../static/CarouselSlider.css"
    />

    <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
    <script src="https://unpkg.com/react-carousel-slider/umd/react-carousel-slider.js" />
    <title>Picus</title>
  </Head>
);

export default Meta;
