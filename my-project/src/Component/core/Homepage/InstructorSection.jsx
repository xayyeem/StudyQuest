import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighLightText from './HighLightText'
import CTAButton from '../Homepage/Button'
import { FaArrowCircleRight } from "react-icons/fa";

const InstructorSection = () => {
    return (
        <div className="mt-16 flex flex-col md:flex-row gap-10 items-center px-4 sm:px-8">
            {/* Image Section */}
            <div className="w-full md:w-[50%] flex justify-center">
                <img
                    src={Instructor}
                    alt="Instructor"
                    className="shadow-lg max-w-full h-auto rounded-lg"
                />
            </div>

            {/* Text Section */}
            <div className="w-full md:w-[50%] flex flex-col gap-6 text-center md:text-left">
                <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
                    Become an <HighLightText text="Instructor" />
                </h2>
                <p className="font-medium text-base sm:text-lg text-gray-600 mx-auto md:mx-0">
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>

                {/* CTA Button */}
                <div className="w-fit mx-auto md:mx-0">
                    <CTAButton active={true} linkto="/signup">
                        <div className="inline-flex flex-row gap-2 items-center text-richblack-800 font-semibold">
                            <span>Start teaching today</span>
                            <FaArrowCircleRight className="text-lg" />
                        </div>
                    </CTAButton>
                </div>
            </div>
        </div>
    );

}

export default InstructorSection