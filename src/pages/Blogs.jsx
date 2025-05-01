import React, {useState, useEffect} from "react";
import BlogImg1 from "../assets/images/blog-1.png";
import InnerBanner from "../Components/Header/InnerBanner";
import { useNavigate } from "react-router-dom";
import { getecomData } from "../Services/ecomapiServices";
function Blogs() {
  const [blogsData, setBlogsData] = useState([]);
  const navigate = useNavigate();
  const fetchBlogs = async () => {
    try {
      const response = await getecomData("/blogs");

      if (response.status) {
        setBlogsData(response.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    // Format date like "10 FEB 2023"
    return date
      .toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .toUpperCase();
  };
  const stripHtmlAndTrim = (html, limit = 100) => {
   const tempElement = document.createElement("div");
   tempElement.innerHTML = html;
   const text = tempElement.textContent || tempElement.innerText || "";
   return text.length > limit ? text.substring(0, limit) + "..." : text;
 };
 
  return (
    <div className="BlogPage">
      <InnerBanner Name={"Blogs"} />
      <div className="container">
        <div className="BlogPageInner">
          <div className="row">
            {blogsData.map((blog) => (
              <div className="col-md-3">
                <div className="BlogsBox">
                  <figure>
                    <img src={BlogImg1} />
                  </figure>
                  <h2>{blog.title}</h2>
                  <span> {formatDate(blog.createdAt)} | BY {blog.author.toUpperCase()} </span>
                  <p>{stripHtmlAndTrim(blog.content, 50)}</p>
                  <a className="btn btn-primary">Read More</a>
                </div>
              </div>
            ))}
            <ul class="pagination mt-4">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">«</span>
                </a>
              </li>
              <li class="page-item active">
                <a class="page-link " href="#">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  3
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">»</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Blogs;
