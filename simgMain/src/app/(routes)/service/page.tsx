"use client"
import '@/assets/styles/common.css';
import React, { useState } from 'react';
import { Tab } from '@/components/ui/tab';
import { ServiceCard } from '@/components/common/serviceCard';
import { TabOption } from '@/@types/common';
import { ServiceCardContents } from '@/components/contents/serviceCardContents';
import FadeInSection from "@/components/common/fadeIn";

export default function Page() {
    const tabOptions: TabOption[] = [
        { id: 'all', label: '전체' },
        { id: 'personal', label: '개인' },
        { id: 'organization', label: '단체' }
    ];
    const [currentTab, setCurrentTab] = useState(tabOptions[0].id);
    const { getFilteredServices } = ServiceCardContents();

    return (
        <main className={'my-8 mt-[140px]'}>
            <div className={'max-w-7xl mx-auto px-5'}>
                <FadeInSection>
                <div className={'text-4xl font-medium mb-10'}>상품이 아닌 서비스를 제공합니다</div>
                </FadeInSection>
                <FadeInSection>
                <Tab
                    options={tabOptions}
                    onTabChange={setCurrentTab}
                    initialTab="all"
                />
                </FadeInSection>
                <div className="flex flex-wrap justify-around">
                    {getFilteredServices(currentTab).map((service, index) => (
                        <FadeInSection key={service.title}>
                        <ServiceCard key={index} {...service} />
                        </FadeInSection>
                    ))}
                </div>
            </div>
        </main>
    )
};