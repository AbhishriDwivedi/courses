import { click } from '@testing-library/user-event/dist/click';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { toast } from 'react-toastify';

const Card = (props) => {
    let likedCourses = props.likedCourses;
    let setLikedCourses = props.setLikedCourses;

    // To handle liked status of a course
    function clickHandler() {
        // if the course was already liked, it will be removed from liked courses on second click
        if (likedCourses.includes(props.course.id)) {
            setLikedCourses((prev) => prev.filter((cid) => cid !== props.course.id));
            toast.warning("Liked Removed");
        }
        else {
            // if no liked course exists the add this
            if (likedCourses.length === 0) {
                setLikedCourses([props.course.id]);
            }
            // add this course to the existing list(prev) of liked courses
            else {
                setLikedCourses((prev) => [...prev, props.course.id]);
            }
            toast.success("Liked Successfully");
        }
    }

    return (
        <div className='bg-bgDark bg-opacity-80 w-[300px] rounded-md overflow-hidden'>
            <div className='relative '>
                <img src={props.course.image.url} alt="Course Image" className='' />
                {/* call handler whenever the like button is clicked */}
                <div className='rounded-full w-[40px] h-[40px] bg-white absolute right-2 bottom-[-12px] grid place-items-center'>
                    <button onClick={clickHandler}>
                        {
                            // like icon toggles according to the like status
                            !likedCourses.includes(props.course.id) ? <FcLikePlaceholder fontSize="1.75rem" /> : <FcLike fontSize="1.75rem" />
                        }
                    </button>
                </div>
            </div>



            <div className='p-4'>
                <p className='text-white text-lg font-semibold leading-6'>{props.course.title}</p>
                <p className='mt-2 text-white'>
                    {
                        // show description with dots id greater than 100 characters
                        props.course.description.length > 100 ? (props.course.description.substring(0, 100) + "...") : (props.course.description)
                    }

                </p>
            </div>

        </div>
    )
}

export default Card