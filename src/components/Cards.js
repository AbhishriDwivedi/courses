import Card from "./Card";
import React, { useState } from 'react'

const Cards = (props) => {
    console.log(props.category);
    console.log(props.courses);

    let category = props.category;
    const [likedCourses, setLikedCourses] = useState([]);
   
    // get all courses on first render or if All is selcted else get courses from the selected category
    function getCourses() {
        if (category === "All") {
            let allCourses = [];
            Object.values(props.courses).forEach((array) => {
                array.forEach((courseData) => {
                    allCourses.push(courseData);
                });
            });
            return allCourses;
        }
        else
        {
            // don't forget to return
            return props.courses[category];
        }
    }

    return (
        <div className="flex flex-wrap justify-center gap-4 mb-4">
            {
                // make a card for all the courses returned
                getCourses().map((course) => {
                    return <Card course={course} key={props.courses.id} likedCourses={likedCourses} setLikedCourses={setLikedCourses} />;
                })
            }
        </div>
    );
};

export default Cards;
