import React from 'react'
import CTAButton from './Button'
import HighLightText from './HighLightText'
import { FaArrowCircleRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';


const CodeBlocks = ({ positioning, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor }) => {
    return (
        <div className={`flex ${positioning} my-20 justify-between gap-10`}>
            {/* section 1 */}
            <div className='w-[50%] flex flex-col gap-8'>
                {heading}
                <div className='text-richblack-300 font-bold'>
                    {subheading}
                </div>
                <div className='flex gap-7 mt-7'>
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}  >
                        <div className='flex gap-2 items-center'>
                            {ctabtn1.btnText}
                            <FaArrowCircleRight />
                        </div>
                    </CTAButton>
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto} >
                        {ctabtn2.btnText}
                    </CTAButton>

                </div>



            </div>
            {/* section 2 */}
            <div className="h-fit flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-full lg:w-[470px] bg-richblack-900 rounded-lg border-2 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg">
                {backgroundGradient}
                {/* Line Numbers */}
                <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
                    {[...Array(11)].map((_, index) => (
                        <p key={index}>{index + 1}</p>
                    ))}
                </div>

                {/* Code Content */}
                <div className={`w-[90%] flex flex-col gap-2 ${codeColor} font-bold font-mono pr-2`}>
                    <TypeAnimation
                        sequence={[codeblock, 5000, ""]}
                        repeat={Infinity}
                        style={{
                            whiteSpace: "pre-line",
                            display: "block",
                        }}
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>


        </div>
    )
}

export default CodeBlocks