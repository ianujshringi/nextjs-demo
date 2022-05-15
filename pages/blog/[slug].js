import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/BlogPost.module.css";
import * as fs from "fs";

const Slug = (props) => {
  const [blog, setBlog] = useState(props.blog);
  // useEffect(() => {
  //   if (!router.isReady) return;
  //   const { slug } = router.query;
  //   fetch(`http://localhost:3000/api/getblog?slug=${slug}`)
  //     .then((a) => {
  //       return a.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setBlog(data);
  //     });
  // }, [router.isReady]);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.blogItem}>
          <h1>{blog && blog.title}</h1>
          <p className={styles.author}>Author : {blog && blog.author}</p>
          <p>{blog && blog.content}</p>
        </div>
      </main>
    </div>
  );
};

/*export async function getServerSideProps(context) {
  const { slug } = await context.query;
  const data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`);
  const blog = await data.json();
  return {
    props: { blog },
  };
}*/

export async function getStaticPaths() {
  let allBlogs = await fs.promises.readdir("blogdata");
  allBlogs = allBlogs.map((item) => {
    return { params: { slug: item.split(".")[0] } };
  });
  return {
    paths: allBlogs,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const data = await fs.promises.readFile(`blogdata/${slug}.json`, "utf-8");
  const blog = await JSON.parse(data);
  return {
    props: { blog },
  };
}

export default Slug;
