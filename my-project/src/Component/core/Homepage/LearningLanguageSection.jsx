import React from 'react'
import HighLightText from './HighLightText'
import knowYourProgress from '../../../assets/Images/Know_your_progress.svg'
import compareWithOthers from '../../../assets/Images/Compare_with_others.svg'
import planYourLessons from '../../../assets/Images/Plan_your_lessons.svg'
import CTAButton from '../Homepage/Button'

const LearningLanguageSection = () => {
    return (
        <div className="mt-[130px] mb-10 px-4 sm:px-8">
            <div className="flex flex-col gap-5 items-center">
                {/* Header Text */}
                <div className="text-3xl sm:text-4xl font-semibold text-center">
                    Your Swiss knife for <HighLightText text="learning any language" />
                </div>

                {/* Subtext */}
                <div className="text-center text-richblack-600 mx-auto text-sm sm:text-base font-medium w-full sm:w-[70%] mt-3">
                    Using spin makes learning multiple languages easy with 20+ languages, realistic voice-over, progress tracking, custom schedules, and more.
                </div>

                {/* Image Row */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-5 mt-5">
                    <img
                        src={knowYourProgress}
                        alt="know your progress"
                        className="object-contain w-[80%] sm:w-[50%] md:w-[30%] lg:w-[25%] -mr-0 md:-mr-32"
                    />
                    <img
                        src={compareWithOthers}
                        alt="compare with others"
                        className="object-contain w-[80%] sm:w-[50%] md:w-[30%] lg:w-[25%]"
                    />
                    <img
                        src={planYourLessons}
                        alt="plan your lessons"
                        className="object-contain w-[80%] sm:w-[50%] md:w-[30%] lg:w-[25%] -ml-0 md:-ml-36"
                    />
                </div>

                {/* Call-to-Action Button */}
                <div className="w-fit mt-5">
                    <CTAButton active={true} linkto="/signup">
                        Learn More
                    </CTAButton>
                </div>
            </div>
        </div>
    );

}

export default LearningLanguageSection