import React, {useState, useEffect} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import blogImg2 from "../../assets/images/blog-img-2.jpg"
import { getecomData } from '../../Services/ecomapiServices';
import { useNavigate } from 'react-router-dom';

var settings = {
  dots: false,
  nav:true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  items:1,
  responsive: [
     {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
     },
     {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
     },
     {
       breakpoint: 768,
       settings: {
         slidesToShow: 3,
         slidesToScroll: 3,
       },
     },
     {
       breakpoint: 1200,
       settings: {
         slidesToShow: 4,
         slidesToScroll: 4,
       },
     },
    
  ],
  };

function LatestBlog() {
const [blogsData, setBlogsData] = useState([]);
const navigate = useNavigate()
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

 useEffect(()=>{
   fetchBlogs();
 },[])

 const formatDate = (dateStr) => {
   const date = new Date(dateStr);
   // Format date like "10 FEB 2023"
   return date.toLocaleDateString("en-US", {
     day: "numeric",
     month: "short",
     year: "numeric",
   }).toUpperCase();
 };
 
return (
<section className='lates-blog'>
   <div className='container'>
      
      <div className="mix-btn-title d-flex justify-content-between mb-5">
         <div className="head-title mb-0">
            <h2>Latest Blog</h2>
         </div>
         <a className="btn btn-secondry mt-0" onClick={()=>navigate("/Blogs")}>View all blogs</a>
      </div>
      <Slider {...settings}>
      { blogsData.map((blog)=>
       <div  key={blog.id} >
       <div className='latest-blog-content'>
       <figure>  <img src={blogImg2}      alt={blog.title}></img></figure>   
          <figcaption>
             <h3>{blog.title}</h3>
             <span> {formatDate(blog.createdAt)} | BY {blog.author.toUpperCase()} </span>
             <a className="text-link">Read More</a>
          </figcaption>
       </div>
    </div>
      )}
      </Slider>
   </div>
</section>
)
}
export default LatestBlog