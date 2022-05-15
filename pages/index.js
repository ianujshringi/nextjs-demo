import Head from "next/head";
// import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Blog Page</title>
        <meta name="keywords" content="blogs, nexjs, blog, javascript" />
      </Head>

      <main className={styles.main}>
        <div className={styles.imgWrap}>
          {/* Image can not be used in static site generation use img*/}
          {/* <Image
            className={styles.myImg}
            src="/home.avif"
            width={220}
            height={120}
          /> */}
          <img className={styles.myImg} src="/home.avif" alt="My Blog"></img>
        </div>
        <h1 className={styles.title}>&lt;Yayati&rsquo;s Blog/&gt;</h1>
        <div className={styles.blogs}>
          <h2>Popular Blogs</h2>
          <div>
            <h3>How to learn javascript ?</h3>
            <p>Javascript is mainly used for Web technology.</p>
          </div>
          <div>
            <h3>How to learn javascript ?</h3>
            <p>Javascript is mainly used for Web technology.</p>
          </div>
          <div>
            <h3>How to learn javascript ?</h3>
            <p>Javascript is mainly used for Web technology.</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
