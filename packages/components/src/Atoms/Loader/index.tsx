import React from "react";
import {css, keyframes} from '@emotion/react';
import tw from 'twin.macro';

interface LoaderProps {
    children?: React.ReactChild,
    className?: string
}

const blink = keyframes`
    50% {
        transform: scale(0.75);
        opacity: 0.2
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
`
const animateBlink = css`
    ${tw`rounded-full bg-yellow-600 w-[12px] h-[12px] mx-0.5 inline-block`}
    animation: ${blink} .7s 0s infinite ease-in-out;
`
export default function Loader({children, className}: LoaderProps) {
    return <div tw='flex flex-col justify-center items-center w-full inset-0' className={className}>
        <div>
            <div css={animateBlink}></div>
            <div css={animateBlink} tw='animation-delay[0.35s]'></div>
            <div css={animateBlink}></div>
        </div>
        {children}
    </div>
}