import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((p, ind) => (
        <Post post={p} key={ind} />
      ))}
    </div>
  );
}
