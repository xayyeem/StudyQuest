import React from 'react'
import TimeLineImage from "../../../assets/Images/TimelineImage.png";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
const TimeLine = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
        Logo: Logo2,
        Heading: "Responsibility",
        Description: "Students will always be our top priority",
    },
    {
        Logo: Logo3,
        Heading: "Flexibility",
        Description: "The ability to switch is an important skills",
    },
    {
        Logo: Logo4,
        Heading: "Solve the problem",
        Description: "Code your way to a solution",
    },
];

const TimeLineSection = () => {
    return (
        <div className="px-4 sm:px-8 mt-10">
            <div className="flex flex-col md:flex-row gap-10 items-center">
                {/* Left Section: Timeline List */}
                <div className="flex flex-col w-full md:w-[45%] gap-5">
                    {TimeLine.map((item, index) => (
                        <div className="flex flex-row gap-6" key={index}>
                            <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-md">
                                <img src={item.Logo} alt="" className="object-contain w-full h-full" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-lg">{item.Heading}</h2>
                                <p className="text-base text-gray-600">{item.Description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Section: Timeline Image with Stats */}
                <div className="relative shadow-lg rounded-lg">
                    <img
                        src={TimeLineImage}
                        alt="timeline image"
                        className="object-contain h-auto w-full rounded-lg"
                    />
                    <div className="absolute rounded-md bg-caribbeangreen-700 flex flex-col sm:flex-row text-white py-5 sm:py-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-5 sm:gap-10">
                        {/* Experience */}
                        <div className="flex flex-row gap-3 items-center border-b sm:border-b-0 sm:border-r border-caribbeangreen-300 px-5 sm:px-7">
                            <p className="text-3xl font-bold">10</p>
                            <p className="text-caribbeangreen-300 text-sm">years of experience</p>
                        </div>
                        {/* Courses */}
                        <div className="flex flex-row gap-3 items-center px-5 sm:px-7">
                            <p className="text-3xl font-bold">250</p>
                            <p className="text-caribbeangreen-300 text-sm">types of courses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default TimeLineSection