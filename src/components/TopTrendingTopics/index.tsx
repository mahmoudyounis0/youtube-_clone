import React from 'react';

const TopTrendingTopics = () => {
    const items = [
        "All", "JavaScript", "Gaming", "LaLiga", "Podcast", "Live", "AI", 
        "Championships", "Uefa", "Dawah", "Comedy", "Qatar", "Anime", 
        "Information", "Cars"
    ];

    return (
        <div className="w-screen overflow-x-auto scrollbar-hide scroll-smooth ">
            <div className="flex gap-x-3 px-5 py-3 ">
                {items.map((item, index) => (
                    <div 
                        key={index} 
                        className="cursor-pointer py-1 px-4 dark:bg-[#2e2d2d] border border-[#2e2d2d] dark:hover:bg-[#494848] h-fit rounded-2xl"
                    >
                        <h3 className="capitalize tracking-wide">{item}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopTrendingTopics;
