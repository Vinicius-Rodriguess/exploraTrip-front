import React from "react";
import Image from "next/image";
import styles from "./homeCard.module.scss";

interface HomeCardProps {
  img: string;
  title: string;
  desc: string;
  width?: number;
  height?: number;
}

const HomeCard: React.FC<HomeCardProps> = ({
  img,
  title,
  desc,
  width = 31,
  height = 34,
}) => {
  return (
    <div className={styles.container}>
      <Image
        src={img}
        alt={title}
        width={width}
        height={height}
        className={styles.image}
      />
      <div className={styles.content}>
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default HomeCard;
