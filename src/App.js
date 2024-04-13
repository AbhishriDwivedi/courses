import React from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import Spinner from "./components/Spinner";
import { apiUrl, filterData } from "./data.js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [laoding, setLoading] = useState(true);
  const [category, setCategory] = useState('All');

  const fetchData = async () => {
    // to show loading spinner
    setLoading(true);
    try {
      // fetch the data from given url
      const res = await fetch(apiUrl);
      // convert the fetched data into json object
      const output = await res.json();

      // store it's data in courses
      setCourses(output.data);
    } catch (err) {
      // if unable to fetch
      toast.error("Something Went Wrong");
    }
    // hide the loading spinner
    setLoading(false);
  };

  // fetch data only on first render
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex-col flex bg-bgDark2">
      <div>
        <Navbar />
      </div>

      <div className="bg-bgDark2">
        <div>
          <Filter
            filterData={filterData}
            category={category}
            setCategory={setCategory}
          />
        </div>
        {/* show spinner if loading, else show cards */}
        <div className="w-11/12 max-w-[1200px] min-h-[50vh] mx-auto flex flex-wrap justify-center items-center">
          {
            laoding ? (
              <Spinner />
            ) : (
              <Cards courses={courses} category={category} />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default App;
