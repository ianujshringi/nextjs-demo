import React, { useEffect, useState } from "react";
import styles from "../styles/Blog.module.css";
import Link from "next/link";
import * as fs from "fs";
import InfiniteScroll from "react-infinite-scroll-component";

const Blog = (props) => {
  // console.log(props);
  const [blogs, setBlogs] = useState(props.allBlogs);
  const [count, setCount] = useState(2);

  const fetchData = async () => {
    // console.log("in fetch");
    let d = await fetch(
      `http://localhost:3000/api/bloglist/?count=${count + 1}`
    );
    setCount(count + 1);
    let data = await d.json();
    setBlogs(data);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <InfiniteScroll
          dataLength={blogs.length}
          next={fetchData}
          hasMore={props.allCount !== blogs.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>You have seen it all!</b>
            </p>
          }
        >
          {blogs.map((blogitem) => {
            return (
              <div key={blogitem.slug} className={styles.blogItem}>
                <Link href={`/blog/${blogitem.slug}`}>
                  <h3>{blogitem.title}</h3>
                </Link>
                <p>{blogitem.content.substr(0, 200)}</p>
              </div>
            );
          })}
        </InfiniteScroll>
      </main>
    </div>
  );
};

// Using server side rendering
/*export async function getServerSideProps(context) {
  const data = await fetch("http://localhost:3000/api/bloglist");
  const allBlogs = await data.json();
  return {
    props: { allBlogs },
  };
}*/

// Using static site generation
export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogdata");
  const allCount = data.length;
  let file;
  let allBlogs = [];
  for (let index = 0; index < 4 && index < data.length; index++) {
    const element = data[index];
    file = await fs.promises.readFile("blogdata/" + element, "utf-8");
    allBlogs.push(JSON.parse(file));
  }
  return {
    props: { allBlogs, allCount },
  };
}
export default Blog;
