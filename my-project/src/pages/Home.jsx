import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowCircleRight } from "react-icons/fa";
import HighLightText from '../Component/core/Homepage/HighLightText';
import CTAButton from '../Component/core/Homepage/Button';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../Component/core/Homepage/CodeBlocks';
import Footer from '../Component/common/Footer';
import LearningLanguageSection from '../Component/core/Homepage/LearningLanguageSection';
import TimeLineSection from '../Component/core/Homepage/TimeLineSection';
import InstructorSection from '../Component/core/Homepage/InstructorSection';
import ExploreMore from '../Component/core/Homepage/ExploreMore'

const Home = () => {
    return (
        <>
            <div className="mt-16 p-4 mx-auto flex flex-col items-center w-11/12 max-w-screen-lg text-white justify-center">
                {/* Section 1 */}
                <div className="w-fit">
                    <Link to="/signup">
                        <div className="group mx-auto rounded-full bg-richblack-800 text-richblack-200 font-bold px-6 py-3 transition-transform duration-300 hover:scale-105 shadow-lg">
                            <div className="flex flex-row items-center gap-2 transition-colors duration-300 group-hover:bg-richblack-700 rounded-full">
                                <p className="text-sm sm:text-base md:text-lg">Become an Instructor</p>
                                <FaArrowCircleRight className="text-lg sm:text-xl md:text-2xl" />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Headline */}
                <div className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mt-7 leading-tight">
                    Empower Your Future With <HighLightText text={"Coding Skills"} />
                </div>

                {/* Description */}
                <div className="mt-4 w-full md:w-3/4 text-center text-sm sm:text-lg font-bold text-richblack-300 leading-relaxed">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                {/* Call-to-Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-5 mt-8">
                    <CTAButton active={true} linkto="/signup">Learn More</CTAButton>
                    <CTAButton active={false} linkto="/login">Book a Demo</CTAButton>
                </div>

                {/* Video Banner */}
                <div className="shadow-lg shadow-blue-200 mx-auto my-12 max-w-full overflow-hidden rounded-lg">
                    <video muted loop autoPlay className="w-full h-auto rounded-lg">
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>

                {/* Code Section 1 */}
                <div className="w-full">
                    <CodeBlocks
                        positioning="flex flex-col lg:flex-row items-center gap-6"
                        heading={
                            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center lg:text-left">
                                Unlock Your <HighLightText text="Coding Potential" /> With Our Online Courses
                            </div>
                        }
                        subheading={
                            <div className="text-sm sm:text-base md:text-lg lg:text-xl text-center lg:text-left">
                                Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                            </div>
                        }
                        ctabtn1={{
                            btnText: "Try it yourself",
                            linkto: "/signup",
                            active: true,
                        }}
                        ctabtn2={{
                            btnText: "Learn more",
                            linkto: "/login",
                            active: false,
                        }}
                        codeblock={`<!DOCTYPE html>
<html lang="en">
<head>
<title>This is myPage</title>
</head>
<body>
<h1><a href="/">Header</a></h1>
<nav><a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav>
</body>`}
                        codeColor="text-yellow-25"
                    />
                </div>


                {/* Code Section 2 */}
                <div className="w-full">
                    <CodeBlocks
                        positioning="flex flex-col-reverse lg:flex-row-reverse items-center gap-6"
                        heading={
                            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center lg:text-right">
                                Start <HighLightText text="Coding in Seconds" />
                            </div>
                        }
                        subheading={
                            <div className="text-sm sm:text-base md:text-lg lg:text-xl text-center lg:text-right">
                                Go ahead and give it a try! Dive into our hands-on learning environment, where you'll start writing real code from your very first lesson.
                            </div>
                        }
                        ctabtn1={{
                            btnText: "Continue Lesson",
                            linkto: "/signup",
                            active: true,
                        }}
                        ctabtn2={{
                            btnText: "Learn more",
                            linkto: "/login",
                            active: false,
                        }}
                        codeblock={`import React from "react";
import CTAButton from "./Button";
import TypeAnimation from "react-type";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  return (
    <div>Home</div>
  );
};

export default Home;`}
                        codeColor="text-yellow-25"
                    />
                </div>

                <ExploreMore />
            </div>

            {/* Section 2 */}
            <div className="bg-pure-greys-5 text-richblack-700">
                <div className="homepage_bg h-[310px] flex flex-col justify-center items-center">
                    <div className="flex flex-row gap-5 text-white mt-10">
                        <CTAButton active={true} linkto="/signup">
                            <div className="flex items-center gap-3">
                                Explore Full Catalog
                                <FaArrowCircleRight />
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkto="/signup">Learn More</CTAButton>
                    </div>
                </div>

                <div className="mx-auto w-11/12 max-w-screen-lg flex flex-col mb-20 items-center gap-10">
                    <div className="flex flex-col md:flex-row gap-7 mt-[95px] items-center">
                        <div className="text-2xl md:text-4xl font-semibold text-center md:text-left md:w-1/2">
                            Get the skills you need for a <HighLightText text={'job that is in demand'} />.
                        </div>
                        <div className="flex flex-col items-center md:items-start gap-5 md:w-1/2">
                            <div className="text-[16px] text-center md:text-left">
                                The modern StudyNotion dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto="/signup">Learn More</CTAButton>
                        </div>
                    </div>
                    <TimeLineSection />
                    <LearningLanguageSection />
                </div>
            </div>

            {/* Section 3 */}
            <div className="w-11/12 mx-auto flex flex-col gap-8 max-w-screen-lg bg-richblack-800 text-white">
                <InstructorSection />
                <h2 className="text-center text-2xl md:text-4xl font-semibold mt-10">Review from Other Learners</h2>
            </div>

            {/* Footer */}
            <Footer />
        </>
    );
};

export default Home;
