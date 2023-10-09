import { useState } from "react";
import { data } from "./Comments";
import Swal from "sweetalert2";
import { nanoid } from "@reduxjs/toolkit";
import { Textarea, useTab } from "@chakra-ui/react";


function Replies() {
  const [dataLikes, setDataLikes] = useState(data);
  const [editedContent, setEditedContent] = useState({});
  const [editStates, setEditStates] = useState({});
  const [disable, setDisable] = useState(false);
  const [newComment,setNewComment] = useState([])
  const [newReply,setNewReply] = useState([])
  const [editComment, setEditComment] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState('');
  const [replyInput, setReplyInput] = useState("");
  const [showInput,setShowInput] = useState(false);
  const [inputVal , setInputVal] = useState('');
  const [ replyInputReply ,setReplyInputReply ] = useState("")


  const handleEditComment = (commentId) => {
    setEditComment(commentId);
    const comment = newComment.find((comment) => comment.id === commentId);
    setEditedCommentContent(comment.content);
  };
  const handleButtonClick = () => {
    setShowInput(!showInput);
  }
  


  const handleEditSubmit = () => {
    const updatedComments = newComment.map((comment) =>
      comment.id === editComment
        ? { ...comment, content: editedCommentContent }
        : comment
    );
    setNewComment(updatedComments);
    setEditComment(null);
    setEditedCommentContent('');
  };

  

  const onClickHandler = () => {
    if (replyInput !== "") {
      // Create a new comment object with the reply input value and a default score of 0
      const newComment = {
        id : nanoid(),
        createdAt :  new Date().toLocaleDateString(),
        content: replyInput,
        score: 2,     
        png: "./images/avatars/image-juliusomo.png",
        username: "juliusomo",
       
        replies: [],
      };
  
      // Add the new comment to the existing comments array
      setNewComment((prevComments) => [...prevComments, newComment]);
  
      // Clear the reply input field
      setReplyInput("");
  
      // Show a success message to indicate the comment was added
      Swal.fire("Success!", "Comment added successfully.", "success");
    } else {
      // Show an error message if the reply input is empty
      Swal.fire("Error!", "Please enter a comment.", "error");
    }
  };






  let addComment = 
    <div className="add-comment">
      <img src={require("./images/avatars/image-juliusomo.png")} alt="avatar" />
      <input type="text" onChange={(e)=> setReplyInput(e.target.value)} value={replyInput} />
      <button className="send" onClick={onClickHandler} type="button">SEND</button>
    </div>
  

    const handleIncrease = (commentIndex, replyIndex) => {
      setDataLikes((prevData) => {
        const updatedComments = [...prevData.comments];
        const updatedReplies = [...updatedComments[commentIndex].replies];
        updatedReplies[replyIndex] = {
          ...updatedReplies[replyIndex],
          score: updatedReplies[replyIndex].score + 1,
        };
        updatedComments[commentIndex] = {
          ...updatedComments[commentIndex],
          replies: updatedReplies,
        };
        return { ...prevData, comments: updatedComments };
      });
    };

    const handleDecrease = (commentIndex, replyIndex) => {
      setDataLikes((prevData) => {
        const updatedComments = [...prevData.comments];
        const updatedReplies = [...updatedComments[commentIndex].replies];
        updatedReplies[replyIndex] = {
          ...updatedReplies[replyIndex],
          score: updatedReplies[replyIndex].score - 1,
        };
        updatedComments[commentIndex] = {
          ...updatedComments[commentIndex],
          replies: updatedReplies,
        };
        return { ...prevData, comments: updatedComments };
      });







    };
    const handleInputChange = (event, commentIndex, replyIndex) => {
      const { value } = event.target;
      setEditedContent((prevContent) => {
        const updatedContent = { ...prevContent };
        updatedContent[`${commentIndex}_${replyIndex}`] = value.trim();
        return updatedContent;
      });
    };
 
    const handelDelete = (commentIndex, replyIndex) => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          container: "my-swal-container",
          title: "my-swal-title",
          text: "my-swal-text",

          confirmButton: "my-swal-confirm-button",
          cancelButton: "my-swal-cancel-button",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Delete comment",
          text: "Are you sure you want to delete this comment? This will remove the comment and can't be undone",
          showCancelButton: true,
          confirmButtonText: "YES, DELETE",
          cancelButtonText: "NO, CANCEL",
          reverseButtons: true,

        })
        .then((res) => {
          if (res.isConfirmed) {
            setDataLikes((prevData) => {
              const updatedComments = [...prevData.comments];
              const updatedReplies = [...updatedComments[commentIndex].replies];
              updatedReplies.splice(replyIndex, 1);
              updatedComments[commentIndex] = {
                ...updatedComments[commentIndex],
                replies: updatedReplies,
              };
              return { ...prevData, comments: updatedComments };
            });
          }
        });
    };



    const handleSave = (commentIndex, replyIndex) => {
      setDataLikes((prevData) => {
        const updatedComments = [...prevData.comments];
        const updatedReplies = [...updatedComments[commentIndex].replies];
        updatedReplies[replyIndex] = {
          ...updatedReplies[replyIndex],
          content:
            editedContent[`${commentIndex}_${replyIndex}`] ||
            updatedReplies[replyIndex].content,
        };
        updatedComments[commentIndex] = {
          ...updatedComments[commentIndex],
          replies: updatedReplies,
        };
        return { ...prevData, comments: updatedComments };
      });

      // Clear the edit state for the specific reply being saved
      setEditStates((prevStates) => ({
        ...prevStates,
        [`${commentIndex}_${replyIndex}`]: false,
      }));
      setDisable(false);
    };

    const handelDeleteNewComm = (commentId) => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          container: 'my-swal-container',
          title: 'my-swal-title',
          text: 'my-swal-text',
          confirmButton: 'my-swal-confirm-button',
          cancelButton: 'my-swal-cancel-button',
        },
        buttonsStyling: false,
      });
    
      swalWithBootstrapButtons
        .fire({
          title: 'Delete comment',
          text: 'Are you sure you want to delete this comment? this remove the comment and can\'t be undone',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'YES, DELETE',
        })
        .then((result) => {
          if (result.isConfirmed) {
            const updatedComments = newComment.filter((comment) => comment.id !== commentId);
            setNewComment(updatedComments);
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your comment has been deleted.',
              'success'
            );
          }
        });
    };
    



    const handleIncreaseNew = (commentId) => {
      setNewComment((prevComments) => {
        return prevComments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              score: comment.score + 1,
            };
          }
          return comment;
        });
      });
    };
    
    const handleDecreaseNew = (commentId) => {
      setNewComment((prevComments) => {
        return prevComments.map((comment) => {
          if (comment.id === commentId && comment.score > 0) {
            return {
              ...comment,
              score: comment.score - 1,
            };
          }
          return comment;
        });
      });
    };

