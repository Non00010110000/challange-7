import React, { useState } from "react";
import Replies from "./Replies";
import { nanoid } from "@reduxjs/toolkit";
export const data = {
  currentUser: {
    image: {
      png: "/images/avatars/image-juliusomo.png",
    },
    username: "juliusomo",
  },
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "/images/avatars/image-amyrobson.png",
        },
        username: "amyrobson",
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2 weeks ago",
      score: 5,
      user: {
        image: {
          png: "/images/avatars/image-maxblagun.png",
        },
        username: "maxblagun",
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1 week ago",
          score: 4,
          replyingTo: "@maxblagun",
          user: {
            image: {
              png: "/images/avatars/image-ramsesmiron.png",
            },
            username: "ramsesmiron",
          },
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2 days ago",
          score: 2,
          replyingTo: "@ramsesmiron",
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
        },
      ],
    },
  ],
};

function Comments() {
  const [replyInput, setReplyInput] = useState(""); 
  const [dataLikes, setDataLikes] = useState(data);
  const [replyComment,setReplyComment] = useState(false);
  const [activeCommentIndex, setActiveCommentIndex] = useState(null);
  

  const handleReplySubmit = () => {
    // Check if reply input is not empty
    if (replyInput !== "") {
      // Create a new reply object
      const newReply = {
        id: nanoid(),
        createdAt: new Date().toLocaleDateString(),
        content: replyInput,
        score: 0,
        replyingTo: "@" + data.comments[activeCommentIndex].user.username,
        user: {
          image: {
            png: "/images/avatars/image-juliusomo.png",
          },
          username: "juliusomo",
        },
      };
  
      const updatedReplies = [...data.comments[activeCommentIndex].replies, newReply];
      const updatedComments = data.comments.map((comment, index) =>
        index === activeCommentIndex ? { ...comment, replies: updatedReplies } : comment
      );
      setDataLikes((prevState) => ({ ...prevState, comments: updatedComments }));
  
      setReplyInput("");
      setReplyComment(false);
    }
  };


  function handleIncrease  (index) {
    setDataLikes((prevData) => {
      const updatedComments = [...prevData.comments];
      updatedComments[index] = { ...updatedComments[index] };
      updatedComments[index].score += 1;
      return { ...prevData, comments: updatedComments };
    });
  };
    
  let replyDispley = (
    <div className="add-comment">
      <img src={require("./images/avatars/image-juliusomo.png")}></img>
      <input
        type="text"
        value={replyInput}
        onChange={(e) => setReplyInput(e.target.value)}
      />
      <button className="send" type="submit" onClick={handleReplySubmit}>
        SAVE
      </button>
    </div>
  );

  function handleDecrease  (index)  {
    setDataLikes((prevData) => {
      const updatedComments = [...prevData.comments];
      updatedComments[index] = { ...updatedComments[index] };
      updatedComments[index].score -= 1;
      return { ...prevData, comments: updatedComments };
    });
  };
  function handelReply (index)  {
    setReplyComment(!replyComment)
    setActiveCommentIndex(index)
  }
  return (
    <>



    
      <div className="comments">
        {dataLikes.comments.map((comment, index) => (
          <div key={comment.id} className={`comment-${comment.id}`}>
            <div className="btn">

 
            <button onClick={() => handleIncrease(index)}>
                <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                    fill="#C5C6EF"
                  />
                </svg>
              </button>
              <span>{comment.score}</span>
              <button
                disabled={comment.score == 0}
                onClick={() => handleDecrease(index)}
              >
                <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                    fill="#C5C6EF"
                  />
                </svg>
              </button>
            

            </div>
           

            <div className="img_content">
              <div className="img">
                <img src={comment.user.image.png} alt={comment.user.username} />
                <span className="name">{comment.user.username}</span>
                <span className="date">{comment.createdAt}</span>
              </div>
              <p className="content">{comment.content}</p>
            </div>
            <div className="reply">
              <button onClick={()=>{
                handelReply(index)
              }}>
                <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                    fill="#5357B6"
                  />
                </svg>
                Reply
              </button>
              {replyComment && activeCommentIndex === index && replyDispley}
            </div>
          </div>
        ))}
        <Replies />
      
      </div>
    </>
  );
}

export default Comments;
