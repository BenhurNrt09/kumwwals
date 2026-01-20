"use client";

import Script from 'next/script';
import React from 'react';

const TemplateScripts = () => {
    return (
        <>
            <Script src="/assets/js/vendor/jquery-3.7.1.min.js" strategy="beforeInteractive" />
            <Script src="/assets/js/swiper-bundle.js" strategy="beforeInteractive" />
            <Script src="/assets/js/bootstrap.min.js" strategy="afterInteractive" />
            <Script src="/assets/js/wow.min.js" strategy="afterInteractive" />
            <Script src="/assets/js/jquery.magnific-popup.min.js" strategy="afterInteractive" />
            <Script src="/assets/js/gsap.min.js" strategy="afterInteractive" />
            <Script src="/assets/js/ScrollTrigger.min.js" strategy="afterInteractive" />
            <Script src="/assets/js/gsap-scroll-to-plugin.js" strategy="afterInteractive" />
            {/* SplitText.js might be a premium plugin or custom, ensuring it exists in the assets */}
            <Script src="/assets/js/SplitText.js" strategy="afterInteractive" />
            <Script src="/assets/js/lenis.min.js" strategy="afterInteractive" />
            <Script src="/assets/js/flipperCount.js" strategy="afterInteractive" />
            <Script src="/assets/js/main.js" strategy="lazyOnload" />
        </>
    );
};

export default TemplateScripts;
