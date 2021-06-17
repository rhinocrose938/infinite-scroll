import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import "./Home.css";
import Card from "./Card";

/*
This is the Parent component.
It has a state for fetched posts type array and
a state for pageIndex which is a number and changes on scroll to fetch more posts.
*/

function Home() {
  const [post, setPost] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  /* Here in the handleOnScroll function we check the condition
   if the sum of start position and position covered in the screen by user
   is more than or equal to 80% of scroll height of the container
   then pageIndex is increase by one and this state change triggers API call to
   fetch more data.*/

  const handleOnScroll = (e) => {
    let positionAtTop = e.target.scrollTop;
    let positionCovered = e.target.clientHeight;
    let positionTrigger = e.target.scrollHeight * 0.8;
    if (positionAtTop + positionCovered >= positionTrigger * 0.8) {
      setPageIndex(pageIndex + 1);
    }
  };

  /* In this debouncedChangeHandler  function we are making sure that
   the handleOnScroll function will be called only
    after delay of 100ms after user scrolling has stopped.
   This ensures that handleOnScroll is not called multiple times due to user interaction.*/

  const debouncedChangeHandler = debounce(handleOnScroll, 100);

  /* The fetchData function the Api call is made and data is stored in state*/

  const fetchData = useCallback(() => {
    fetch(
      `http://jsonplaceholder.typicode.com/posts?_start=${pageIndex}&_limit=10`
    )
      .then((response) => response.json())
      .then((data) => setPost((prevPost) => prevPost.concat(data)));
  }, [pageIndex])

 

   /* In this useEffect hook we are fetching the data from API using fetch method
  only when pageIndex changes as clear from dependency array.
   As it is clear that this effect runs on page scroll to bottom which changes the pageIndex.*/

  useEffect(() => {
    fetchData();
  }, [pageIndex, fetchData]);

  /*In the JSX below the div with className main is the container for the card component
  and onScroll event is attached to it. Inside the container we map over post array to render
  collection of cards using props passed to it. The data from backend is repeated so used index as key*/

  return (
    <div className="main" onScroll={debouncedChangeHandler}>
      {post.map((elem, idx) => (
        <Card {...elem} key={idx}/>
      ))}
    </div>
  );
}

export default Home;