// const handleSaveClick = () => {
  // Perform save functionality with the input value
  // console.log(replyInputReply);
// }



const handleSaveClick = () => {
  if (replyInputReply !== "") {
    // Create a new reply object with the desired properties
    const newReply = {
      id: nanoid(),
      createdAt: new Date().toLocaleDateString(),
      content: replyInputReply,
      score: 2,
      png: "./images/avatars/image-juliusomo.png",
      username: "juliusomo",
    };

    // Add the new reply to the existing replies array
    setNewReply((prevReplies) => [...prevReplies, newReply]);

    // Clear the reply input field
    setReplyInputReply("");

    // Show a success message to indicate the reply was added
    Swal.fire("Success!", "Reply added successfully.", "success");
  } else {
    // Show an error message if the reply input is empty
    Swal.fire("Error!", "Please enter a reply.", "error");
  }
};
    
let replyDispley = (
  <div className="add-comment">
    <img src={require("./images/avatars/image-juliusomo.png")}></img>
    <input
      type="text"
  
      value={replyInputReply}
      onChange={(e) => setReplyInputReply(e.target.value)}
    />
    <button className="send" type="submit" onClick={handleSaveClick} >
      SAVE
    </button>
  </div>
);


    
    return (
      <div >
        <div className="comments-replies">

  {dataLikes.comments.map((comment, commentIndex) =>
            comment.replies && comment.replies.length > 0
              ? comment.replies.map((reply, replyIndex) => (
                
                  <div key={reply.id} className={`comment-${reply.id}`}>
                 
<div className="btn">
<button
                        onClick={() => handleIncrease(commentIndex, replyIndex)}
                      >
                        <svg
                          width="11"
                          height="11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                            fill="#C5C6EF"
                          />
                        </svg>
                      </button>
                      <span>{reply.score}</span>
                      <button
                        disabled={reply.score == 0}
                        onClick={() => handleDecrease(commentIndex, replyIndex)}
                      >
                        <svg  
                          width="11"
                          height="3"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                            fill="#C5C6EF"
                          />
                        </svg>
                      </button>
                    


</div>


                   

            



                    

                    <div className="img_content">
                      <div className="img">
                        <img
                          src={reply.user.image.png}
                          alt={reply.user.username}
                        />
                        {reply.user.username === "juliusomo" ? (
                          <span className="you">
                            {" "}
                            {reply.user.username === "juliusomo" ? "you" : null}
                          </span>
                        ) : null}
                        <span className="name">{reply.user.username}</span>
                        <span className="date">{reply.createdAt}</span>
                      </div>

                      {editStates[`${commentIndex}_${replyIndex}`] ? (
                        <>
                          <Textarea
                            resize="none"
                            size="sm"
                            width="350px"
                            value={
                              editedContent[`${commentIndex}_${replyIndex}`] ||
                              reply.content
                            }
                            onChange={(event) =>
                              handleInputChange(event, commentIndex, replyIndex)
                            }
                            overflow="hidden"
                            scrollBehavior="auto"
                          />

                          {reply.user.username === "juliusomo" ? (
                            <button
                              className="btn-save"
                              onClick={() => handleSave(commentIndex, replyIndex)}
                            >
                              UPDATE
                            </button>
                          ) : null}
                        </>
                      ) : (
                        <p className="content">
                          <b>
  {reply.replyingTo} 
                            </b> 
                            {reply.content}
                        </p>
                      )}
                    </div>
                    <div className="reply">
                      <button>
                        {reply.user.username === "juliusomo" ? (
                          <button
                            disabled={editStates[`${commentIndex}_${replyIndex}`]}
                            onClick={() => handelDelete(commentIndex, replyIndex)}
                            className={disable ? "delete-disable" : "delete"}
                          >
                            {" "}
                            <svg
                              width="12"
                              height="14"
                              color="red"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                                fill="#ED6368"
                              />
                            </svg>{" "}
                            Delete
                          </button>
                        ) : null}
                      </button>
                      <button
                        className={
                          disable
                            ? "edit-disable"
                            : "edit"
                        }
                        onMouseDown={() => {
                          if (reply.user.username == "juliusomo") {
                            setEditStates((prevStates) => ({
                              ...prevStates,
                              [`${commentIndex}_${replyIndex}`]:
                                !prevStates[`${commentIndex}_${replyIndex}`],
                              }));
                              // console.log("reply")
                          }
                        }}
onDoubleClick={ handleButtonClick}
                      >

{showInput&& reply.user.username !== "juliusomo" &&   replyDispley  }

                      <div className="reply-inline">

                      </div>
                        
                        {reply.user.username === "juliusomo" ? (
                  <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
                        ) : (
                          <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6" className="reply"/></svg>
                        )}
                        {reply.user.username === "juliusomo" ? "Edit" : "Reply"}
                      </button>

                    </div>
                    
                  </div>
          
          
                ))
              : null
          )}
         
        </div>





           

      
        

      {newComment.map((comment) => (
      <div key={comment.id} className="comment-4">
        
  
        <div className="btn">
                      <button
                      disabled ={comment.score === 0}
                        onClick={() => handleIncreaseNew(comment.id)}
                      >
                        <svg
                          width="11"
                          height="11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                            fill="#C5C6EF"
                          />
                        </svg>
                      </button>
                      <span>{comment.score}</span>
                      <button
                        disabled={comment.score == 0}
                        onClick={() => handleDecreaseNew(comment.id)}
                      >
                        <svg  
                          width="11"
                          height="3"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                            fill="#C5C6EF"
                          />
                        </svg>
                      </button>
                    </div>


<div className="img-contnet">
  <div className="img">

  <img src={comment.png} alt="comment-current-user" />
  <span className="you">you</span>
  <span className="name">{comment.username}</span>
  <span className="date">{comment.createdAt}</span>

  </div>
  {editComment === comment.id ? (
              <div>
                <input
                  type="text"
                  value={editedCommentContent}
                  onChange={(e) => setEditedCommentContent(e.target.value)}
                />
                <button onClick={handleEditSubmit} className="btn-save">UPDATE</button>
              </div>
            ) : (
              <div>
                <p className="content">{comment.content}</p>
              </div>
            )}
            <div className="reply">
              <button
                onClick={() => handelDeleteNewComm(comment.id)}
                className="delete"
              >
                <svg
                  width="12"
                  height="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                    fill="#ED6368"
                  />
                </svg>
                Delete
              </button>
              <button
                onClick={() => handleEditComment(comment.id)}
                className="edit"
              >
                <svg
                  width="14"
                  height="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                    fill="#5357B6"
                  />
                </svg>
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}
      {addComment}
        



      
      </div>
        
    );
  }

  export default Replies;




