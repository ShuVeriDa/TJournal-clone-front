import React from "react";
import styles from "../SideComments/SideComments.module.scss";
import Link from "next/link";

interface CommentItemPropsType {
   user: {
      id: number
      fullName: string;
   };
   text: string;
   post: {
      id: number
      title: string;
   };
}

export const CommentItem: React.FC<CommentItemPropsType> = ({user, text, post}) => {

   return (
      <div className={styles.commentItem}>
         <div className={styles.userInfo}>
            <img alt="User avatar"
               src="https://leonardo.osnova.io/598fc957-a3f6-598c-b6f9-a033c3941d12/-/scale_crop/64x64/-/format/webp/"
            />
            <Link href={`/profile/${user.id}`}>
               <a>
                  <b>{user.fullName}</b>
               </a>
            </Link>
         </div>
         <p className={styles.text}>{text}</p>
         <Link href={`/news/${user.id}`}>
            <a>
               <span className={styles.postTitle}>{post.title}</span>
            </a>
         </Link>
      </div>
   );
};